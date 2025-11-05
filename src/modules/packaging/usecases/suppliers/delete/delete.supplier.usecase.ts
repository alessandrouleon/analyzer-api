import { Injectable } from '@nestjs/common';
import { SupplierRepository } from '../../../repository/suppliers/supplier.repository';
import { InputDeleteSupplierUseCaseDto } from './delete.supplier.usecase.dto';

@Injectable()
export class DeleteSupplierUseCase {
  constructor(private readonly supplierRepository: SupplierRepository) {}

  async execute(input: InputDeleteSupplierUseCaseDto): Promise<string> {
    await this.supplierRepository.delete(input.id);

    return 'Supplier deleted successfully';
  }
}
