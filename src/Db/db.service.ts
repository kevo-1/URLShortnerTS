import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as CryptoJS from 'crypto-js';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class DbServices {
    constructor(
        private readonly service: PrismaService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    async getAll() {
        try {
            const allUrls = await this.service.url.findMany();
            return allUrls;
        } catch (error) {
            console.error(error);
        }
    }

    async getOriginal(hash: string) {
        try {
            const cached = await this.cacheManager.get<string>(hash);
            if (cached) {
                console.log(`Cache hit for ${hash}`);
                return cached;
            }

            const record = await this.service.url.findUnique({
                where: { hash },
            });

            if (record?.original) {
                await this.cacheManager.set(hash, record.original, 300_000);
            }

            return record?.original;
        } catch (error) {
            console.error(error);
        }
    }

    hashUrl(original: string): string {
        try {
            const hashed = CryptoJS.MD5(original).toString();
            return hashed.slice(0, 10);
        } catch (error) {
            console.error(error);
        }
    }

    async saveToDb(original: string, hash: string) {
        try {
            const existing = await this.service.url.findFirst({
                where: { OR: [{ hash }, { original }] },
            });
            if (existing) {
                return existing;
            }

            const data = await this.service.url.create({
                data: { hash, original },
            });

            await this.cacheManager.set(hash, original, 300_000);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async removeFromDb(hash: string) {
        try {
            await this.service.url.delete({ where: { hash } });
            await this.cacheManager.del(hash);
        } catch (error) {
            if (error.code === 'P2025') {
                console.warn(`No record found for hash: ${hash}`);
            } else {
                console.error('Error deleting URL:', error);
                throw error;
            }
        }
    }

}
