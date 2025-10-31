import { Injectable } from '@nestjs/common';
import UseCaseInterface from '@/@shared/usecase/usecase.interface';
import {
  SupplierEntity,
  SupplierToJson,
} from '../../../domain/supplier.entity';
import { InputCreateSupplierUseCaseDto } from './create.suppliers.usecase.dto';
import { SupplierRepository } from '../../../repository/suppliers/supplier.repository';

@Injectable()
export class CreateSupplierUseCase implements UseCaseInterface {
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
