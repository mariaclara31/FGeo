import { Injectable, NestMiddleware } from '@nestjs/common';
import { users } from './data/users';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	use(req: any, res: any, next: () => void) {
		const token = req.headers.authorization
			? req.headers.authorization.replace('Bearer ', '')
			: null;
		if (token) {
			const user = users.find((user) => user.username === token);
			if (user) {
				req.body.authUser = user;
				next();
			} else {
				return res.status(400).send({ error: 'invalid token' });
			}
		} else {
			return res.status(400).send({ error: 'no token provided' });
		}
	}
}
