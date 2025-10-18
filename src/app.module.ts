import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { DbModule } from './Db/db.module';

@Module({
  imports: [DbModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
