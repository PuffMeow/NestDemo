import { IsNotEmpty, IsString, IsNumber } from 'class-validator'

export class RegisterInfoDTO {
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly accountName: string | number

  @IsNotEmpty({ message: '姓名不能为空' })
  @IsString({ message: '真实姓名必须为String类型' })
  readonly realName: string

  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string

  @IsNotEmpty({ message: '重复密码不能为空' })
  readonly repassword: string

  @IsNotEmpty({ message: '手机号不能为空' })
  readonly mobile: number | string
}