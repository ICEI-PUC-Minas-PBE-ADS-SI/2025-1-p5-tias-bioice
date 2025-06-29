import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

@Entity({ name: 'produto' })
export class Produto extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'nome_produto' })
  nome: string;

  @Column({ name: 'dt_validade' })
  dataValidade: Date;

  @Column({ name: 'dataFab' })
  dataFab: Date;

  @ManyToOne(() => Usuario, (usuario: Usuario) => usuario.produtos)
  @JoinColumn({ name: 'id_user_FK' })
  usuario: Usuario;
}
