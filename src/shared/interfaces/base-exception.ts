import { HttpException, HttpStatus } from '@nestjs/common';

export interface BaseException {
  status: HttpStatus;
  message: string;
}
