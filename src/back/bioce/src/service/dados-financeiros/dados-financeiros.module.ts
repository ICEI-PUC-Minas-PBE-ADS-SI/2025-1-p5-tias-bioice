import { Module } from '@nestjs/common';
import { DadosFinanceirosService } from './dados-financeiros.service';
import {DadosFinanceirosController} from "../../controller/dados-financeiros/dados-financeiros.controller";
import {DadosFinanceirosRepository} from "../../repository/dados-financeiros/dados-financeiros.repository";
import {ProdutoModule} from "../produto/produto.module";
import {InsumoModule} from "../../model/insumo/insumo.module";

@Module({
  imports: [ProdutoModule, InsumoModule],
  controllers: [DadosFinanceirosController],
  providers: [DadosFinanceirosService, DadosFinanceirosRepository]
})
export class DadosFinanceirosModule {}
