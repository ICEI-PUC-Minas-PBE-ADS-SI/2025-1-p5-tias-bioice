import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CriarUsuarioDto } from '../../model/usuario/dto/criar-usuario.dto';
import { Usuario } from '../../model/usuario/usuario.entity';
import { UsuarioService } from '../../service/usuario/usuario.service';
import { Response } from 'express';
import {IdDto} from "../../shared/dto/id.dto";
import { EditarUsuarioDto } from '../../model/usuario/dto/editar-usuario.dto';
import { MensagensUsuario } from '../../model/usuario/utils/mensagens-usuario';
import { DataSource } from 'typeorm';
import {AccessToken} from "../../model/auth/interfaces/access-token.interface";
import {LoginDTO} from "../../model/usuario/dto/login.dto";

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private dataSource: DataSource
  ) { }

  @Post()
  async criarUsuario(
    @Body() criarUsuarioDto: CriarUsuarioDto,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const usuarioCriado: Usuario =
        await this.usuarioService.criarUsuario(criarUsuarioDto);
      return response.status(HttpStatus.CREATED).send({
        status: HttpStatus.CREATED,
        message: MensagensUsuario.USUARIO_CRIADO,
        data: usuarioCriado
      });
    } catch (e) {
      throw e;
    }
  }

  @Put()
  async editarUsuario(
    @Body() editarUsuarioDto: EditarUsuarioDto,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const usuarioEditado: Usuario =
        await this.usuarioService.editarUsuario(editarUsuarioDto);
      return response.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        message: MensagensUsuario.USUARIO_EDITADO,
        data: usuarioEditado
      });
    } catch (e) {
      throw e;
    }
  }

  @Get('/:id')
  async getUserById(
    @Param() id: IdDto,
    @Res() response: Response,
  ): Promise<Response> {
    const connectionDetails = {
      name: this.dataSource.name,
      type: this.dataSource.options.type,
      database: this.dataSource.options.database,
      isConnected: this.dataSource.isInitialized,
    };

    try {
      const usuario: Partial<Usuario> =
        await this.usuarioService.getUsuarioById(id.id);
      // return response.status(HttpStatus.OK).send({ ...usuario, connectionDetails });
      return response.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        data: usuario
      });
    } catch (e) {
      throw e;
    }
  }

  @Delete('/:id')
  async deletarUsuario(
    @Param() id: IdDto,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const nomeUsuarioExcluido: string =
        await this.usuarioService.deleteUsuario(id.id);
      return response
        .status(HttpStatus.OK)
        .send({
          status: HttpStatus.OK,
          message: MensagensUsuario.USUARIO_EXCLUIDO(nomeUsuarioExcluido)
        });
    } catch (e) {
      throw e;
    }
  }

  @Post('auth')
  async login(
      @Body() loginDto: LoginDTO,
      @Res() response: Response
  ): Promise<Response> {
    try {
      const accessToken: AccessToken = await this.usuarioService.login(loginDto);
      return response.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        message: MensagensUsuario.USUARIO_AUTENTICADO,
        data: accessToken
      });
    } catch (e) {
      throw e;
    }
  }
}
