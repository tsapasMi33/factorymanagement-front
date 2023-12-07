import {Stats} from "./stats.model";

export interface CachedStats {
  level: string;
  concerns: string
  data: Stats;
  parent: CachedStats | null;
  children: Map<string, CachedStats>
}
