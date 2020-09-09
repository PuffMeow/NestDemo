import { Injectable } from '@nestjs/common';
import { UserService } from 'src/logical/user/user.service';
import { JwtService } from '@nestjs/jwt'
import { encryptPassword } from 'src/utils/cryptogram';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }
  // JWT验证 - Step 2: 校验用户信息
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username)
    // console.log(user)
    if (user) {
      const hashedPassword = user.passwd
      const salt = user.passwd_salt
      const hashPassword = encryptPassword(password, salt)
      if (hashedPassword === hashPassword) {
        //密码正确
        return {
          code: 1,
          user,
          msg: '密码正确'
        }
      } else {
        //密码错误
        return {
          code: 2,
          user: null,
          msg: '密码错误'
        }
      }
    } else {
      return {
        code: 3,
        user: null,
        msg: '查无此人'
      }
    }
  }
  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: any) {
    const payload = { username: user.username, sub: user.userId, realName: user.realName, role: user.role }
    console.log('JWT验证 - Step 3: 处理 jwt 签证');
    try {
      const token = this.jwtService.sign(payload)
      return {
        code: 200,
        token,
        msg: '登录成功'
      }
    }
    catch (err) {
      return {
        code: 600,
        msg: '账号或密码错误'
      }
    }
  }
}
