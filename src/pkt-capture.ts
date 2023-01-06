import cap from "cap";
import { open, read } from "fs";
import { isIPv4 } from "net";
import { TypedEmitter } from "tiny-typed-emitter";
import { TCPTracker, TCPSession, ListenOptions } from "./tcp_tracker";

const { findDevice, deviceList } = cap.Cap;
const { Ethernet, PROTOCOL, IPV4, TCP } = cap.decoders;

export { findDevice, deviceList };

interface PktCaptureEvents {
  packet: (buf: Buffer) => void;
}

export class PktCapture extends TypedEmitter<PktCaptureEvents> {
  c: cap.Cap;
  #buffer: Buffer;
  constructor(device: string, listen_options: ListenOptions) {
    super();
    this.c = new cap.Cap();
    this.#buffer = Buffer.alloc(65535);
    const linkType = this.c.open(
      device,
      `tcp and (src port ${listen_options.port} or dst port ${listen_options.port})`,
      10 * 1024 * 1024,
      this.#buffer
    );
    const tcpTracker = new TCPTracker(listen_options);
    if (this.c.setMinBytes) this.c.setMinBytes(54); // pkt header size

    this.c.on("packet", (nbytes: number, truncated: boolean) => {
      let offset;
      if (linkType === "ETHERNET") {
        const ethernet = Ethernet(this.#buffer);
        if (ethernet.info.type !== PROTOCOL.ETHERNET.IPV4) return;
        offset = ethernet.offset;
      } else if (linkType === "NULL" && listen_options.ip === "127.0.0.1") {
        //if you don't have 127.0.0.1 as loopback & use VPN: fk u
        const type = this.#buffer.readUInt32LE();
        //IP header loopback
        if (type !== 2) return;
        offset = 4;
      } else return;

      const ipv4 = IPV4(this.#buffer, offset);
      if (ipv4.info.protocol === PROTOCOL.IP.TCP) {
        const tcp = TCP(this.#buffer, ipv4.offset);
        tcpTracker.track_packet(this.#buffer, ipv4, tcp);
      }
    });
    tcpTracker.on("session", (session: TCPSession) => {
      console.info(
        `[meter-core/pkt-capture] - New session ${session.src}->${session.dst} ${
          session.is_ignored ? "(ingored) " : ""
        }(Total: ${Object.keys(tcpTracker.sessions).length})`
      );
      session.on("payload_recv", (data: Buffer) => {
        this.emit("packet", data);
      });
    });
  }

  close() {
    this.c.close();
  }
}

interface PktCaptureAllEvents {
  packet: (buf: Buffer, deviceName: string) => void;
}

export class PktCaptureAll extends TypedEmitter<PktCaptureAllEvents> {
  caps: Map<string, PktCapture>;

  constructor() {
    super();
    this.caps = new Map();
    for (const device of deviceList()) {
      for (const address of device.addresses) {
        if (address.addr && address.netmask && isIPv4(address.addr)) {
          try {
            const cap = new PktCapture(device.name, {
              ip: address.addr,
              mask: address.netmask,
              port: 6040,
            });

            // re-emit
            cap.on("packet", (buf) => this.emit("packet", buf, device.name));

            // close others
            /* cap.once("packet", () => {
              for (const [name, cap] of this.caps.entries()) {
                if (name != device.name) cap.close();
              }
            }); */

            this.caps.set(device.name, cap);
            break; //We only want to listen on 1 address of the interface
          } catch (e) {
            console.error(`[meter-core/PktCaptureAll] ${e}`);
          }
        }
      }
    }
  }

  close() {
    for (const cap of this.caps.values()) cap.close();
  }
}

export class PktReader extends TypedEmitter<PktCaptureEvents> {
  fname: string;
  fileHandle: number|undefined;
  buf: Buffer;
  lastDate: Date|undefined;
  thisDate: Date|undefined;
  readLength: number;
  constructor(filename: string) {
    super();
    this.fname = filename;
    this.fileHandle = undefined;
    this.buf = Buffer.alloc(70000);
    this.lastDate = undefined;
    this.readLength = 0;
  }

  public startRead() {
    open(this.fname, 'r', undefined, (err, fd) => {
      this.fileHandle = fd;
      read(this.fileHandle, this.buf, 0, 8, null, this.readDate.bind(this));
    });
  }

  private readDate(err: any, bytesRead: number, buffer:Buffer) {
    if (bytesRead != 8) return;
    this.lastDate = this.thisDate;
    this.thisDate = new Date(Number(buffer.readBigInt64LE(0)));
    if (this.fileHandle)
      read(this.fileHandle, this.buf, 0, 4, null, this.readDataLength.bind(this));
  }

  private readDataLength(err: any, bytesRead: number, buffer: Buffer) {
    if (bytesRead != 4) return;
    this.readLength = buffer.readUInt16LE(0);
    if (this.fileHandle)
      read(this.fileHandle, this.buf, 0, this.readLength, null, this.readData.bind(this));
  }

  private readData(err: any, bytesRead: number, buffer: Buffer) {
    if (this.readLength != bytesRead) return;
    var b = Buffer.alloc(bytesRead);
    buffer.copy(b, 0, 0, bytesRead);
    this.emit("packet", b);
    if (this.fileHandle)
      read(this.fileHandle, this.buf, 0, 8, null, this.readDate.bind(this));
  }
}
