import { PlatformType } from './platform-type';
import { Trade } from './trade';

export interface TableItem {
  // @ts-ignore
  readonly type: PlatformType;
  readonly [p: string]: Trade;
}
