import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MensagensPraticasSustentaveis } from '../../model/praticas-sustentaveis/utils/mensagens-praticas-sustentaveis';
import { PaginacaoPraticasSustentaveisDto } from '../../model/praticas-sustentaveis/dto/paginacao-praticas-sustentaveis.dto';
import { PraticasSustentaveisRepository } from '../../repository/praticas-sustentaveis/praticas-sustentaveis.repository';
import { PraticasSustentaveisDto } from '../../model/praticas-sustentaveis/dto/praticas-sustentaveis.dto';
import { PraticasSustentaveis } from '../../model/praticas-sustentaveis/praticas-sustentaveis.entity';

@Injectable()
export class PraticasSustentaveisService {
  constructor(
    private readonly praticasSustentaveiesRepository: PraticasSustentaveisRepository,
  ) {}

  async cadastrarPraticaSustentavel(
    dto: PraticasSustentaveisDto,
  ): Promise<PraticasSustentaveis> {
    const deveExistir: boolean = false;

    const novaPraticaSustentavel = new PraticasSustentaveis();
    novaPraticaSustentavel.nome = dto.nome;
    novaPraticaSustentavel.tarefa = dto.tarefa;

    await this.validarExistenciaDaPraticaSustentavel(
      novaPraticaSustentavel,
      deveExistir,
    );

    return await this.praticasSustentaveiesRepository.salvarPraticaSustentavel(
      novaPraticaSustentavel,
    );
  }

  async validarExistenciaDaPraticaSustentavel(
    praticaSustentavel: Partial<PraticasSustentaveis>,
    deveExistir: boolean,
  ): Promise<void> {
    const praticaSustentavelExiste: boolean =
      await this.praticasSustentaveiesRepository.verificarExistenciaDaPraticaSustentavel(
        praticaSustentavel,
      );
    if (praticaSustentavelExiste && !deveExistir) {
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        message: MensagensPraticasSustentaveis.PRATICA_JA_EXISTE,
      });
    }
    if (!praticaSustentavelExiste && deveExistir) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: MensagensPraticasSustentaveis.PRATICA_INEXISTENTE,
      });
    }
  }

  async exibirPraticasSustentaveis(
    paginacao: PaginacaoPraticasSustentaveisDto,
  ) {
    const { pagina, limite } = paginacao;
    const [praticas, total] =
      await this.praticasSustentaveiesRepository.paginacaoPraticasSustentaveis(
        paginacao,
      );

    return {
      data: praticas,
      total,
      pagina,
      ultimaPagina: Math.ceil(total / limite),
    };
  }

  async buscarPraticaSustentavel(id: number): Promise<PraticasSustentaveis> {
    const praticaSustentavel =
      await this.praticasSustentaveiesRepository.buscarPraticaSustentavel(id);

    if (!praticaSustentavel) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: MensagensPraticasSustentaveis.PRATICA_INEXISTENTE,
      });
    }

    return praticaSustentavel;
  }

  async editarPraticaSustentavel(
    id: number,
    dto: PraticasSustentaveisDto,
  ): Promise<PraticasSustentaveis> {
    const praticaSustentavel =
      await this.praticasSustentaveiesRepository.buscarPraticaSustentavel(id);
    if (!praticaSustentavel) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: MensagensPraticasSustentaveis.PRATICA_INEXISTENTE,
      });
    }

    praticaSustentavel.nome = dto.nome;
    praticaSustentavel.tarefa = dto.tarefa;

    return await this.praticasSustentaveiesRepository.salvarPraticaSustentavel(
      praticaSustentavel,
    );
  }

  async deletarPraticaSustentavel(id: number) {
    const praticaSustentavel =
      await this.praticasSustentaveiesRepository.buscarPraticaSustentavel(id);
    if (!praticaSustentavel) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: MensagensPraticasSustentaveis.PRATICA_INEXISTENTE,
      });
    }

    return await this.praticasSustentaveiesRepository.deletarPraticaSustentavel(
      id,
    );
  }
}
