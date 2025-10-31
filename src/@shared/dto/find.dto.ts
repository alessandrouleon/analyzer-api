import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindUsecaseDto<TFilter = any> {
  @ApiProperty({ example: 'desc' })
  @IsString()
  @IsOptional()
  order: 'asc' | 'desc';

  @ApiProperty({ example: 'name' })
  @IsString()
  @IsOptional()
  orderby: string;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @IsOptional()
  limit: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  skip: number;

  @ApiProperty({ example: ['name', 'type'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  fields: string[] | undefined;

  @ApiProperty({ example: { name: 'name' } })
  @IsOptional()
  filter: TFilter;
}
