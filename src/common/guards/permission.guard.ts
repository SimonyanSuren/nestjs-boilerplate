//import { PermissionAction } from '@common/@types/enums';
//import { Codes, SET_PERMISSIONS_KEY } from '@common/constants';
//import { PermissionsEntity } from '@modules/permissions/entities/permissions.entity';
//import {
//  type ExecutionContext,
//  ForbiddenException,
//  Injectable,
//  UnauthorizedException,
//} from '@nestjs/common';
//import { Reflector } from '@nestjs/core';
//import { EntityManager } from 'typeorm';

///**
// * PermissionGuard implementation with persisted permissions.
// * Determines if the user has permission to access the requested resource.
// */
//@Injectable()
//export class PermissionGuard {
//  constructor(
//    private readonly em: EntityManager,
//    private readonly reflector: Reflector,
//  ) {}

//  async canActivate(context: ExecutionContext): Promise<boolean> {
//    // Extract necessary information from the request context
//    const { method, user, params } = context.switchToHttp().getRequest<ApiRequest>();
//    const resourceId = params.id;

//    // Check if user is authenticated
//    if (!user) throw new UnauthorizedException(Codes.UNAUTHORIZED_ERROR);

//    // Get the resource and maybe condition key metadata with the reflector
//    const [resource, conditionKey] =
//      this.reflector.getAllAndOverride<string[] | undefined>(SET_PERMISSIONS_KEY, [
//        context.getHandler(),
//        context.getClass(),
//      ]) || [];

//    // If no resource is specified, allow access
//    if (!resource) return true;

//    // Find the permission for the user's role and the specified resource
//    const permission = await this.em.findOne(PermissionsEntity, {
//      where: {
//        roleId: user.roleId,
//        menu: { resource },
//      },
//    });

//    // If permission is not found, throw an error
//    if (!permission) throw new Error('Permission not found.');

//    let isAllowed = false;

//    // Check the permission based on the requested method and permission's methods values
//    switch (method as PermissionAction) {
//      case PermissionAction.POST:
//        isAllowed = Boolean(permission.post);
//        break;
//      case PermissionAction.PATCH:
//        isAllowed = Boolean(permission.patch);
//        break;
//      case PermissionAction.GET:
//        isAllowed = Boolean(permission.get);
//        break;
//      case PermissionAction.DELETE:
//        isAllowed = Boolean(permission.delete);
//        break;

//      default:
//        isAllowed = false;
//        break;
//    }

//    /**
//     * If the user have permission to post resource,
//     * no need to check if that specific resource belongs to the user
//     * because in that case the user can manage them all without any restrictions.
//     * Otherwise, check if the resource belongs to the user with user id and resource id picked from params.
//     */
//    if (!permission.post && isAllowed && conditionKey && resourceId) {
//      const existingResource: unknown = await this.em.findOne(resource, {
//        where: { id: resourceId },
//        loadEagerRelations: false,
//      });

//      if (existingResource) {
//        // Check if the condition key matches the user's id
//        isAllowed = (existingResource as Record<string, unknown>)[conditionKey] === user.id;
//      }
//    }

//    // If the user is allowed, return true
//    if (isAllowed) return true;

//    // Otherwise, throw a forbidden error
//    throw new ForbiddenException(Codes.FORBIDDEN_ERROR);
//  }
//}
