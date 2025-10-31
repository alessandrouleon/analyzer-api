import { SupplierToJson } from '../../../domain/supplier.entity';

export class FindAllSuppliersUseCaseInputDto {
  search?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sort?: 'asc' | 'desc';
}

export class FindAllSuppliersUseCaseOutputDto {
  items: SupplierToJson[];
  total: number;
  page: number;
  size: number;
}
