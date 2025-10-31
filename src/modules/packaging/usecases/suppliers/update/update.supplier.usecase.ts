import { Injectable, NotFoundException } from '@nestjs/common';
import UseCaseInterface from '@/@shared/usecase/usecase.interface';
import { InputUpdateSupplierUseCaseDto } from './update.supplier.usecase.dto';
import { SupplierToJson } from '../../../domain/supplier.entity';
import { SupplierRepository } from '../../../repository/suppliers/supplier.repository';

@Injectable()
export class UpdateSupplierUseCase implements UseCaseInterface {
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
