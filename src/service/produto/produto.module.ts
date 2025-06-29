import { Module } from '@nestjs/common';
import { ProdutoController } from '../../controller/produto/produto.controller';
import { ProdutoService } from './produto.service';
import { ProdutoRepository } from '../../repository/produto/produto.repository';

@Module({
  controllers: [ProdutoController],
  providers: [ProdutoService, ProdutoRepository],
})
export class ProdutoModule {}
