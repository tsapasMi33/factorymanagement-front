import {ProductVariant} from "./product-variant.model";

export interface Packet {
  createdDate: Date;
  id: number;
  code: string;
  clientName: string;
  products: PacketProducts[]
}

interface PacketProducts {
  id: number;
  comments: string;
  variant: ProductVariant;
}
