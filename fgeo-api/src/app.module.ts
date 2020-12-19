import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { AuthMiddleware } from './auth.middleware';
import { FindController } from './find/find.controller';

@Module({
	imports: [],
	controllers: [AppController, AuthController, UserController, FindController],
	providers: [AppService],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes('user');
	}
}
