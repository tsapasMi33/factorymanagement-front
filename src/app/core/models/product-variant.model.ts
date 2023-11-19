import {Material} from "../enums/material.enum";
import {ProductFamily} from "./product-family.model";
import {Component} from "./component.model";

export interface ProductVariant {
  id: number;
  material: Material;
  width: number | null;
  length: number | null;
  height: number | null;
  code: string;
  price: number;
  description: string;
  productFamily: ProductFamily;
  components: Component[];
}
