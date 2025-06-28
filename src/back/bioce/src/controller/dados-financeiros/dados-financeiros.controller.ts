import {Body, Controller, HttpStatus, Post, Res} from '@nestjs/common';
import {DadosFinanceirosService} from "../../service/dados-financeiros/dados-financeiros.service";
import {CriarDadosFinanceirosDto} from "../../model/dados-financeiros/dto/criar-dados-financeiros.dto";
import {Response} from "express";
import {MensagensDadosFinanceiros} from "../../model/dados-financeiros/utils/mensagens-dados-financeiros";
import {DadosFinanceiros} from "../../model/dados-financeiros/dados-financeiros.entity";

@Controller('dados-financeiros')
export class DadosFinanceirosController {
    constructor(private readonly dadosFinanceirosService: DadosFinanceirosService) {
    }

    @Post()
    async cadastrarDadosFinanceiros(
        @Body() dadosFinanceiros: CriarDadosFinanceirosDto,
        @Res() response: Response,
        ): Promise<Response> {
        try {
            const dadoFinanceiroCriado: DadosFinanceiros =
                await this.dadosFinanceirosService.cadastrarDadoFinanceiro(dadosFinanceiros);
            return response.status(HttpStatus.CREATED).send({
                status: HttpStatus.CREATED,
                message: MensagensDadosFinanceiros.DADO_FINACEIRO_CADASTRADO,
                data: dadoFinanceiroCriado
            })
        } catch (e) {
            throw (e);
        }

    }
}
