import { TargetName } from '@common/constants';
import { CredentialsDTO, DateConditionDTO } from '@common/dtos';
import { HttpStatus } from '@nestjs/common';

export interface ExceptionErrorProps<D = any> {
  name: string;
  message: string;
  details?: D;
}

export interface ExceptionProps<D = any> {
  statusCode: HttpStatus;
  errorCode: string;
  error?: ExceptionErrorProps<D>;
}

export interface ThirdPartyServiceImpl
  extends Partial<{
    collectOrders<V = any>(target: TargetName, credentials: CredentialsDTO, condition: DateConditionDTO): Promise<V>;
    transferInvoices<T = any>(target: TargetName, credentials: CredentialsDTO): Promise<T>;
  }> {}
