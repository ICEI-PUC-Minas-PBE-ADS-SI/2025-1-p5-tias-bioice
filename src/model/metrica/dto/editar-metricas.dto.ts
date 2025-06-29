import {
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { ConstantUtils } from '../../../shared/classes/constant-utils.class';

export class EditarMetricasDto {
  @IsDefined()
  @IsInt()
  @Min(ConstantUtils.VALOR_MINIMO_PARA_ID)
  @Max(ConstantUtils.VALOR_MAXIMO_PARA_ID)
  id: number;

  @IsOptional()
  @IsString()
  @MaxLength(ConstantUtils.DEFAULT_STRING_MAX_LENGTH)
  descarte: string;

  @IsOptional()
  @IsString()
  @MaxLength(ConstantUtils.DEFAULT_STRING_MAX_LENGTH)
  desperdicio: string;

  @IsOptional()
  @IsString()
  @MaxLength(ConstantUtils.DEFAULT_STRING_MAX_LENGTH)
  financeira: string;
}
