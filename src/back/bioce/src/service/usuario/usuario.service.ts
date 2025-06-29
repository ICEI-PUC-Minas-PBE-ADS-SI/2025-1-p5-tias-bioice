import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException, UnauthorizedException,
} from '@nestjs/common';
import { UsuarioRepository } from '../../repository/usuario/usuario.repository';
import { CriarUsuarioDto } from '../../model/usuario/dto/criar-usuario.dto';
import { Usuario } from '../../model/usuario/usuario.entity';
import * as bcrypt from 'bcrypt';
import { MensagensUsuario } from '../../model/usuario/utils/mensagens-usuario';
import { EditarUsuarioDto } from '../../model/usuario/dto/editar-usuario.dto';
import { NomeDoUsuario } from '../../model/usuario/nome-usuario.type';
import { Count } from '../../shared/interfaces/count.interface';
import {LoginDTO} from "../../model/usuario/dto/login.dto";
import {AccessToken} from "../../model/auth/interfaces/access-token.interface";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class UsuarioService {
  constructor(
      private readonly usuarioRepository: UsuarioRepository,
      private readonly authService: AuthService
  ) {}

  async criarUsuario(criarUsuarioDto: CriarUsuarioDto): Promise<Usuario> {
    const usuario: Usuario =
      await this.instanciarUsuarioByDtoDeCriacao(criarUsuarioDto);
    const deveExistir: boolean = false;
    await this.validarExistenciaDoUsuario(new Usuario({ username: usuario.username }), deveExistir);
    const usuarioCriado: Usuario = await this.usuarioRepository.saveUsuario(usuario);
    return this.instanciarUsuarioRetirandoDadosSensiveis(usuarioCriado);
  }

  async validarExistenciaDoUsuario(
    usuario: Partial<Usuario>,
    deveExistir: boolean,
  ): Promise<void> {
    const usuarioExiste: boolean =
      await this.usuarioRepository.verificarExistenciaDoUsuario(usuario);
    if (usuarioExiste && !deveExistir) {
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        message: MensagensUsuario.USUARIO_JA_EXISTE,
      });
    }
    if (!usuarioExiste && deveExistir) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: MensagensUsuario.USUARIO_NAO_EXISTE,
      });
    }
  }

  async editarUsuario(editarUsuarioDto: EditarUsuarioDto): Promise<Usuario> {
    const usuario: Usuario =
      await this.instanciarUsuarioByDtoDeCriacao(editarUsuarioDto);
    usuario.id = editarUsuarioDto.id;
    const deveExistir: boolean = true;
    await this.validarExistenciaDoUsuario(
      new Usuario({ id: usuario.id }),
      deveExistir,
    );
    const usuarioEditado: Usuario = await this.usuarioRepository.saveUsuario(usuario);
    return this.instanciarUsuarioRetirandoDadosSensiveis(usuarioEditado);
  }

  async instanciarUsuarioByDtoDeCriacao(
    criarUsuarioDto: CriarUsuarioDto,
  ): Promise<Usuario> {
    const { name, senha, email, nivelPermissao } = criarUsuarioDto;
    const salt: string = await bcrypt.genSalt();
    return new Usuario({
      username: name,
      salt: salt,
      senha: await bcrypt.hash(senha, salt),
      email: email,
      nivelPermissao: nivelPermissao,
      isExcluido: false,
    });
  }

  async deleteUsuario(id: number): Promise<NomeDoUsuario> {
    const usuario: Usuario | null =
      await this.usuarioRepository.findOneById(id);
    if (!usuario || usuario.isExcluido) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: MensagensUsuario.USUARIO_NAO_EXISTE,
      });
    }
    await this.usuarioRepository.performarExclusaoLogicaDeUsuario(usuario.id);
    return usuario.username;
  }

  async getUsuarioById(usuarioId: number): Promise<Partial<Usuario>> {
    const usuario: Usuario | null =
      await this.usuarioRepository.getUserById(usuarioId);
    if (!usuario || usuario.isExcluido) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: MensagensUsuario.USUARIO_NAO_EXISTE,
      });
    }
    const { id, username, email, nivelPermissao, isExcluido } = usuario;
    return new Usuario({
      id: id,
      username: username,
      email: email,
      nivelPermissao: nivelPermissao,
      isExcluido: isExcluido
    });
  }

  instanciarUsuarioRetirandoDadosSensiveis(usuario: Usuario): Usuario {
    const { id, username, email, nivelPermissao, isExcluido } = usuario;
    return new Usuario({
      id: id,
      username: username,
      email: email,
      nivelPermissao: nivelPermissao,
      isExcluido: isExcluido
    });
  }

  async login(loginDto: LoginDTO): Promise<AccessToken> {
    const { email, senha } = loginDto;
    const usuario: Usuario | null = await this.usuarioRepository.buscarUsuario({
      email: email
    });

    if (!usuario) {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        message: MensagensUsuario.EMAIL_OU_SENHA_INCORRETOS
      });
    }
    return await this.authService.login(usuario, senha);
  }
}
