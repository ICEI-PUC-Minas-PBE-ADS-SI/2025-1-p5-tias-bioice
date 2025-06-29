import { Module } from '@nestjs/common';
import { PraticasSustentaveisController } from '../../controller/praticas-sustentaveis/praticas-sustentaveis.controller';
import { PraticasSustentaveisService } from './praticas-sustentaveis.service';
import { PraticasSustentaveisRepository } from '../../repository/praticas-sustentaveis/praticas-sustentaveis.repository';

@Module({
  controllers: [PraticasSustentaveisController],
  providers: [PraticasSustentaveisService, PraticasSustentaveisRepository],
})
export class PraticasSustentaveisModule {}
