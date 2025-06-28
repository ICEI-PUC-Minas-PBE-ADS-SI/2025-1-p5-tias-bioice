import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn, JoinTable, ManyToMany,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import {DadosFinanceiros} from "../dados-financeiros/dados-financeiros.entity";
import {
  InsumosProdutosDadosFinanceirosEntity
} from "../insumos-produtos-dados-financerios/insumos-produtos-dados-financerios.entity";

@Entity({ name: 'produto' })
export class Produto extends BaseEntity {
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'nome_produto'})
  nome: string;

  @Column({name: 'dt_validade'})
  dataValidade: Date;

  @Column({name: 'dataFab'})
  dataFab: Date;

  @ManyToOne(() => Usuario, (usuario: Usuario) => usuario.produtos)
  @JoinColumn({name: 'id_user_FK'})
  usuario: Usuario;

  @OneToMany(() => InsumosProdutosDadosFinanceirosEntity,
  (rel) => rel.produto)
  relacoesFinanceiras: InsumosProdutosDadosFinanceirosEntity[];
}
