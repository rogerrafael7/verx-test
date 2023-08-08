import { FactoryProvider } from '@nestjs/common';

type Factory<Domain> = FactoryProvider & {
  useFactory: (...args: unknown[]) => Domain;
};
export const createFactory = <Domain>(
  options: Factory<Domain>,
): Factory<Domain> => {
  return {
    provide: options.provide,
    useFactory: options.useFactory,
    inject: options.inject,
  };
};
