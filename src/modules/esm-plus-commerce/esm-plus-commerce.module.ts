import { DynamicModule, Module, Provider } from '@nestjs/common';

import { EsmPlusCommerceService } from './esm-plus-commerce.service';
import { EsmPlusCommerceModuleAsyncOptions, EsmPlusCommerceModuleOptions } from './implements';

@Module({})
export class EsmPlusCommerceModule {
  public static register(options: EsmPlusCommerceModuleOptions): DynamicModule {
    const EsmPlusCommerceServiceProvider: Provider = {
      provide: EsmPlusCommerceService,
      useFactory() {
        return new EsmPlusCommerceService(options.useConfirmOrders, options.useVisibleBrowser);
      },
    };

    return {
      global: options.isGlobal,
      module: EsmPlusCommerceModule,
      providers: [EsmPlusCommerceServiceProvider],
      exports: [EsmPlusCommerceServiceProvider],
    };
  }

  public static async registerAsync(asyncOptions: EsmPlusCommerceModuleAsyncOptions): Promise<DynamicModule> {
    const EsmPlusCommerceServiceProvider: Provider = {
      inject: [...asyncOptions.inject],
      provide: EsmPlusCommerceService,
      async useFactory(...args) {
        const options = await asyncOptions.useFactory(...args);
        return new EsmPlusCommerceService(options.useConfirmOrders, options.useVisibleBrowser);
      },
    };

    return {
      global: asyncOptions.isGlobal,
      module: EsmPlusCommerceModule,
      providers: [EsmPlusCommerceServiceProvider],
      exports: [EsmPlusCommerceServiceProvider],
    };
  }
}
