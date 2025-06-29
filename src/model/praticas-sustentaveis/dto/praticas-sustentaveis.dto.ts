import { IsNotEmpty, IsString } from 'class-validator';

export class PraticasSustentaveisDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  tarefa: string;
}
