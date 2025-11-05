import { Injectable } from '@nestjs/common';
import {
  SupplierEntity,
  SupplierToJson,
} from '../../../domain/supplier.entity';
import { SupplierRepository } from '../../../repository/suppliers/supplier.repository';
import { InputCreateSupplierUseCaseDto } from './create.suppliers.usecase.dto';

@Injectable()
export class CreateSupplierUseCase {
  constructor(private readonly supplierRepository: SupplierRepository) {}

  async execute(input: InputCreateSupplierUseCaseDto): Promise<SupplierToJson> {
    const supplier = new SupplierEntity(this.supplierRepository.generateId(), {
      name: input.name,
      contactEmail: input.contactEmail,
      phoneNumber: input.phoneNumber,
      cnpj: input.cnpj,
      website: input.website,
    });

    await this.supplierRepository.create(supplier);

    return supplier.toJSON();
  }
}
