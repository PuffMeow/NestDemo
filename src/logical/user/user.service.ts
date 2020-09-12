import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize'
import sequelize from '../../database/sequelize'
import { makeSalt, encryptPassword } from 'src/utils/cryptogram';
import { RegisterInfoDTO } from './user.dto';

@Injectable()
export class UserService {
  /**
 * 查询是否有该用户
 * @param username 用户名
 */
  async findOne(username: string): Promise<any | undefined> {
    const sql =
      `SELECT 
      user_id userId,account_name username, passwd, passwd_salt, real_name realName, role
    FROM
      admin_user
    WHERE
      account_name ='${username}'
  `;
    try {
      const user = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,// 查询方式
        replacements: ['active'],//防止sql注入
        raw: true, // 是否使用数组组装的方式展示结果
        // logging: true, // 是否将 SQL 语句打印到控制台，默认为 true
      })
      // console.log('service', user)
      // 若查不到用户，则 user === undefined
      return user[0];
    }
    catch (err) {
      console.log(err)
      return void 0
    }
  }


  async register(requestBody: RegisterInfoDTO): Promise<any> {
    const { accountName, realName, password, repassword, mobile } = requestBody;
    if (password !== repassword) {
      return {
        code: 400,
        msg: '两次输入密码不一致'
      }
    }

    const user = await this.findOne(accountName)
    if (user) {
      return {
        code: 400,
        msg: '用户已存在'
      }
    }
    const salt = makeSalt()
    const hashPwd = encryptPassword(password, salt)
    const registerSql = `
    INSERT INTO admin_user
      (account_name,real_name,passwd,passwd_salt,mobile,user_status,role,create_by)
    VALUES
      ('${accountName}','${realName}','${hashPwd}','${salt}','${mobile}',1,3,0)
    `

    try {
      await sequelize.query(registerSql, {
        logging: false,
        replacements: ['active']
      })
      return {
        code: 200,
        msg: '创建用户成功'
      }
    } catch (err) {
      return {
        code: 503,
        msg: '服务器错误' + err
      }
    }
  }

}