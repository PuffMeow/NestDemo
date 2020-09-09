import { Injectable, NestMiddleware } from '@nestjs/common';
import { Logger } from '../utils/log4js'
import { Request, Response } from 'express'

// 制作中间件
// 我们希望每次用户请求接口的时候，自动记录请求的路由、IP、参数等信息，如果每个路由都写，那就太傻了，所以需要借助中间件来实现。
// Nest 中间件实际上等价于 express 中间件。
// 中间件函数可以执行以下任务:

// 执行任何代码；
// 对请求和响应对象进行更改；
// 结束请求-响应周期；
// 调用堆栈中的下一个中间件函数；
// 如果当前的中间件函数没有【结束请求】或【响应周期】, 它必须调用 next()  将控制传递给下一个中间件函数。否则，请求将被挂起；



// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: () => void) {
//     const code = res.statusCode // 响应状态码
//     next();
//     // 组装日志信息
//     const logFormat = `Method: ${req.method} \n Request original url: ${req.originalUrl} \n IP: ${req.ip} \n Status code: ${code} \n`;
//     // 根据状态码，进行日志类型区分
//     if (code >= 500) {
//       Logger.error(logFormat);
//     } else if (code >= 400) {
//       Logger.warn(logFormat);
//     } else {
//       Logger.access(logFormat);
//       Logger.log(logFormat);
//     }
//   }
// }


// 函数式中间件
export function logger(req: Request, res: Response, next: () => any) {
  const code = res.statusCode; // 响应状态码
  next();
  // 组装日志信息
  const logFormat = ` >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    Request original url: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    Status code: ${code}
    Parmas: ${JSON.stringify(req.params)}
    Query: ${JSON.stringify(req.query)}
    Body: ${JSON.stringify(req.body)} \n  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  `;
  // 根据状态码，进行日志类型区分
  if (code >= 500) {
    Logger.error(logFormat);
  } else if (code >= 400) {
    Logger.warn(logFormat);
  } else {
    Logger.access(logFormat);
    Logger.log(logFormat);
  }
}