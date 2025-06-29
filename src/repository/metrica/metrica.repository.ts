import { Injectable } from '@nestjs/common';
import { Metricas } from '../../model/metrica/metricas.entity';
import { skip } from 'rxjs';

@Injectable()
export class MetricaRepository {
  constructor() {}

  async getMetricas(pagina: number, limite: number): Promise<Metricas[]> {
    const skip: number = pagina * (limite - 1);
    return await Metricas.find({
      skip: pagina == 1 ? 0 : skip,
      take: limite,
    });
  }

  async saveMetrica(metrica: Metricas): Promise<Metricas> {
    return await Metricas.save(metrica);
  }

  async verificarMetricaExiste(id: number): Promise<boolean> {
    return await Metricas.createQueryBuilder('metrica')
      .where('metrica.id = :id', { id })
      .getExists();
  }

  async deletarMetrica(id: number): Promise<void> {
    await Metricas.createQueryBuilder()
      .delete()
      .from(Metricas)
      .where('id = :id', { id })
      .delete()
      .execute();
  }
}
