import {Packet} from "./packet.model";

export interface Shipment {
  createdDate: Date;
  id: number;
  packets: Packet[];
}
