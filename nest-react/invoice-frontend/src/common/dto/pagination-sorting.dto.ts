import { Order } from "../enum/order.enum";

export interface PaginationSortingDto {
  take: number;

  page: number;

  sortDirection: Order;

  sortParam: string | undefined;
}
