import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'express-handlebars';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  const hbsInstance = hbs.create({
    extname: 'hbs',
    defaultLayout: 'layout_main',
    layoutsDir: join(__dirname, '..', 'views', 'layouts'),
    partialsDir: join(__dirname, '..', 'views', 'partials'),
    helpers: {
      // Example helper: toUpperCase
      toUpperCase: (str: string) => str.toUpperCase(),
      // Example helper: conditional check
      isEqual: (a: any, b: any) => a === b,
    },
  });
  app.engine('hbs', hbsInstance.engine);
  app.setViewEngine('hbs');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
