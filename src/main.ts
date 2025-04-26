import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
  try {
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      })
    );

    const config = new DocumentBuilder()
      .setTitle("Daftarim")
      .setDescription(
        "Daftarim - bu Notion ilovasining muqolili bo'lib, foydalanuvchilarga ko'plab qulayliklar taqdim qiladi."
      )
      .setVersion("1.0")
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("docs", app, document);

    await app.listen(PORT);
    console.log(`Server started at: http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
}
start();
