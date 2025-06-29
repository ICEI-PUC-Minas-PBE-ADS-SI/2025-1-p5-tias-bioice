import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

@Entity({ name: 'insumo' })
export class Insumo extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'nome_produto' })
  nome: string;

  @Column({ name: 'dt_validade' })
  dataValidade: Date;

  @Column({ name: 'Dt_registro' })
  dataRegistro: Date;

  @Column({ name: 'lote' })
  lote: string;

  @Column({ name: 'Descrição' })
  descricao: string;

  @ManyToOne(() => Usuario, (usuario: Usuario) => usuario.insumos)
  @JoinColumn({ name: 'id_user_FK' })
  usuario: Usuario;
}
