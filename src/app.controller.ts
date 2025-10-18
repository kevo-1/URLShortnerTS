import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { DbServices } from './Db/db.service';

@Controller('URLShort')
export class AppController {
  constructor(private readonly dbService: DbServices) {}

  @Get()
  getAll() {
    return this.dbService.getAll();
  }

  @Get('/:hash')
  async redirectToOriginal(@Param('hash') hash: string, @Res() res: Response) {
    try {
      const original = await this.dbService.getOriginal(hash);
      if (original) {
        return res.redirect(original);
      } else {
        return res
          .status(HttpStatus.NOT_FOUND)
          .send('Invalid or expired hash.');
      }
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Something went wrong.');
    }
  }

  @Post()
  async convertToHash(
    @Body('original') original: string,
    @Res() res: Response,
  ) {
    try {
      const hash: string = this.dbService.hashUrl(original).slice(0, 10);
      await this.dbService.saveToDb(original, hash);
      res.status(HttpStatus.OK).json({
        data: `http://localhost:3000/URLShort/${hash}`,
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        err: error,
      });
    }
  }

  @Delete('/:hash')
  async removeHash(@Param('hash') hash: string, @Res() res: Response) {
    try {
      await this.dbService.removeFromDb(hash);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Deleted successfully.' });
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({
        err: error,
      });
    }
  }
}
