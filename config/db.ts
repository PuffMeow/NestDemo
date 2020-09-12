// $ yarn add sequelize sequelize-typescript mysql2 -S
// 安装这些依赖包用来操作mysql数据库

const productConfig = {
  mysql: {
    port: 3306,       //端口号 
    host: 'localhost',       //地址
    user: 'root',       //用户名
    password: 'WangJiquan',    //密码
    database: 'nest_zero_to_one',    //数据库名
    connectionLimit: 10//连接限制
  },
  redis: {
    port: 6379,//端口号
    host: 'localhost',//线上域名
    db: '库名',
    password: '访问密码'
  }
}

const localConfig = {
  mysql: {
    port: 3306,       //端口号 
    host: 'localhost', //地址
    user: 'root',       //用户名
    // password: 'WangJiquan',    //密码
    password: '123456',    //密码
    database: 'nest_zero_to_one', //数据库名
    connectionLimit: 10//连接限制
  },
  redis: {
    // yarn add ioredis -S  安装ioredis
    port: 6379,//端口号
    host: 'localhost',//线上域名
    db: 0,
    password: 'WangJiquan'
  }
}

const config = process.env.NODE_ENV ? productConfig : localConfig


export default config