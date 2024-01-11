import { Role } from '@/user/roles';
import { Reflector } from '@nestjs/core';

export const Roles = Reflector.createDecorator<Role[]>();
