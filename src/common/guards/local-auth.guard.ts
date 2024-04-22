/* eslint-disable @typescript-eslint/ban-types */
import { STRATEGY_LOCAL } from '@common/constants';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard(STRATEGY_LOCAL) {}
