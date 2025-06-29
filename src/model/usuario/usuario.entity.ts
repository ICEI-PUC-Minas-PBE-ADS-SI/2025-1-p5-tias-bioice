import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NivelPermissaoEnum } from './enums/nivel-permissao.enum';
import { Produto } from '../produto/produto.entity';
import { Insumo } from '../insumo/insumo.entity';
import { DadosFinanceiros } from '../dados-financeiros/dados-financeiros.entity';
 @Entity({ name: 'usuario' })
export class Usuario extends BaseEntity {
  constructor(partialUsuario?: Partial<Usuario>) {
    super();
    if (!partialUsuario) return;
    const { id, username, email, senha, salt, nivelPermissao, isExcluido } = partialUsuario;
    this.isExcluido = !!isExcluido;
    if (id) {
      this.id = id;
    }
    if (username) {
      this.username = username;
    }
    if (senha) {
      this.senha = senha;
    }
    if (salt) {
      this.salt = salt;
    }
    if (email) {
      this.email = email;
    }
    if (nivelPermissao) {
      this.nivelPermissao = nivelPermissao;
    }
  }

  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'UserName' })
  username: string;

  @Column({ name: 'Email' })
  email: string;

  @Column({ name: 'Senha' })
  senha: string;

  @Column({ name: 'salt' })
  salt: string;

  @Column({ name: 'nivel_permissao' })
  nivelPermissao: NivelPermissaoEnum;

  @Column({ default: false, type: 'boolean', name: 'isExcluido' })
  isExcluido: boolean;

  @OneToMany(() => Produto, (produto: Produto) => produto.usuario)
  produtos: Produto[];

  @OneToMany(() => Insumo, (insumo: Insumo) => insumo.usuario)
  insumos: Insumo[];

  @OneToMany(
    () => DadosFinanceiros,
    (dadosFinanceiros: DadosFinanceiros) => dadosFinanceiros.usuario,
  )
  dadosFinanceiros: DadosFinanceiros[];
}
