
import {MaterialType} from "./material-type.model";

export interface ProductComponent {
  id: number;
  name: string;
  thickness: number | null;
  length: number | null;
  width: number | null;
  price: number | null;
  requiresCutting: boolean;
  requiresBending: boolean;
  type: MaterialType;
}
