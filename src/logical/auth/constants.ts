//存储常量的文件
// yarn add passport passport-jwt passport-local @nestjs/passport @nestjs/jwt -S
//安装策略依赖包
export const jwtConstants = {
  secret: 'woxihuannia' // 秘钥
};


export const roleConstants = {
  SUPER_ADMIN: 0,//超级管理员
  ADMIN: 1,//管理员
  DEVELERPOR: 2,//开发者（测试、运营具有同一权限，若提升为 RBAC 1 以上，则可酌情分开）
  NORMAL: 3//普通用户
}