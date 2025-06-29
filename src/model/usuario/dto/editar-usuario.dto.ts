import {
  IsDefined,
  IsEnum,
  IsIn,
  IsInt,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { ConstantUtils } from '../../../shared/classes/constant-utils.class';
import { NivelPermissaoEnum } from '../enums/nivel-permissao.enum';

export class EditarUsuarioDto {
  @IsDefined()
  @IsInt()
  @Min(ConstantUtils.VALOR_MINIMO_PARA_ID)
  @Max(ConstantUtils.VALOR_MAXIMO_PARA_ID)
  id: number;

  @IsDefined()
  @MaxLength(ConstantUtils.DEFAULT_STRING_MAX_LENGTH)
  name: string;

  @IsDefined()
  @IsString()
  @MaxLength(ConstantUtils.DEFAULT_STRING_MAX_LENGTH)
  email: string;

  @IsDefined()
  @IsString()
  @MaxLength(ConstantUtils.DEFAULT_STRING_MAX_LENGTH)
  senha: string;

  @IsDefined()
  @IsEnum(NivelPermissaoEnum)
  nivelPermissao: NivelPermissaoEnum;
}
