import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { UserService } from './user.service'
import { AuthService } from '../auth/auth.service';
import { RegisterInfoDTO, LoginDTO } from './user.dto';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) { }

  @Post('find-one')
  async findOne(@Body() body: any) {
    return this.userService.findOne(body.username);
  }

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() body: RegisterInfoDTO) {
    return await this.userService.register(body)
  }

  @Post('login')
  async login(@Body() loginParams: LoginDTO) {
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(loginParams.username, loginParams.password)
    // console.log('authResult:', authResult)
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user)
      case 2:
        return {
          code: 600,
          msg: '账号或密码不正确'
        }
      case 3:
        return {
          code: 600,
          msg: `查无此人`,
        };
    }
  }
}
