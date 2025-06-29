import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metricas } from '../../model/metrica/metricas.entity';
import { MetricaController } from '../../controller/metrica/metrica.controller';
import { MetricaService } from './metrica.service';
import { MetricaRepository } from '../../repository/metrica/metrica.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Metricas])],
  controllers: [MetricaController],
  providers: [MetricaService, MetricaRepository],
  exports: [MetricaService],
})
export class MetricaModule {}
