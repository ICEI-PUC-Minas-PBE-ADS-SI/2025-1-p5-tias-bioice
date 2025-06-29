import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProdutoDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsDateString()
  @IsNotEmpty()
  dataValidade: Date;

  @IsDateString()
  @IsNotEmpty()
  dataFab: Date;

  @IsNotEmpty()
  @IsNumber()
  usuarioId: number;
}
