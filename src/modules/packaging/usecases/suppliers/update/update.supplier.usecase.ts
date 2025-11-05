import { Injectable, NotFoundException } from '@nestjs/common';
import { SupplierToJson } from '../../../domain/supplier.entity';
import { SupplierRepository } from '../../../repository/suppliers/supplier.repository';
import { InputUpdateSupplierUseCaseDto } from './update.supplier.usecase.dto';

@Injectable()
export class UpdateSupplierUseCase {
  constructor(private readonly supplierRepository: SupplierRepository) {}

  async execute(input: InputUpdateSupplierUseCaseDto): Promise<SupplierToJson> {
    const supplier = await this.supplierRepository.findById(input.id);

    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    supplier.name = input.name;
    supplier.contactEmail = input.contactEmail;
    supplier.phoneNumber = input.phoneNumber;
    supplier.cnpj = input.cnpj;
    supplier.website = input.website;

    await this.supplierRepository.update(supplier);

    return supplier.toJSON();
  }
}
