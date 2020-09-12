import { Module } from '@nestjs/common';
import { CommodityService } from './commodity.service';
import { CommodityController } from './commodity.controller';

@Module({
  providers: [CommodityService],
  controllers: [CommodityController]
})
export class CommodityModule {}
