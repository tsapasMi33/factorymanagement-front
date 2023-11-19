import {Address} from "./address.model";

export interface Client {
  id: number;
  name: string;
  companyType: string;
  address: Address;
  discountPercentage: number;
}
