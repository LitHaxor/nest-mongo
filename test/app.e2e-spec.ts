import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app/app.module";
import {
    FastifyAdapter,
    NestFastifyApplication,
} from "@nestjs/platform-fastify";

describe("AppController (e2e)", () => {
    let app: NestFastifyApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication<NestFastifyApplication>(
            new FastifyAdapter(),
        );
        await app.init();
    });

    it("/ (GET)", () =>
        app
            .inject({
                method: "GET",
                url: "/",
            })
            .then((result) => {
                expect(result.statusCode).toEqual(200);
                expect(result.payload).toEqual("Hello World!");
            }));
});
