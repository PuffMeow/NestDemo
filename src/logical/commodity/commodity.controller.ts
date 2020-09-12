import { Controller, UseGuards, Post, Body, Request } from '@nestjs/common';
import { CommodityService } from './commodity.service';
import { AuthGuard } from '@nestjs/passport';
import { roleConstants } from '../auth/constants'
import { RbacGuard } from 'src/guards/rbac.guard';

// 注意：RbacGuard 要在 AuthGuard 的上面，不然获取不到用户信息。

@Controller('commodity')
export class CommodityController {
  constructor(private readonly commodityService: CommodityService) { }

  //查询商品列表
  @UseGuards(new RbacGuard(roleConstants.NORMAL))
  @UseGuards(AuthGuard('jwt'))
  @Post('list')
  async queryColumnList(@Body() body: any) {
    return await this.commodityService.queryCommodityList(body)
  }


  //新建商品
  @UseGuards(new RbacGuard(roleConstants.DEVELERPOR))
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createCommodity(@Body() body: any, @Request() req: any) {
    // console.log('创建商品', req.user)
    return await this.commodityService.createCommodity(body, req.user.username)
  }

  //修改商品
  @UseGuards(new RbacGuard(roleConstants.DEVELERPOR))
  @UseGuards(AuthGuard('jwt'))
  @Post('update')
  async updateCommodity(@Body() body: any, @Request() req: any) {
    return await this.commodityService.updateCommodity(body, req.user.username)
  }

  //删除商品
  @UseGuards(new RbacGuard(roleConstants.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  @Post('delete')
  async deleteCommodity(@Body() body: any) {
    return await this.commodityService.deleteCommodity(body)
  }
}
