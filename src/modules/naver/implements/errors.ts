import { HttpError } from '@common';
import { AxiosError } from 'axios';

export class NaverGetTokenError extends HttpError {
  constructor(e?: AxiosError) {
    super(e);

    this.name = NaverGetTokenError.name;
    this.message = '네이버 API AccessToken 발급을 실패하였습니다.';
  }
}
