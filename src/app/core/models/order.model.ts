import {DeliveryPreference} from "../enums/delivery-preference.model";
import {Client} from "./client.model";
import {Step} from "../enums/step.enum";
import {ProductVariant} from "./product-variant.model";

export interface Order {
  createdDate: Date,
  id: number;
  plannedDeliveryDate: Date;
  deliveryPreference: DeliveryPreference;
  client: Client;
  products: OrderProduct[];
}

interface OrderProduct {
  createdDate: Date;
  id: number;
  comments: string;
  currentStep: Step;
  variant: ProductVariant;
}
