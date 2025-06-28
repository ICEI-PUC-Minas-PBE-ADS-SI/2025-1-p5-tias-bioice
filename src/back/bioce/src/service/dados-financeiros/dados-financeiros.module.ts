import { Module } from '@nestjs/common';
import { DadosFinanceirosService } from './dados-financeiros.service';
import {DadosFinanceirosController} from "../../controller/dados-financeiros/dados-financeiros.controller";

@Module({
  imports: [],
  controllers: [DadosFinanceirosController],
  providers: [DadosFinanceirosService]
})
export class DadosFinanceirosModule {}
