import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SuppliersController } from './controller/suppliers/suppliers.controller';
import { Supplier, SupplierSchema } from './model/supplier.model';
import { CreateSupplierUseCase } from './usecases/suppliers/create/create.suppliers.usecase';
import { DeleteSupplierUseCase } from './usecases/suppliers/delete/delete.supplier.usecase';
import { FindAllSuppliersUseCase } from './usecases/suppliers/findAll/find-all.suppliers.usecase';
import { FindSupplierByIdUseCase } from './usecases/suppliers/findById/findById.supplier.usecase';
import { UpdateSupplierUseCase } from './usecases/suppliers/update/update.supplier.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Supplier.name, schema: SupplierSchema },
    ]),
  ],
  controllers: [SuppliersController],
  providers: [
    CreateSupplierUseCase,
    FindSupplierByIdUseCase,
    UpdateSupplierUseCase,
    FindAllSuppliersUseCase,
    DeleteSupplierUseCase,
  ],
  exports: [],
})
export class PackagingModule {}
