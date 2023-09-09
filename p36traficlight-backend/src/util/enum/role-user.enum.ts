import { SetMetadata } from '@nestjs/common';

// eslint-disable-next-line no-shadow
export enum RoleUserEnum {
  root = 'root',
  admin = 'admin',
  member = 'member',
  guest = 'guest',

  manager = 'manager',
  customer = 'customer',

  admin1 = 'Admin1',
  admin1x = 'Admin1.X',
  admin2 = 'Admin2',
  user = 'User',
}

export const RoleUser = (...roleUser: RoleUserEnum[]) => SetMetadata('roleUser', roleUser);
