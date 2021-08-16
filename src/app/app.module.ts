import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "../user/user.module";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { HttpExceptionFilter } from "../utils/filters/http-exeception.filter";
import { LogginInterceptor } from "../utils/interceptors/Loggin.interceptor";
import { ProductModule } from "../product/product.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRoot(
            process.env.NODE_ENV === "test"
                ? process.env.mongoTEST
                : process.env.mongoURI,
            {
                useFindAndModify: false,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        ),
        UserModule,
        ProductModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LogginInterceptor,
        },
    ],
})
export class AppModule {}
