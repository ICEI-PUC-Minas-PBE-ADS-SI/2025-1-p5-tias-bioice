import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

@Entity({ name: 'dados_financeiros' })
export class DadosFinanceiros extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'IsEntrada' })
  isEntrada: boolean;

  @Column({ name: 'valor' })
  valor: number;

  @Column({ name: 'data_operacao' })
  dataOperacao: Date;

  @Column({ name: 'Descrição' })
  descricao: string;

  @ManyToOne(() => Usuario, (usuario: Usuario) => usuario.insumos)
  @JoinColumn({ name: 'id_user_FK' })
  usuario: Usuario;
}
