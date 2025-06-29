import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { MetricaRepository } from '../../repository/metrica/metrica.repository';
import { Metricas } from '../../model/metrica/metricas.entity';
import { CriarMetricaDto } from '../../model/metrica/dto/criar-metrica.dto';
import { EditarMetricasDto } from '../../model/metrica/dto/editar-metricas.dto';
import { MensagensMetricas } from '../../model/metrica/utils/metrica.mensagens';

@Injectable()
export class MetricaService {
  constructor(private readonly metricaRepository: MetricaRepository) {}

  async getMetricas(pagina: number, limite: number): Promise<Metricas[]> {
    return await this.metricaRepository.getMetricas(pagina, limite);
  }

  async criarMetricas(criarMetricaDto: CriarMetricaDto): Promise<Metricas> {
    const { financeira, desperdicio, descarte } = criarMetricaDto;
    if (!financeira && !desperdicio && !descarte) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: MensagensMetricas.AO_MENOS_UMA_METRICA_DEVE_SER_INFORMADA
      })
    }
    const metricaEntity: Metricas = new Metricas({
      desperdicio: desperdicio,
      financeira: financeira,
      descarte: descarte,
    });
    return await this.metricaRepository.saveMetrica(metricaEntity);
  }

  async editarMetricas(editarMetricas: EditarMetricasDto): Promise<Metricas> {
    const metricaExiste: boolean =
      await this.metricaRepository.verificarMetricaExiste(editarMetricas.id);
    if (!metricaExiste) {
      throw new BadRequestException({
        status: HttpStatus.NOT_FOUND,
        message: MensagensMetricas.METRICA_NAO_EXISTE,
      });
    }
    const { id, desperdicio, descarte, financeira } = editarMetricas;
    const metricaEditada: Metricas = new Metricas({
      id: id,
      desperdicio: desperdicio,
      descarte: descarte,
      financeira: financeira,
    });
    return await this.metricaRepository.saveMetrica(metricaEditada);
  }

  async deletarMetrica(id: number): Promise<void> {
    const metricaExiste: boolean =
      await this.metricaRepository.verificarMetricaExiste(id);
    if (!metricaExiste) {
      throw new BadRequestException({
        status: HttpStatus.NOT_FOUND,
        message: MensagensMetricas.METRICA_NAO_EXISTE,
      });
    }
    await this.metricaRepository.deletarMetrica(id);
  }
}
