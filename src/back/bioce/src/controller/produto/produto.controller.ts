import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProdutoService } from '../../service/produto/produto.service';
import { ProdutoDto } from '../../model/produto/dto/produto.dto';
import { PaginacaoDto } from '../../shared/dto/paginacao.dto';
import { MensagensProdutos } from '../../model/produto/utils/mensagens-produtos';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async exibirProdutos(@Query() paginacao: PaginacaoDto) {
    const produtos = await this.produtoService.exibirProdutos(paginacao);
    return {
      data: produtos,
      messagem: MensagensProdutos.PRODUTOS_ENCONTRADOS,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async buscarProduto(@Param('id') id: number) {
    const produto = await this.produtoService.buscarProduto(id);
    return {
      data: produto,
      mensagem: MensagensProdutos.PRODUTO_ECONTRADO,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async cadastrarProduto(@Body() produto: ProdutoDto) {
    const novoProduto = await this.produtoService.cadastrarProduto(produto);
    return {
      data: novoProduto,
      mensagem: MensagensProdutos.PRODUTO_CADASTRADO,
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async editarProduto(@Param('id') id: number, @Body() produto: ProdutoDto) {
    const produtoAtualizado = await this.produtoService.editarProduto(
      id,
      produto,
    );
    return {
      data: produtoAtualizado,
      mensagem: MensagensProdutos.PRODUTO_ATUALIZADO,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deletarProduto(@Param('id') id: number) {
    await this.produtoService.deletarProduto(id);
    return {
      mesagem: MensagensProdutos.PRODUTO_DELETADO,
    };
  }
}
