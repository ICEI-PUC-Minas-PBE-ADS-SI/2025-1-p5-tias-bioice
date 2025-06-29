import { NivelPermissaoEnum } from '../enums/nivel-permissao.enum';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  NotEquals,
} from 'class-validator';
import { ConstantUtils } from '../../../shared/classes/constant-utils.class';

export class CriarUsuarioDto {
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
