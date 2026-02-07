import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class UrlValidationPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (!value || typeof value !== 'string') {
      throw new BadRequestException('URL is required');
    }

    let url = value.trim();

    if (!url) {
      throw new BadRequestException('URL cannot be empty');
    }

    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }
    try {
      const parsed = new URL(url);

      if (!parsed.hostname.includes('.')) {
        throw new BadRequestException(
          'Invalid URL: hostname must include a domain',
        );
      }

      const hostname = parsed.hostname.toLowerCase();
      if (
        hostname === 'localhost' ||
        hostname.startsWith('127.') ||
        hostname.startsWith('192.168.') ||
        hostname.startsWith('10.') ||
        hostname.startsWith('172.')
      ) {
        throw new BadRequestException(
          'Invalid URL: private addresses not allowed',
        );
      }

      return url;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Invalid URL format');
    }
  }
}
