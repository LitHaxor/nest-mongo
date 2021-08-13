import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
    FastifyAdapter,
    NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app/app.module";

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "test") {
    process.env.mongoURI = process.env.mongoTEST;
    Logger.debug(
        `Initiated Test Session on Test Database ${process.env.mongoURI}`,
        "MONGODB",
    );
}

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
    );
    await app.listen(5000);
    Logger.debug(`Server started at http://localhost:${port}`, "BOOTSTRAP");
}
bootstrap();
