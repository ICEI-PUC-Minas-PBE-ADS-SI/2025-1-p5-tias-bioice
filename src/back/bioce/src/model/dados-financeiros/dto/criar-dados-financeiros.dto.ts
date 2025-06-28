import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength} from "class-validator";

export class CriarDadosFinanceirosDto {
    @IsNotEmpty()
    @IsBoolean()
    isEntrada: boolean;

    @IsNotEmpty()
    @IsNumber()
    valor: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    descricao: string;

    @IsNotEmpty()
    @IsNumber()
    quantitativo: number;

    @IsNotEmpty()
    @IsNumber()
    usuarioId: number;

    @IsOptional()
    @IsNumber()
    produtoId?: number;

    @IsOptional()
    @IsNumber()
    insumoId?: number;

}