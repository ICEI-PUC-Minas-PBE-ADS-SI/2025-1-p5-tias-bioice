import {
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
    ValidateNested
} from "class-validator";

export class ItemMovimentadoDto {
    @IsNotEmpty()
    @IsNumber()
    quantitativo: number

    @IsOptional()
    @IsNumber()
    produtoId?: number;

    @IsOptional()
    @IsNumber()
    insumoId?: number;
}

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
    usuarioId: number;

    // @ValidateNested()
    @IsArray()
    itens: ItemMovimentadoDto[]
}