import {Injectable} from '@nestjs/common';
import {DadosFinanceiros} from "../../model/dados-financeiros/dados-financeiros.entity";
import {
    InsumosProdutosDadosFinanceirosEntity
} from "../../model/insumos-produtos-dados-financerios/insumos-produtos-dados-financerios.entity";
import {Insumo} from "../../model/insumo/insumo.entity";

@Injectable()
export class DadosFinanceirosRepository {

    async saveDadoFinanceiro(
        dadoFinanceiro: DadosFinanceiros, insumoOuProduto: Insumo,
    ): Promise<any> {
        const dadosFinc =
            await DadosFinanceiros.save(dadoFinanceiro);
        const insumoOuProd =
            await InsumosProdutosDadosFinanceirosEntity.save(insumoOuProduto)

        return {
            dadosFinc,
            insumoOuProd
        }
    }
}
