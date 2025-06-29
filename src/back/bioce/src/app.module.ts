import { DynamicModule, Module } from '@nestjs/common';
import { dbConnection } from '../ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './service/usuario/usuario.module';
import { ProdutoModule } from './service/produto/produto.module';
import { PraticasSustentaveisModule } from './service/praticas-sustentaveis/praticas-sustentaveis.module';
import { MetricaModule } from './service/metrica/metrica.module';
import {InsumoModule} from "./model/insumo/insumo.module";
import {AuthModule} from "./service/auth/auth.module";

// const isPrimaryDown = process.env.DB_FAILOVER === 'true';

export function DatabaseOrmModule(): DynamicModule {
  // if (isPrimaryDown) return TypeOrmModule.forRoot(supabaseConfig);
  return TypeOrmModule.forRoot(dbConnection);
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseOrmModule(),
    UsuarioModule,
    ProdutoModule,
    PraticasSustentaveisModule,
    MetricaModule,
    InsumoModule,
    AuthModule
  ],
  providers: [],
})
export class AppModule {}
