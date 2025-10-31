import { Injectable, NotFoundException } from '@nestjs/common';
import UseCaseInterface from '@/@shared/usecase/usecase.interface';
import { SupplierToJson } from '../../../domain/supplier.entity';
import { SupplierRepository } from '../../../repository/suppliers/supplier.repository';
import { InputFindSupplierByIdUseCaseDto } from './findById.supplier.usecase.dto';

@Injectable()
export class FindSupplierByIdUseCase implements UseCaseInterface {
  constructor(private readonly supplierRepository: SupplierRepository) {}

  async execute(
    input: InputFindSupplierByIdUseCaseDto,
  ): Promise<SupplierToJson> {
    const supplier = await this.supplierRepository.findById(input.id);

    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    return supplier.toJSON();
  }
}
