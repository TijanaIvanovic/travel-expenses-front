import { BillItemDTO } from './bill-item.dto';
export interface BillDTO {
  total: number;
  billItems: BillItemDTO[];
}
