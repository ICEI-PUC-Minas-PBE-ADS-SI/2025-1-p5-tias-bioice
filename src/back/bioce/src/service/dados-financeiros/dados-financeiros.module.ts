import { Module } from '@nestjs/common';
import { DadosFinanceirosService } from './dados-financeiros.service';
import {DadosFinanceirosController} from "../../controller/dados-financeiros/dados-financeiros.controller";
import {DadosFinanceirosRepository} from "../../repository/dados-financeiros/dados-financeiros.repository";

@Module({
  imports: [],
  controllers: [DadosFinanceirosController],
  providers: [DadosFinanceirosService, DadosFinanceirosRepository]
})
export class DadosFinanceirosModule {}
