import {Step} from "../enums/step.enum";
import {User} from "./user.model";

export interface ProductStep {
  createdBy: User
  step: Step;
  start: Date;
  finish: Date;
  duration: number;
  finished: boolean;
  paused: boolean;
}
