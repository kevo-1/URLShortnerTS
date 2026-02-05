import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-ioredis-yet';
import { PrismaService } from '../prisma.service';
import { DbServices } from './db.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => {
        // Use in-memory cache if Redis is not configured
        if (!process.env.REDIS_HOST) {
          console.log('Redis not configured, using in-memory cache');
          return { ttl: 60 * 5 * 1000 };
        }

        try {
          const store = await redisStore({
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT || '6379'),
            ttl: 60 * 5,
          });
          console.log('Redis store created successfully');
          return { store, ttl: 60 * 5 };
        } catch (error) {
          console.error(
            'Redis connection failed, falling back to in-memory cache:',
            error,
          );
          return { ttl: 60 * 5 * 1000 };
        }
      },
    }),
  ],
  providers: [PrismaService, DbServices],
  exports: [DbServices],
})
export class DbModule {}
