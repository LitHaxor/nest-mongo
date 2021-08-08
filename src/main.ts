import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
    FastifyAdapter,
    NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app/app.module";

const port = process.env.PORT || 5000;

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
    );
    Logger.log(`Server started at http://localhost:${port}`, "BOOTSTRAP");
    await app.listen(5000);
}
bootstrap();
