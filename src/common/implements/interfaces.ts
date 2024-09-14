import { HttpStatus, ModuleMetadata } from '@nestjs/common';

export interface DynamicModuleOptions {
  isGlobal?: boolean;
}

export interface DynamicModuleAsyncOptions<T> extends Pick<ModuleMetadata, 'imports'> {
  isGlobal?: boolean;
  inject?: any[];
  useFactory?: (...args: any[]) => Promise<T> | T;
}

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
