import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CriarMetricaDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  descarte: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  desperdicio: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  financeira: string;
}
