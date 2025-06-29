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
import { PraticasSustentaveisDto } from '../../model/praticas-sustentaveis/dto/praticas-sustentaveis.dto';
import { MensagensPraticasSustentaveis } from '../../model/praticas-sustentaveis/utils/mensagens-praticas-sustentaveis';
import { PraticasSustentaveisService } from '../../service/praticas-sustentaveis/praticas-sustentaveis.service';
import { PaginacaoPraticasSustentaveisDto } from '../../model/praticas-sustentaveis/dto/paginacao-praticas-sustentaveis.dto';

@Controller('praticasSustentaveis')
export class PraticasSustentaveisController {
  constructor(
    private readonly praticasSustentaveisService: PraticasSustentaveisService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async exibirPraticasSustentaveis(
    @Query() paginacao: PaginacaoPraticasSustentaveisDto,
  ) {
    const praticas =
      await this.praticasSustentaveisService.exibirPraticasSustentaveis(
        paginacao,
      );
    return {
      data: praticas,
      messagem: MensagensPraticasSustentaveis.PRATICAS_ENCONTRADAS,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async buscarPraticaSustentavel(@Param('id') id: number) {
    const praticaSustentavel =
      await this.praticasSustentaveisService.buscarPraticaSustentavel(id);
    return {
      data: praticaSustentavel,
      mensagem: MensagensPraticasSustentaveis.PRATICA_ECONTRADA,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async cadastrarPraticaSustentavel(
    @Body() praticaSustentavel: PraticasSustentaveisDto,
  ) {
    const novaPraticaSustentavel =
      await this.praticasSustentaveisService.cadastrarPraticaSustentavel(
        praticaSustentavel,
      );
    return {
      data: novaPraticaSustentavel,
      mensagem: MensagensPraticasSustentaveis.PRATICA_CADASTRADA,
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async editarPraticaSustentavel(
    @Param('id') id: number,
    @Body() praticaSustentavel: PraticasSustentaveisDto,
  ) {
    const praticaSustentavelAtualizada =
      await this.praticasSustentaveisService.editarPraticaSustentavel(
        id,
        praticaSustentavel,
      );
    return {
      data: praticaSustentavelAtualizada,
      mensagem: MensagensPraticasSustentaveis.PRATICA_ATUALIZADA,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deletarPraticaSustentavel(@Param('id') id: number) {
    await this.praticasSustentaveisService.deletarPraticaSustentavel(id);
    return {
      mesagem: MensagensPraticasSustentaveis.PRATICA_DELETADA,
    };
  }
}
