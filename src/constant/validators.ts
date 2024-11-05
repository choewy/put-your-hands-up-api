import { registerDecorator, ValidationOptions } from 'class-validator';
import { DateTime } from 'luxon';

export const isDateTime = <T = any>(val: T) => val === null || val === undefined || val instanceof DateTime || (val as DateTime).isValid;
export const IsDateTime = (validationOptions?: ValidationOptions) => {
  return (o: object, propertyName: string) => {
    registerDecorator({
      name: 'isDateTime',
      target: o.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any): Promise<boolean> | boolean {
          return isDateTime(value);
        },
      },
    });
  };
};
