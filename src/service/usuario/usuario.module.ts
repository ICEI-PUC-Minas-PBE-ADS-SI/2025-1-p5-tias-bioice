import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../../model/usuario/usuario.entity';
import { UsuarioController } from '../../controller/usuario/usuario.controller';
import { UsuarioService } from './usuario.service';
import { UsuarioRepository } from '../../repository/usuario/usuario.repository';
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), AuthModule],
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioRepository],
  exports: [UsuarioService],
})
export class UsuarioModule {}
