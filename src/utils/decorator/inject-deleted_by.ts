import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const InjectDeletedBy = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    req.body.delete_by = { id: req.user.id };

    return req.body;
  },
);
