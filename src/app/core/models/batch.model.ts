import {ProductVariant} from "./product-variant.model";
import {Step} from "../enums/step.enum";

export interface Batch {
  id: number;
  code: string;
  products: BatchProduct[];
  currentStep: Step
}
interface BatchProduct {
  id: number;
  comments: string;
  variant: ProductVariant;
}
