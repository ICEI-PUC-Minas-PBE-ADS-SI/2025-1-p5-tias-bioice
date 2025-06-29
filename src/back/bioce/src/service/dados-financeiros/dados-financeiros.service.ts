
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
import {
    CriarDadosFinanceirosDto,
    ItemMovimentadoDto
} from "../../model/dados-financeiros/dto/criar-dados-financeiros.dto";
import {DadosFinanceiros} from "../../model/dados-financeiros/dados-financeiros.entity";
import {
    InsumosProdutosDadosFinanceirosEntity
} from "../../model/insumos-produtos-dados-financerios/insumos-produtos-dados-financerios.entity";
import {MensagensDadosFinanceiros} from "../../model/dados-financeiros/utils/mensagens-dados-financeiros";
import {ProdutoService} from "../produto/produto.service";
import {InsumoService} from "../insumo/insumo.service";
import {Produto} from "../../model/produto/produto.entity";
import {Insumo} from "../../model/insumo/insumo.entity";

@Injectable()
export class DadosFinanceirosService {
    constructor(
        private readonly dadoFinanceiroRepository: DadosFinanceirosRepository,
        private readonly produtoService: ProdutoService,
        private readonly insumoService: InsumoService,
    ) {}

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
        const dadoFinanceiroSalvo: DadosFinanceiros = await this.dadoFinanceiroRepository.salvarDadoFinanceiro(novoDadoFinanceiro);

        // Verificar existência de todos os insumos aqui e implementar o mesmo para produto
        // await this.validarExistenciaDoInsumo(novoDadoFinanceiro, deveExistir);

        const { itens } = dto;
        const relacoesFinanceiras: InsumosProdutosDadosFinanceirosEntity[] = itens.map((item: ItemMovimentadoDto): InsumosProdutosDadosFinanceirosEntity => {
            const { produtoId, insumoId } = item;
            if (produtoId) {
                return {
                    dadosFinanceiros: dadoFinanceiroSalvo,
                    produto: new Produto(produtoId),
                    quantitativo: item.quantitativo
                } as InsumosProdutosDadosFinanceirosEntity;
            }
            return {
                dadosFinanceiros: dadoFinanceiroSalvo,
                insumo: new Insumo(insumoId),
                quantitativo: item.quantitativo
            } as InsumosProdutosDadosFinanceirosEntity;
        })
        await this.dadoFinanceiroRepository.salvarRelacoesFinanceiras(relacoesFinanceiras);
        return dadoFinanceiroSalvo;
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
        const deveExistir: boolean = false;
        const  dadoFinanceiroAtualizado = await this.buscarDadoFinanceiroPorId(id);
        dadoFinanceiroAtualizado.isEntrada = dto.isEntrada;
        dadoFinanceiroAtualizado.valor = dto.valor;
        dadoFinanceiroAtualizado.descricao = dto.descricao;

        const dadoFinanceiroSalvo: DadosFinanceiros = await this.dadoFinanceiroRepository.salvarDadoFinanceiro(dadoFinanceiroAtualizado);

        // Verificar existência de todos os insumos aqui e implementar o mesmo para produto
        // await this.validarExistenciaDoInsumo(novoDadoFinanceiro, deveExistir);

        const { itens } = dto;
        const relacoesFinanceiras: InsumosProdutosDadosFinanceirosEntity[] = itens.map((item: ItemMovimentadoDto): InsumosProdutosDadosFinanceirosEntity => {
            const { produtoId, insumoId } = item;
            if (produtoId) {
                return {
                    dadosFinanceiros: dadoFinanceiroSalvo,
                    produto: {id: item.produtoId},
                    quantitativo: item.quantitativo
                } as InsumosProdutosDadosFinanceirosEntity;
            }
            return {
                dadosFinanceiros: dadoFinanceiroSalvo,
                insumo: {id: insumoId},
                quantitativo: item.quantitativo
            } as InsumosProdutosDadosFinanceirosEntity;
        })
        await this.dadoFinanceiroRepository.salvarRelacoesFinanceiras(relacoesFinanceiras);
        return dadoFinanceiroSalvo;
    }

    async deletarDadoFinanceiro(id: number) {
        const dadoFinanceiro: DadosFinanceiros | null = await this.dadoFinanceiroRepository.buscarDadoFinanceiroPorId(id);

        if (!dadoFinanceiro) {
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                message: MensagensDadosFinanceiros.DADO_FINACEIRO_INEXISTENTE,
            });
        }

        await this.dadoFinanceiroRepository.removerRelacoesFinanceirasPorDadoFinanceiro(id);

        return  await this.dadoFinanceiroRepository.deletarDadoFinanceiro(id);
    }


    async emitirRelatorioFinanceiro(): Promise<any>{
        return await this.dadoFinanceiroRepository.emitirRelatorioFinanceiro();
    }
}
