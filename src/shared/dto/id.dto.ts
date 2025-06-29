import { IsDefined, IsInt, IsNumber, Max, Min } from 'class-validator';
import { ConstantUtils } from '../classes/constant-utils.class';
import { Transform, Type } from 'class-transformer';

export class IdDto {
  @IsDefined()
  @Type(() => Number)
  @IsInt()
  @Min(ConstantUtils.VALOR_MINIMO_PARA_ID)
  @Max(ConstantUtils.VALOR_MAXIMO_PARA_ID)
  id: number;
}
