import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { CreateSupplierUseCase } from '../../usecases/suppliers/create/create.suppliers.usecase';
import { InputCreateSupplierUseCaseDto } from '../../usecases/suppliers/create/create.suppliers.usecase.dto';
import { DeleteSupplierUseCase } from '../../usecases/suppliers/delete/delete.supplier.usecase';
import { InputDeleteSupplierUseCaseDto } from '../../usecases/suppliers/delete/delete.supplier.usecase.dto';
import { FindAllSuppliersUseCase } from '../../usecases/suppliers/findAll/find-all.suppliers.usecase';
import { FindAllSuppliersUseCaseInputDto } from '../../usecases/suppliers/findAll/find-all.suppliers.usecase.dto';
import { FindSupplierByIdUseCase } from '../../usecases/suppliers/findById/findById.supplier.usecase';
import { InputFindSupplierByIdUseCaseDto } from '../../usecases/suppliers/findById/findById.supplier.usecase.dto';
import { UpdateSupplierUseCase } from '../../usecases/suppliers/update/update.supplier.usecase';
import { InputUpdateSupplierUseCaseDto } from '../../usecases/suppliers/update/update.supplier.usecase.dto';

@Controller('suppliers')
export class SuppliersController {
  constructor(
    private readonly createSupplierUseCase: CreateSupplierUseCase,
    private readonly deleteSupplierUseCase: DeleteSupplierUseCase,
    private readonly findAllSuppliersUseCase: FindAllSuppliersUseCase,
    private readonly findSupplierByIdUseCase: FindSupplierByIdUseCase,
    private readonly updateSupplierUseCase: UpdateSupplierUseCase,
  ) {}

  @Post()
  async create(@Body() body: InputCreateSupplierUseCaseDto) {
    return this.createSupplierUseCase.execute(body);
  }

  @Get()
  async findAll(@Query() query: FindAllSuppliersUseCaseInputDto) {
    return this.findAllSuppliersUseCase.execute(query);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const input = new InputFindSupplierByIdUseCaseDto();
    input.id = id;

    return this.findSupplierByIdUseCase.execute(input);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: Omit<InputUpdateSupplierUseCaseDto, 'id'>,
  ) {
    const input: InputUpdateSupplierUseCaseDto = {
      id,
      ...body,
    };

    return this.updateSupplierUseCase.execute(input);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const input = new InputDeleteSupplierUseCaseDto();
    input.id = id;

    await this.deleteSupplierUseCase.execute(input);
    return { message: 'Supplier deleted successfully' };
  }
}
