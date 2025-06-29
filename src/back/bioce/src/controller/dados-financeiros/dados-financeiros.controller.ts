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
import {PaginacaoDto} from "../../shared/dto/paginacao.dto";
import {IdDto} from "../../shared/dto/id.dto";
import {DadosFinanceirosService} from "../../service/dados-financeiros/dados-financeiros.service";
import {MensagensDadosFinanceiros} from "../../model/dados-financeiros/utils/mensagens-dados-financeiros";
import {CriarDadosFinanceirosDto} from "../../model/dados-financeiros/dto/criar-dados-financeiros.dto";

@Controller('dados-financeiros')
export class DadosFinanceirosController {
    constructor(private readonly dadosFinanceirosService: DadosFinanceirosService) {
    }

    @Get()
    async exibirDadosFinanceirosPaginado(
        @Query() paginacao: PaginacaoDto,
        @Res() response: Response,
    ): Promise<Response> {
        try {
            const dadosFinaceiros = await this.dadosFinanceirosService.exibirDadosFinanceirosPaginado(paginacao);
            return response.status(HttpStatus.OK).send({
                status: HttpStatus.OK,
                message: MensagensDadosFinanceiros.DADO_FINACEIRO_ECONTRADO,
                data: dadosFinaceiros
            });
        } catch (e) {
            throw (e);
        }
    }

    @Get('/:id')
    async buscarDadoFinanceiroPorId(
        @Param() id: IdDto,
        @Res() response: Response,
    ): Promise<Response> {
        try {
            const dadoFinanceiro = await this.dadosFinanceirosService.buscarDadoFinanceiroPorId(id.id);
            return response.status(HttpStatus.OK).send({
                status: HttpStatus.OK,
                message: MensagensDadosFinanceiros.DADO_FINACEIRO_ECONTRADO,
                data: dadoFinanceiro
            });
        } catch (e) {
            throw (e);
        }

    }

    @Post()
    async cadastrarDadoFinanceiro(
        @Body() dadosFinanceirosDto: CriarDadosFinanceirosDto,
        @Res() response: Response,
    ): Promise<Response> {
        try {
            const novoDadoFinanceiro = await this.dadosFinanceirosService.cadastrarDadoFinanceiro(dadosFinanceirosDto);
            return response.status(HttpStatus.CREATED).send({
                status: HttpStatus.CREATED,
                message: MensagensDadosFinanceiros.DADO_FINACEIRO_CADASTRADO,
                data: novoDadoFinanceiro
            });
        } catch (e) {
            throw (e);
        }

    }

    @Put('/:id')
    async editarInsumo(
        @Param() id: IdDto,
        @Body() insumo: CriarDadosFinanceirosDto,
        @Res() response: Response,
    ): Promise<Response> {
        try {
            const dadoFinanceiroAtulizado = await this.dadosFinanceirosService.editarDadoFinanceiro(
                id.id,
                insumo,
            );
            return response.status(HttpStatus.OK).send({
                status: HttpStatus.OK,
                message: MensagensDadosFinanceiros.DADO_FINACEIRO_ATUALIZADO,
                data: dadoFinanceiroAtulizado
            });
        } catch (e) {
            throw (e);
        }

    }

    @Delete('/:id')
    async deletarDadoFinanceiro(
        @Param() id: IdDto,
        @Res() response: Response,
    ): Promise<Response> {
        try {
            await this.dadosFinanceirosService.deletarDadoFinanceiro(id.id);
            return response.status(HttpStatus.OK).send({
                status: HttpStatus.OK,
                message: MensagensDadosFinanceiros.DADO_FINACEIRO_DELETADO
            });
        } catch (e) {
            throw (e);
        }
    }
}