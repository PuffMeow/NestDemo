import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

// 每个管道必须提供 transform() 方法。 这个方法有两个参数：
// value
// metadata
// value 是当前处理的参数，而 metadata 是其元数据。

//使用管道安装两个包
// yarn add class-validator class-transformer -S

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    console.log(`value:`, value, 'metatype: ', metatype);
    if (!metatype || !this.toValidate(metatype)) {
      // 如果没有传入验证规则，则不验证，直接返回数据
      return value;
    }
    const object = plainToClass(metatype, value)
    const errors = await validate(object)
    if (errors.length > 0) {
      const msg = Object.values(errors[0].constraints)[0] //只取第一个返回信息返回
      throw new BadRequestException(`验证失败: ${msg}`);
    }
    return value
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
