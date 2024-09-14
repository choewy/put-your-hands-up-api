import { HttpModule, HttpService } from '@nestjs/axios';
import { DynamicModule, Module, Provider } from '@nestjs/common';

import { NaverModuleAsyncOptions, NaverModuleOptions } from './implements';
import { NaverService } from './naver.service';

@Module({})
export class NaverModule {
  public static register(options: NaverModuleOptions): DynamicModule {
    const NaverServiceProvider: Provider = {
      inject: [HttpService],
      provide: NaverService,
      useFactory(httpService: HttpService) {
        return new NaverService(options.baseUrl, httpService);
      },
    };

    return {
      global: options?.isGlobal,
      module: NaverModule,
      imports: [HttpModule],
      providers: [NaverServiceProvider],
      exports: [NaverServiceProvider],
    };
  }

  public static async registerAsync(asyncOptions: NaverModuleAsyncOptions): Promise<DynamicModule> {
    const NaverServiceProvider: Provider = {
      inject: [HttpService, ...asyncOptions.inject],
      provide: NaverService,
      async useFactory(httpService: HttpService, ...args) {
        const options = await asyncOptions.useFactory(...args);
        return new NaverService(options.baseUrl, httpService);
      },
    };

    return {
      global: asyncOptions?.isGlobal,
      module: NaverModule,
      imports: [HttpModule],
      providers: [NaverServiceProvider],
      exports: [NaverServiceProvider],
    };
  }
}
