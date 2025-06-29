import { Injectable } from '@nestjs/common';
import { Produto } from '../../model/produto/produto.entity';
import { SelectQueryBuilder } from 'typeorm';
import { PaginacaoDto } from '../../shared/dto/paginacao.dto';

@Injectable()
export class ProdutoRepository {
  async salvarProduto(produto: Produto) {
    return await Produto.save(produto);
  }

  async buscarProdutoPorId(id: number) {
    return await Produto.findOne({
      where: { id: id },
      relations: ['usuario'],
    });
  }

  async paginacaoProdutos(paginacao: PaginacaoDto) {
    const { pagina, limite } = paginacao;

    return await Produto.findAndCount({
      relations: ['usuario'],
      skip: (pagina - 1) * limite,
      take: limite,
    });
  }

  async verificarExistenciaDoProduto(
    produto: Partial<Produto>,
  ): Promise<boolean> {
    const { id, nome, dataValidade, dataFab } = produto;

    const query: SelectQueryBuilder<Produto> = Produto.createQueryBuilder(
      'produto',
    )
      .andWhere('produto.nome = :nome', { nome })
      .andWhere('produto.dataValidade = :dataValidade', { dataValidade })
      .andWhere('produto.dataFab = :dataFab', { dataFab });
    if (id) {
      query.andWhere('produto.id != :id', { id });
    }
    return query.getExists();
  }

  async deletarProdutoPorId(id: number) {
    return await Produto.delete(id);
  }
}
