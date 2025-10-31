import { Injectable } from '@nestjs/common';
import UseCaseInterface from '@/@shared/usecase/usecase.interface';
import {
  FindAllSuppliersUseCaseInputDto,
  FindAllSuppliersUseCaseOutputDto,
} from './find-all.suppliers.usecase.dto';
import { SupplierRepository } from '../../../repository/suppliers/supplier.repository';

@Injectable()
export class FindAllSuppliersUseCase implements UseCaseInterface {
  constructor(private readonly supplierRepository: SupplierRepository) {}

  async execute(
    input: FindAllSuppliersUseCaseInputDto,
  ): Promise<FindAllSuppliersUseCaseOutputDto> {
    const {
      search,
      page = 1,
      size = 10,
      sortBy = 'name',
      sort = 'asc',
    } = input;

    const result = await this.supplierRepository.findAll({
      search,
      page,
      size,
      sortBy,
      sort,
    });

    return {
      items: result.items.map((s) => s.toJSON()),
      total: result.total,
      page: result.page,
      size: result.size,
    };
  }
}
