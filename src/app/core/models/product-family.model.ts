import {Step} from "../enums/step.enum";

export interface ProductFamily{
  id: number;
  name: string;
  productionPath: Step[]
}
