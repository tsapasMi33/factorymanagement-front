import { Pipe, PipeTransform } from '@angular/core';
import {Step} from "../enums/step.enum";

@Pipe({
  name: 'step'
})
export class StepPipe implements PipeTransform {

  transform(value: string) {
    switch (value) {
      case "ENCODED":
        return "NCD";
      case "PRODUCTION":
        return "PRD";
      case "CUT":
        return "CUT";
      case "BENT":
        return "BND";
      case "COMBINED":
        return "CMB";
      case "WELDED":
        return "WLD";
      case "ASSEMBLED":
        return "SMB";
      case "FINISHED":
        return "FNS";
      case "PACKED":
        return "PCK";
      case "SENT":
        return "SNT";
      default:
        return ""
    }
  }

}
