import { Injectable } from '@nestjs/common';
import UseCaseInterface from '@/@shared/usecase/usecase.interface';
import { InputDeleteSupplierUseCaseDto } from './delete.supplier.usecase.dto';
import { SupplierRepository } from '../../../repository/suppliers/supplier.repository';

@Injectable()
export class DeleteSupplierUseCase implements UseCaseInterface {
  constructor(private readonly supplierRepository: SupplierRepository) {}

  async execute(input: InputDeleteSupplierUseCaseDto): Promise<string> {
    await this.supplierRepository.delete(input.id);

    return 'Supplier deleted successfully';
  }
}
