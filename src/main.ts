import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

config(); // подключаем .env

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: 'http://localhost:3003', // адрес фронта
        credentials: true,
    });

    await app.listen(process.env.PORT || 3000);
    console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
}
bootstrap();
