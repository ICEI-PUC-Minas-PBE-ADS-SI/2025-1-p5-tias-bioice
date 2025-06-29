import {Injectable} from '@nestjs/common';
import {SelectQueryBuilder} from 'typeorm';
import {PaginacaoDto} from '../../shared/dto/paginacao.dto';
import {DadosFinanceiros} from '../../model/dados-financeiros/dados-financeiros.entity';
import {
    InsumosProdutosDadosFinanceirosEntity
} from '../../model/insumos-produtos-dados-financerios/insumos-produtos-dados-financerios.entity';


@Injectable()
export class DadosFinanceirosRepository {
    async salvarDadoFinanceiro(dadoFinanceiro: DadosFinanceiros) {
        return await DadosFinanceiros.save(dadoFinanceiro);
    }

    async buscarDadoFinanceiroPorId(id: number) {
        return await DadosFinanceiros.createQueryBuilder('dadosFinanceiros')
            .where('dadosFinanceiros.id = :id', {id})
            .innerJoin('dadosFinanceiros.relacoesFinanceiras', 'relacoesFinanceiras')
            .leftJoinAndSelect('relacoesFinanceiras.produto', 'produto')
            .leftJoinAndSelect('relacoesFinanceiras.insumo', 'insumo')
            .getOne();
    }

    async paginacaoDadosFinanceiros(paginacao: PaginacaoDto) {
        const {pagina, limite} = paginacao;

        return await DadosFinanceiros.findAndCount({
            relations: ['usuario'],
            skip: (pagina - 1) * limite,
            take: limite,
        });
    }

    async verificarExistenciaDoDadoFinanceiro(
        dadoFinanceiro: Partial<DadosFinanceiros>,
    ): Promise<boolean> {
        const {id, isEntrada, valor, descricao} = dadoFinanceiro;

        const query: SelectQueryBuilder<DadosFinanceiros> = DadosFinanceiros.createQueryBuilder('dadoFinanceiro');

        if (isEntrada !== undefined) {
            query.andWhere('dadoFinanceiro.isEntrada = :isEntrada', {isEntrada});
        }

        if (valor !== undefined) {
            query.andWhere('dadoFinanceiro.valor = :valor', {valor});
        }

        if (descricao) {
            query.andWhere('dadoFinanceiro.descricao = :descricao', {descricao});
        }

        if (id) {
            query.andWhere('dadoFinanceiro.id != :id', {id});
        }

        return await query.getExists();
    }

    async deletarDadoFinanceiro(id: number) {
        return await DadosFinanceiros.delete(id);
    }

    async salvarRelacoesFinanceiras(
        relacoesFinanceiras: InsumosProdutosDadosFinanceirosEntity[],
    ): Promise<InsumosProdutosDadosFinanceirosEntity[]> {
        return await InsumosProdutosDadosFinanceirosEntity.save(relacoesFinanceiras);
    }

    async removerRelacoesFinanceirasPorDadoFinanceiro(
        dadoFinanceiroId: number,
    ): Promise<void> {
        await InsumosProdutosDadosFinanceirosEntity.delete({
            dadosFinanceiros: {id: dadoFinanceiroId},
        });
    }

    async emitirRelatorioFinanceiro(): Promise<any> {
        const hoje = new Date();
        const seisMesesAtras = new Date(hoje.getFullYear(), hoje.getMonth() - 5, 1);

        const resultados = await DadosFinanceiros
            .createQueryBuilder("dadosFinanceiros")
            .select("YEAR(dadosFinanceiros.dataOperacao)", "ano")
            .addSelect("MONTH(dadosFinanceiros.dataOperacao)", "mes")
            .addSelect("SUM(dadosFinanceiros.valor)", "totalMensal")
            .addSelect(`SUM(CASE WHEN dadosFinanceiros.isEntrada = true THEN dadosFinanceiros.valor ELSE 0 END)`, "totalEntradas")
            .addSelect(`SUM(CASE WHEN dadosFinanceiros.isEntrada = false THEN dadosFinanceiros.valor ELSE 0 END)`, "totalSaidas")
            .where("dadosFinanceiros.dataOperacao >= :dataInicio", {dataInicio: seisMesesAtras})
            .groupBy("ano")
            .addGroupBy("mes")
            .orderBy("ano", "ASC")
            .addOrderBy("mes", "ASC")
            .getRawMany();

        return resultados.map(r => ({
            ano: parseInt(r.ano),
            mes: parseInt(r.mes),
            totalMensal: parseFloat(r.totalMensal),
            totalEntradas: parseFloat(r.totalEntradas),
            totalSaidas: parseFloat(r.totalSaidas),
        }))
    }


}
