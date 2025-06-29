import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'metricas' })
export class Metricas extends BaseEntity {
  constructor(partialMetricas?: Partial<Metricas>) {
    super();
    if (!partialMetricas) {
      return;
    }
    const { id, descarte, financeira, desperdicio } = partialMetricas;
    if (id) {
      this.id = id;
    }
    this.descarte = descarte ? descarte : '';
    this.financeira = financeira ? financeira : '';
    this.desperdicio = desperdicio ? desperdicio : '';
  }

  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'Descarte' })
  descarte: string;

  @Column({ name: 'desperdicio' })
  desperdicio: string;

  @Column({ name: 'financeira' })
  financeira: string;
}
