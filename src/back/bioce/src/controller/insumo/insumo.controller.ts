import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Query, Res,
} from '@nestjs/common';
import {Response} from 'express';
import {CriarInsumoDto} from "../../model/insumo/dto/criar-insumo.dto";
import {PaginacaoDto} from "../../shared/dto/paginacao.dto";
import {InsumoService} from "../../service/insumo/insumo.service";
import {MensagensInsumos} from "../../model/insumo/utils/mensgens-insumos";
import {IdDto} from "../../shared/dto/id.dto";

@Controller('insumo')
export class InsumoController {
    constructor(private readonly insumoService: InsumoService) {
    }

    @Get()
    async exibirInsumosPaginado(
        @Query() paginacao: PaginacaoDto,
        @Res() response: Response,
    ): Promise<Response> {
        try {
            const insumos = await this.insumoService.exibirInsumoPaginado(paginacao);
            return response.status(HttpStatus.OK).send({
                status: HttpStatus.OK,
                message: MensagensInsumos.INSUMO_ENCONTRADOS,
                data: insumos
            });
        } catch (e) {
            throw (e);
        }
    }

    @Get('/:id')
    async buscarInsumoPorId(
        @Param() id: IdDto,
        @Res() response: Response,
    ): Promise<Response> {
        try {
            const insumo = await this.insumoService.buscarInsumoPorId(id.id);
            return response.status(HttpStatus.OK).send({
                status: HttpStatus.OK,
                message: MensagensInsumos.INSUMO_ECONTRADO,
                data: insumo
            });
        } catch (e) {
            throw (e);
        }

    }

    @Post()
    async cadastrarInsumo(
        @Body() insumo: CriarInsumoDto,
        @Res() response: Response,
    ): Promise<Response> {
        try {
            const novoInsumo = await this.insumoService.cadastrarInsumo(insumo);
            return response.status(HttpStatus.CREATED).send({
                status: HttpStatus.CREATED,
                message: MensagensInsumos.INSUMO_CADASTRADO,
                data: novoInsumo
            });
        } catch (e) {
            throw (e);
        }

    }

    @Put('/:id')
    async editarInsumo(
        @Param() id: IdDto,
        @Body() insumo: CriarInsumoDto,
        @Res() response: Response,
    ): Promise<Response> {
        try {
            const insumoAtulizado = await this.insumoService.editarInsumo(
                id.id,
                insumo,
            );
            return response.status(HttpStatus.OK).send({
                status: HttpStatus.OK,
                message: MensagensInsumos.INSUMO_ATUALIZADO,
                data: insumoAtulizado
            });
        } catch (e) {
            throw (e);
        }

    }

    @Delete('/:id')
    async deletarInsumo(
        @Param() id: IdDto,
        @Res() response: Response,
    ): Promise<Response> {
        try {
            await this.insumoService.deletarInsumo(id.id);
            return response.status(HttpStatus.OK).send({
                status: HttpStatus.OK,
                message: MensagensInsumos.INSUMO_DELETADO
            });
        } catch (e) {
            throw (e);
        }
    }
}
