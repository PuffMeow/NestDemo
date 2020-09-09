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
  }
}

const config = process.env.NODE_ENV ? productConfig : localConfig


export default config