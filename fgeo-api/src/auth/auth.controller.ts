import { Controller, Body, Post, Res } from '@nestjs/common';
import { AuthBodyType, AuthResponseType } from './types';
import { ErrorResponseType } from '../common/types';
import { users } from "../data/users"

@Controller('auth')
export class AuthController {
	@Post('login')
	login(@Res() response, @Body() auth: AuthBodyType): AuthResponseType | ErrorResponseType {

		const user = users.find((user) => user.username === auth.username);
		if (user && user.password === auth.password) {
			return response.send({ token: user.username });
		} else {
			return response.status(400).send({ error: 'invalid login'});
		}
	}
}
