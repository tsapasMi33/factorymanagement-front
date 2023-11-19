import {Role} from "../enums/role.enum";

export interface User {
  createdDate: Date;
  id: number;
  username: string;
  role: Role;
  enabled: boolean;
  costPerMinute: number;
}
