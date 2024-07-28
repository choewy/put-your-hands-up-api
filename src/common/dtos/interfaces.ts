import { CredentialsDTO } from './credentials.dto';

export interface ThirdPartyServiceImpl {
  collectOrders(credentials: CredentialsDTO): Promise<unknown[]>;
}
