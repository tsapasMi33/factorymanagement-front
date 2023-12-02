import {Material} from "../enums/material.enum";

export interface ProductComponent {
  id: number;
  name: string;
  thickness: number | null;
  length: number | null;
  width: number | null;
  price: number | null;
  typeName: string;
  typeMaterial: Material;
  typeRequiresCutting: boolean;
  typeRequiresBending: boolean;
}
