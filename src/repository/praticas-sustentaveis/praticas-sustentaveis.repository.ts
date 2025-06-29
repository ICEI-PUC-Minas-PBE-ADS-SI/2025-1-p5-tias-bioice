import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { PaginacaoPraticasSustentaveisDto } from '../../model/praticas-sustentaveis/dto/paginacao-praticas-sustentaveis.dto';
import { PraticasSustentaveis } from '../../model/praticas-sustentaveis/praticas-sustentaveis.entity';

@Injectable()
export class PraticasSustentaveisRepository {
  async salvarPraticaSustentavel(pratica: PraticasSustentaveis) {
    return await PraticasSustentaveis.save(pratica);
  }

  async buscarPraticaSustentavel(id: number) {
    return await PraticasSustentaveis.findOne({
      where: { id: id },
    });
  }

  async paginacaoPraticasSustentaveis(
    paginacao: PaginacaoPraticasSustentaveisDto,
  ) {
    const { pagina, limite } = paginacao;

    return await PraticasSustentaveis.findAndCount({
      skip: (pagina - 1) * limite,
      take: limite,
    });
  }

  async verificarExistenciaDaPraticaSustentavel(
    pratica: Partial<PraticasSustentaveis>,
  ): Promise<boolean> {
    const { id, nome, tarefa } = pratica;

    const query: SelectQueryBuilder<PraticasSustentaveis> =
      PraticasSustentaveis.createQueryBuilder('pratica')
        .andWhere('pratica.nome = :nome', { nome })
        .andWhere('pratica.tarefa = :tarefa', { tarefa });

    if (id) {
      query.andWhere('pratica.id != :id', { id });
    }
    return query.getExists();
  }

  async deletarPraticaSustentavel(id: number) {
    return await PraticasSustentaveis.delete(id);
  }
}
