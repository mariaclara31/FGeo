import { Controller, Get, Res, Req } from '@nestjs/common';
import { ErrorResponseType } from '../common/types';
import { users, UserType } from '../data/users';

@Controller('user')
export class UserController {
	@Get()
	getUser(@Req() request): any {
		return request.body.authUser;
	}
}
