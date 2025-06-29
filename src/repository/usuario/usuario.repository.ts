import { Injectable } from '@nestjs/common';
import { Usuario } from '../../model/usuario/usuario.entity';
import { DataSource, SelectQueryBuilder } from 'typeorm';
import {FindOptionsWhere} from "typeorm/find-options/FindOptionsWhere";
import {RespostaPaginada} from "../../shared/interfaces/resposta-paginada.interface";
import {skip} from "rxjs";
import {PaginationUtils} from "../../shared/classes/pagination-utils.class";

@Injectable()
export class UsuarioRepository {
  constructor(private dataSource: DataSource) {}

  async saveUsuario(usuario: Usuario): Promise<Usuario> {
    const ret = await Usuario.save(usuario);
    console.log('está salvando o usuário');
    console.log(this.dataSource);
    console.log(ret);

    return ret;
  }

  async verificarExistenciaDoUsuario(
    usuario: Partial<Usuario>,
  ): Promise<boolean> {
    const { id, username, email } = usuario;
    const query: SelectQueryBuilder<Usuario> =
      Usuario.createQueryBuilder('usuario')
        .where('usuario.isExcluido = false');
    if (username) {
      query.andWhere('usuario.username = :username', { username });
    }
    if (email) {
      query.andWhere('usuario.email = :email', { email });
    }
    if (id) {
      query.andWhere('usuario.id = :id', { id });
    }
    return query.getExists();
  }

  async findOneById(id: number): Promise<Usuario | null> {
    return await Usuario.findOneBy({ id: id });
  }

  async getUserById(id: number): Promise<Usuario | null> {
    return await Usuario.findOne({ where: { id: id } });
  }

  async performarExclusaoLogicaDeUsuario(id: number): Promise<void> {
    const usuario: Usuario = new Usuario({ id: id, isExcluido: true });
    await this.saveUsuario(usuario);
  }

  async buscarUsuario(whereClause: FindOptionsWhere<Usuario>): Promise<Usuario | null> {
    return await Usuario.findOne({
      where: whereClause
    });
  }

  async buscarUsuariosPaginado(
      pagina: number,
      limite: number
  ): Promise<RespostaPaginada<Usuario>> {
    const usuarios: Usuario[] = await Usuario.find({
      where: { isExcluido: false },
      select: {
        id: true,
        username: true,
        email: true,
        nivelPermissao: true,
      },
      skip: PaginationUtils.CalcularSkip(pagina, limite),
      take: limite,
    });
    return {
      pageNumber: pagina,
      pageSize: limite,
      totalCount: await Usuario.countBy({ isExcluido: false }),
      countOfPage: usuarios.length,
      data: usuarios
    };
  }
}
