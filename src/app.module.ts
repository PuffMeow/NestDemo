import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './logical/user/user.module';
import { AuthModule } from './logical/auth/auth.module';
import { UserController } from './logical/user/user.controller';
import { CommodityModule } from './logical/commodity/commodity.module';

@Module({
  imports: [UserModule, AuthModule, CommodityModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule { }
