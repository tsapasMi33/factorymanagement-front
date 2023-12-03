import {Material} from "../enums/material.enum";
import {PricingMethod} from "../enums/pricing-method.enum";

export interface MaterialType {
  lastModifiedDate: Date;
  id: number;
  name: string;
  material: Material;
  pricingMethod: PricingMethod;
  basePrice: number;
  hasThickness: boolean;
  hasLength: boolean;
  hasWidth: boolean;
}
