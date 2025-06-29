import { MetricaService } from '../../service/metrica/metrica.service';
import {
  Body,
  Controller, Delete,
  Get,
  HttpStatus, Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { Metricas } from '../../model/metrica/metricas.entity';
import {PaginacaoDto} from "../../shared/dto/paginacao.dto";
import { CriarMetricaDto } from '../../model/metrica/dto/criar-metrica.dto';
import { EditarMetricasDto } from '../../model/metrica/dto/editar-metricas.dto';
import {IdDto} from "../../shared/dto/id.dto";
import {MensagensMetricas} from "../../model/metrica/utils/metrica.mensagens";

@Controller('metricas')
export class MetricaController {
  constructor(private readonly metricaService: MetricaService) {}

  @Get()
  async getMetricas(
    @Query() paginacao: PaginacaoDto,
    @Res() response: Response,
  ): Promise<Response> {
    const { pagina, limite } = paginacao;
    const metricas: Metricas[] = await this.metricaService.getMetricas(
      pagina,
      limite,
    );
    return response.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: metricas
    });
  }

  @Post()
  async adicionarMetricas(
    @Body() criarMetricaDto: CriarMetricaDto,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const metricasCriadas: Metricas =
        await this.metricaService.criarMetricas(criarMetricaDto);
      return response.status(HttpStatus.CREATED).send({
        status: HttpStatus.CREATED,
        message: MensagensMetricas.METRICAS_CRIADAS,
        data: metricasCriadas
      });
    } catch (e) {
      throw e;
    }
  }

  @Put()
  async editarMetricas(
    @Body() editarMetricas: EditarMetricasDto,
    @Res() response: Response,
  ): Promise<Response> {
    const metricasEditadas: Metricas =
      await this.metricaService.editarMetricas(editarMetricas);
    return response.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: MensagensMetricas.METRICAS_EDITADAS,
      data: metricasEditadas
    });
  }

  @Delete('/:id')
  async deletarMetrica(
      @Param() id: IdDto,
      @Res() response: Response,
  ): Promise<Response> {
    await this.metricaService.deletarMetrica(id.id);
    return response.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: MensagensMetricas.METRICA_EXCLUIDA
    });
  }
}
