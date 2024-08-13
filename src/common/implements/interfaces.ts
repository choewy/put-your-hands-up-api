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

// TODO OrderRow interface, InvoiceRow interface
export interface ThirdPartyServiceImpl<OrderRow = any, InvoiceRow = any>
  extends Partial<{
    collectOrders(target: TargetName, credentials: CredentialsDTO, condition: DateConditionDTO): Promise<OrderRow>;
    transferInvoices(target: TargetName, credentials: CredentialsDTO): Promise<InvoiceRow>;
  }> {}
