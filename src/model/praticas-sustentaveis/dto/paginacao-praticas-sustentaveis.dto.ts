import { IsDefined, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginacaoPraticasSustentaveisDto {
  @IsDefined()
  @Type(() => Number)
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  pagina: number;

  @IsDefined()
  @Type(() => Number)
  @Min(1)
  @Max(50)
  limite: number;
}
