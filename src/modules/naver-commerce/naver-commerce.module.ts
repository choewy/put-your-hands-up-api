import { HttpModule, HttpService } from '@nestjs/axios';
import { DynamicModule, Module, Provider } from '@nestjs/common';

import { NaverCommerceModuleAsyncOptions, NaverCommerceModuleOptions } from './implements';
import { NaverCommerceService } from './naver-commerce.service';

@Module({})
export class NaverCommerceModule {
  public static register(options: NaverCommerceModuleOptions): DynamicModule {
    const NaverCommerceServiceProvider: Provider = {
      inject: [HttpService],
      provide: NaverCommerceService,
      useFactory(httpService: HttpService) {
        return new NaverCommerceService(options.mode, httpService);
      },
    };

    return {
      global: options?.isGlobal,
      module: NaverCommerceModule,
      imports: [HttpModule],
      providers: [NaverCommerceServiceProvider],
      exports: [NaverCommerceServiceProvider],
    };
  }

  public static async registerAsync(asyncOptions: NaverCommerceModuleAsyncOptions): Promise<DynamicModule> {
    const NaverCommerceServiceProvider: Provider = {
      inject: [HttpService, ...asyncOptions.inject],
      provide: NaverCommerceService,
      async useFactory(httpService: HttpService, ...args) {
        const options = await asyncOptions.useFactory(...args);
        return new NaverCommerceService(options.mode, httpService);
      },
    };

    return {
      global: asyncOptions?.isGlobal,
      module: NaverCommerceModule,
      imports: [HttpModule],
      providers: [NaverCommerceServiceProvider],
      exports: [NaverCommerceServiceProvider],
    };
  }
}
