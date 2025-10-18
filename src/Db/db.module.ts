import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-ioredis-yet';
import { PrismaService } from '../prisma.service';
import { DbServices } from './db.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => {
        try {
          const store = await redisStore({
            host: 'localhost',
            port: 6379,
            ttl: 60 * 5,
          });
          console.log('Redis store created successfully');
          return { store };
        } catch (error) {
          console.error('Redis connection failed:', error);
          throw error;
        }
      },
    }),
  ],
  providers: [PrismaService, DbServices],
  exports: [DbServices],
})
export class DbModule {}
