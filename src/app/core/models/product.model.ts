import {Step} from "../enums/step.enum";
import {ProductVariant} from "./product-variant.model";
import {ProductStep} from "./product-step.model";

export interface Product {
  id: number;
  comments: string;
  currentStep: Step;
  variant: ProductVariant;
  orderId: number | null;
  batchId: number | null;
  batchCode: string | null;
  packetId: number | null;
  packetCode: string | null;
  order: Order;
  code: string;
  steps: ProductStep[];
}

interface Order {
  createdDate: Date;
  id: number;
  plannedDeliveryDate: Date;
  code: string;
  client: Client;
}

interface Client {
  id: number,
  name: string
}
