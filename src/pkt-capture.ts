import cap from "cap";
import { networkInterfaces } from "os";
import { TypedEmitter } from "tiny-typed-emitter";

const { findDevice, deviceList } = cap.Cap;
const { Ethernet, PROTOCOL, IPV4, TCP } = cap.decoders;

export { findDevice, deviceList };

interface PktCaptureEvents {
  packet: (buf: Buffer) => void;
}

export class PktCapture extends TypedEmitter<PktCaptureEvents> {
  c: cap.Cap;

  constructor(device: string) {
    super();
    this.c = new cap.Cap();
    const buffer = Buffer.alloc(65535);
    const linkType = this.c.open(device, "tcp and src port 6040", 10 * 1024 * 1024, buffer);
    const packetBuffer = new PacketBuffer();

    if (this.c.setMinBytes) this.c.setMinBytes(6); // pkt header size

    this.c.on("packet", (nbytes: number, truncated: boolean) => {
      if (linkType === "ETHERNET") {
        const ethernet = Ethernet(buffer);
        if (ethernet.info.type === PROTOCOL.ETHERNET.IPV4) {
          const ipv4 = IPV4(buffer, ethernet.offset);
          if (ipv4.info.protocol === PROTOCOL.IP.TCP) {
            let datalen = ipv4.info.totallen - ipv4.hdrlen;
            const tcp = TCP(buffer, ipv4.offset);
            datalen -= tcp.hdrlen;
            if (datalen) {
              packetBuffer.write(Buffer.from(buffer.subarray(tcp.offset, tcp.offset + datalen)));
              let pkt = packetBuffer.read();
              while (pkt) {
                this.emit("packet", pkt);
                pkt = packetBuffer.read();
              }
            }
          }
        }
      }
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

  constructor(allowInternal = false) {
    super();
    this.caps = new Map();

    for (const [deviceName, interfaceInfo] of Object.entries(networkInterfaces())) {
      if (interfaceInfo) {
        for (const i of interfaceInfo) {
          if (!allowInternal && i.internal) continue;
          if (i.family === "IPv4") {
            const device = findDevice(i.address);
            if (device) {
              const cap = new PktCapture(device);

              // re-emit
              cap.on("packet", (buf) => this.emit("packet", buf, deviceName));

              this.caps.set(i.address, cap);
            }
          }
        }
      }
    }
  }

  close() {
    for (const cap of this.caps.values()) cap.close();
  }
}

class PacketBuffer {
  buffer: Buffer | null;
  position: number;
  out: Buffer[];

  constructor() {
    this.buffer = null;
    this.position = 0;
    this.out = [];
  }

  write(data: Buffer) {
    // we'll chop off the front of `data` with each loop
    while (data.length > 0) {
      // if we have a buffer prepared, we should append to it first
      if (this.buffer) {
        // if our buffer size is less than 2, we'll need to compute the full size
        if (this.buffer.length < 2) {
          const old = this.buffer[0]!; // save old byte
          const size = (data[0]! << 8) + old!; // convert from little-endian
          this.buffer = Buffer.alloc(size); // make new buffer
          this.buffer[0] = old; // write old value
          this.position = 1; // update position
        }

        // write as many bytes as we can
        const remaining = Math.min(data.length, this.buffer.length - this.position);
        data.copy(this.buffer, this.position, 0, remaining);
        this.position += remaining;

        // if we filled the buffer, push it
        if (this.position === this.buffer.length) {
          this.out.push(this.buffer);
          this.buffer = null;
          this.position = 0;
        }

        // chop off the front and keep going
        data = data.subarray(remaining);
        continue;
      }

      // if it's too small to read the size value, just save it in the buffer and
      // we'll hopefully get to it the next time around
      if (data.length < 2) {
        this.buffer = Buffer.from(data);
        this.position = data.length;
        break;
      }

      // otherwise, read the size value, and if it's bigger than the size of the
      // data we have, we should save it in the buffer
      const size = data.readUInt16LE(0);
      if (size > data.length) {
        // Ignore fragmented packets -> will lead to data loss probably, but fix crashes
        // yes but no
        // this.buffer = Buffer.alloc(size);
        // data.copy(this.buffer);
        // this.position = data.length;
        break;
      }

      // otherwise, just push it and chop off the front, then keep going
      this.out.push(data.subarray(0, size));
      data = data.subarray(size);
    }
  }

  read() {
    return this.out.shift();
  }
}
