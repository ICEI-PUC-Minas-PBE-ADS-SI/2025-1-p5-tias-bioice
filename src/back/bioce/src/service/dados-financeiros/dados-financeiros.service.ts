
import {
    BadRequestException,
    ConflictException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Usuario } from '../../model/usuario/usuario.entity';
import {PaginacaoDto} from "../../shared/dto/paginacao.dto";
import {DadosFinanceirosRepository} from "../../repository/dados-financeiros/dados-financeiros.repository";
import {CriarDadosFinanceirosDto} from "../../model/dados-financeiros/dto/criar-dados-financeiros.dto";
import {DadosFinanceiros} from "../../model/dados-financeiros/dados-financeiros.entity";
import {
    InsumosProdutosDadosFinanceirosEntity
} from "../../model/insumos-produtos-dados-financerios/insumos-produtos-dados-financerios.entity";
import {MensagensDadosFinanceiros} from "../../model/dados-financeiros/utils/mensagens-dados-financeiros";


@Injectable()
export class DadosFinanceirosService {
    constructor(private readonly dadoFinanceiroRepository: DadosFinanceirosRepository) {}

    async cadastrarDadoFinanceiro(dto: CriarDadosFinanceirosDto): Promise<DadosFinanceiros> {
        const usuario: Usuario | null = await Usuario.findOne({ where: { id: dto.usuarioId } });
        if (!usuario) {
            throw new BadRequestException('Usuário não encontrado!');
        }

        const deveExistir: boolean = false;

        const novoDadoFinanceiro: DadosFinanceiros = new DadosFinanceiros();
        novoDadoFinanceiro.isEntrada = dto.isEntrada;
        novoDadoFinanceiro.valor = dto.valor;
        novoDadoFinanceiro.descricao = dto.descricao;
        novoDadoFinanceiro.usuario = usuario;
        novoDadoFinanceiro.dataOperacao = new Date();

        await this.validarExistenciaDoInsumo(novoDadoFinanceiro, deveExistir);


        const movimentacaoFinanceira: InsumosProdutosDadosFinanceirosEntity = new InsumosProdutosDadosFinanceirosEntity();

        return await this.dadoFinanceiroRepository.salvarDadoFinanceiro(novoDadoFinanceiro);
    }

    async validarExistenciaDoInsumo(
        insumo: Partial<DadosFinanceiros>,
        deveExistir: boolean,
    ): Promise<void> {
        const dadoExiste: boolean =
            await this.dadoFinanceiroRepository.verificarExistenciaDoDadoFinanceiro(insumo);
        if (dadoExiste && !deveExistir) {
            throw new ConflictException({
                status: HttpStatus.CONFLICT,
                message: MensagensDadosFinanceiros.DADO_FINACEIRO_JA_EXISTE,
            });
        }
        if (!dadoExiste && deveExistir) {
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                message: MensagensDadosFinanceiros.DADO_FINACEIRO_INEXISTENTE,
            });
        }
    }

    async exibirDadosFinanceirosPaginado(paginacao: PaginacaoDto) {
        const { pagina, limite } = paginacao;
        const [dadosFinanceiros, total] =
            await this.dadoFinanceiroRepository.paginacaoDadosFinanceiros(paginacao);

        return {
            data: dadosFinanceiros,
            total,
            pagina,
            ultimaPagina: Math.ceil(total / limite),
        };
    }

    async buscarDadoFinanceiroPorId(id: number): Promise<DadosFinanceiros> {
        const dadoFinanceiro = await this.dadoFinanceiroRepository.buscarDadoFinanceiroPorId(id);

        if (!dadoFinanceiro) {
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                message: MensagensDadosFinanceiros.DADO_FINACEIRO_INEXISTENTE,
            });
        }

        return dadoFinanceiro;
    }

    async editarDadoFinanceiro(id: number, dto: CriarDadosFinanceirosDto): Promise<DadosFinanceiros> {
        const dadoFinanceiro = await this.dadoFinanceiroRepository.buscarDadoFinanceiroPorId(id);
        if (!dadoFinanceiro) {
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                message: MensagensDadosFinanceiros.DADO_FINACEIRO_INEXISTENTE,
            });
        }

        dadoFinanceiro.isEntrada = dto.isEntrada;
        dadoFinanceiro.valor = dto.valor;
        dadoFinanceiro.descricao = dto.descricao;

        return await this.dadoFinanceiroRepository.salvarDadoFinanceiro(dadoFinanceiro);
    }

    async deletarDadoFinanceiro(id: number) {
        const dadoFinanceiro = await this.dadoFinanceiroRepository.buscarDadoFinanceiroPorId(id);
        if (!dadoFinanceiro) {
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                message: MensagensDadosFinanceiros.DADO_FINACEIRO_INEXISTENTE,
            });
        }

        return await this.dadoFinanceiroRepository.deletarDadoFinanceiro(id);
    }
}
