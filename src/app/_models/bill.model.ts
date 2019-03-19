import { BillItem } from './bill-item.model';
export class Bill {
  constructor(public total: number, public billItems: BillItem[]) {}
}
