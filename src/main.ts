import { Logger, ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
    FastifyAdapter,
    NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app/app.module";

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "test") {
    Logger.debug(
        `Initiated Test Session on Test Database ${process.env.mongoTEST}`,
        "MONGODB",
    );
}

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
    );
    app.enableVersioning({
        type: VersioningType.URI,
    });
    const config = new DocumentBuilder()
        .addBearerAuth()
        .setTitle("E commerce example")
        .setDescription("For ecommerce description")
        .setVersion("4.0")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );
    await app.listen(5000);
    Logger.debug(`Server started at http://localhost:${port}`, "BOOTSTRAP");
}
bootstrap();
