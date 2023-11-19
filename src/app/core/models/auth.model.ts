import {Role} from "../enums/role.enum";

export interface AuthDto {
  username: string;
  token: string;
  role: Role;
}
