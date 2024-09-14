import { HttpError } from '@common';
import { AxiosError } from 'axios';

export class NaverCommerceGetTokenError extends HttpError {
  constructor(e?: AxiosError) {
    super(e);

    this.name = NaverCommerceGetTokenError.name;
    this.message = '네이버 커머스 API AccessToken 발급을 실패하였습니다.';
  }
}
