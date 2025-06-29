import {IsDateString, IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class CriarInsumoDto {
    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsDateString()
    @IsNotEmpty()
    dataValidade: Date;

    @IsDateString()
    @IsNotEmpty()
    dataRegistro: Date;

    @IsString()
    @IsNotEmpty()
    lote: string;

    @IsString()
    @IsNotEmpty()
    descricao: string;

    @IsNotEmpty()
    @IsNumber()
    usuarioId: number;
}
