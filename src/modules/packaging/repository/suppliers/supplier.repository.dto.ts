import { SupplierEntity } from '../../domain/supplier.entity';

export interface FindAllSuppliersFilter {
  search?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sort?: 'asc' | 'desc';
}

export interface FindAllSuppliersResult {
  items: SupplierEntity[];
  total: number;
  page: number;
  size: number;
}
