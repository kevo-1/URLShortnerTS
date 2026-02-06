import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { DbModule } from './Db/db.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    DbModule,
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
