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
import { IdDto } from '../../shared/id.dto';
import { EditarUsuarioDto } from '../../model/usuario/dto/editar-usuario.dto';
import { MensagensUsuario } from '../../model/usuario/utils/mensagens-usuario';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async criarUsuario(
    @Body() criarUsuarioDto: CriarUsuarioDto,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const usuarioCriado: Usuario =
        await this.usuarioService.criarUsuario(criarUsuarioDto);
      return response.status(HttpStatus.CREATED).send(usuarioCriado);
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
      return response.status(HttpStatus.OK).send(usuarioEditado);
    } catch (e) {
      throw e;
    }
  }

  @Get('/:id')
  async getUserById(
    @Param() id: IdDto,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const usuario: Partial<Usuario> =
        await this.usuarioService.getUsuarioById(id.id);
      return response.status(HttpStatus.OK).send(usuario);
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
        .send(MensagensUsuario.USUARIO_EXCLUIDO(nomeUsuarioExcluido));
    } catch (e) {
      throw e;
    }
  }
}
