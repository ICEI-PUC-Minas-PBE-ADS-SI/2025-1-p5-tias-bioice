import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProdutoDto } from '../../model/produto/dto/produto.dto';
import { Produto } from '../../model/produto/produto.entity';
import { Usuario } from '../../model/usuario/usuario.entity';
import { MensagensProdutos } from '../../model/produto/utils/mensagens-produtos';
import { ProdutoRepository } from '../../repository/produto/produto.repository';
import { PaginacaoDto } from '../../shared/dto/paginacao.dto';

@Injectable()
export class ProdutoService {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  async cadastrarProduto(dto: ProdutoDto): Promise<Produto> {
    const usuarioId = await Usuario.findOne({ where: { id: dto.usuarioId } });
    if (!usuarioId) {
      throw new BadRequestException('Usuário não encontrado!');
    }

    const deveExistir: boolean = false;

    const novoProduto = new Produto();
    novoProduto.nome = dto.nome;
    novoProduto.dataValidade = dto.dataValidade;
    novoProduto.dataFab = dto.dataFab;
    novoProduto.usuario = usuarioId;

    await this.validarExistenciaDoProduto(novoProduto, deveExistir);

    return await this.produtoRepository.salvarProduto(novoProduto);
  }

  async validarExistenciaDoProduto(
    produto: Partial<Produto>,
    deveExistir: boolean,
  ): Promise<void> {
    const produtoExiste: boolean =
      await this.produtoRepository.verificarExistenciaDoProduto(produto);
    if (produtoExiste && !deveExistir) {
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        message: MensagensProdutos.PRODUTO_JA_EXISTE,
      });
    }
    if (!produtoExiste && deveExistir) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: MensagensProdutos.PRODUTO_INEXISTENTE,
      });
    }
  }

  async exibirProdutos(paginacao: PaginacaoDto) {
    const { pagina, limite } = paginacao;
    const [produtos, total] =
      await this.produtoRepository.paginacaoProdutos(paginacao);

    return {
      data: produtos,
      total,
      pagina,
      ultimaPagina: Math.ceil(total / limite),
    };
  }

  async buscarProduto(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.buscarProdutoPorId(id);

    if (!produto) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: MensagensProdutos.PRODUTO_INEXISTENTE,
      });
    }

    return produto;
  }

  async editarProduto(id: number, dto: ProdutoDto): Promise<Produto> {
    const produto = await this.produtoRepository.buscarProdutoPorId(id);
    if (!produto) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: MensagensProdutos.PRODUTO_INEXISTENTE,
      });
    }

    produto.nome = dto.nome;
    produto.dataValidade = dto.dataValidade;
    produto.dataFab = dto.dataFab;

    return await this.produtoRepository.salvarProduto(produto);
  }

  async deletarProduto(id: number) {
    const produto = await this.produtoRepository.buscarProdutoPorId(id);
    if (!produto) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: MensagensProdutos.PRODUTO_INEXISTENTE,
      });
    }

    return await this.produtoRepository.deletarProdutoPorId(id);
  }
}
