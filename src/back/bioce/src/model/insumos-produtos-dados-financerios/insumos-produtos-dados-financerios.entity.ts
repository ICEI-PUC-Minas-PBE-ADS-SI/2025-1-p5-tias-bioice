import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
} from 'typeorm';
import { Produto } from '../produto/produto.entity';
import { Insumo } from '../insumo/insumo.entity';
import { DadosFinanceiros } from '../dados-financeiros/dados-financeiros.entity';

@Entity({ name: 'insumos_produtos_dados_financeiros' })
export class InsumosProdutosDadosFinanceirosEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'quantitativo' })
    quantitativo: number;

    @ManyToOne(() => Produto, produto => produto.relacoesFinanceiras)
    @JoinColumn({ name: 'produto_id' })
    produto: Produto;

    @ManyToOne(() => Insumo, insumo => insumo.relacoesFinanceiras)
    @JoinColumn({ name: 'insumo_id' })
    insumo: Insumo;

    @ManyToOne(() => DadosFinanceiros,
    dadosFinaceiros => dadosFinaceiros.relacoesFinanceiras)
    @JoinColumn({ name: 'dados_financeiros_id' })
    dadosFinanceiros: DadosFinanceiros;
}
