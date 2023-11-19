import {Material} from "../enums/material.enum";
import {MaterialType} from "../enums/material-type.enum";

export interface Component {
  id: number;
  name: string;
  type: MaterialType;
  material: Material;
  thickness: number | null;
  length: number | null;
  width: number | null;
  price: number | null;
}
