import { Injectable } from '@nestjs/common';
import {DadosFinanceirosRepository} from "../../repository/dados-financeiros/dados-financeiros.repository";
import {CriarDadosFinanceirosDto} from "../../model/dados-financeiros/dto/criar-dados-financeiros.dto";
import {DadosFinanceiros} from "../../model/dados-financeiros/dados-financeiros.entity";
import {
    InsumosProdutosDadosFinanceirosEntity
} from "../../model/insumos-produtos-dados-financerios/insumos-produtos-dados-financerios.entity";

@Injectable()
export class DadosFinanceirosService {
    constructor(private readonly dadosFinaceirosRepository: DadosFinanceirosRepository) {}

    async cadastrarDadoFinanceiro(dadoFinanceiro: CriarDadosFinanceirosDto){

        // const dadoFinanc = new DadosFinanceiros();
        // dadoFinanc.isEntrada = dadoFinanceiro.isEntrada;
        // dadoFinanc.valor = dadoFinanceiro.valor;
        // dadoFinanc.descricao = dadoFinanceiro.descricao;
        // dadoFinanc.dataOperacao = Date.now() (deve criar no momento que for passado automaticamente)
        // dadoFinanc.usuario = usuario (buscar usuario no banco);
        //
        // const insumoOuProduto = new InsumosProdutosDadosFinanceirosEntity();
        // insumoOuProduto.quantitativo = dadoFinanceiro.quantitativo;
        // insumoOuProduto.produto = dadoFinanceiro.produtoId;
        // insumoOuProduto.insumo = dadoFinanceiro.insumoId;
        //
        // return this.dadosFinaceirosRepository.saveDadoFinanceiro(dadoFinanceiro, insumoOuProduto);
    }
}
