import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Definimos o boot da api e a porta de execução como nesse caso na 3001
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // habilitamos o cors para evitar problemas com o React e os navegadores
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
