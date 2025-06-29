import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import {PaginacaoDto} from "../../shared/dto/paginacao.dto";
import {Insumo} from "../../model/insumo/insumo.entity";

@Injectable()
export class InsumoRepository {
    async salvarInsumo(insumo: Insumo) {
        return await Insumo.save(insumo);
    }

    async buscarInsumoPorId(id: number) {
        return await Insumo.findOne({
            where: { id: id },
            relations: ['usuario'],
        });
    }

    async paginacaoInsumos(paginacao: PaginacaoDto) {
        const { pagina, limite } = paginacao;

        return await Insumo.findAndCount({
            relations: ['usuario'],
            skip: (pagina - 1) * limite,
            take: limite,
        });
    }

    async verificarExistenciaDoInsumo(
        insumo: Partial<Insumo>,
    ): Promise<boolean> {
        const { id, nome, dataValidade, dataRegistro, lote, descricao } = insumo;

        const query: SelectQueryBuilder<Insumo> = Insumo.createQueryBuilder('insumo')

        if (nome) {
            query.andWhere('insumo.nome_produto = :nome', { nome });
        }
        if (dataValidade) {
            query.andWhere('insumo.dt_validade = :dataValidade', { dataValidade });
        }
        if (dataRegistro) {
            query.andWhere('insumo.Dt_registro = :dataRegistro', { dataRegistro });
        }
        if (lote) {
            query.andWhere('insumo.lote = :lote', { lote });
        }
        if (descricao) {
            query.andWhere('insumo.Descrição = :descricao', { descricao });
        }
        if (id) {
            query.andWhere('insumo.id != :id', { id });
        }
        return query.getExists();
    }

    async deletarInsumoPorId(id: number) {
        return await Insumo.delete(id);
    }
}
