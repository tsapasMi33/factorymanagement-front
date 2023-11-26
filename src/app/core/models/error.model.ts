export interface ErrorDTO {
  time: Date;
  status: number;
  errors: Map<string,string>
}
