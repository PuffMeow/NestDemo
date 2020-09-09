import * as crypto from 'crypto'

/**
 * Make salt 制作一个随机盐（salt）
 */

export function makeSalt(): string {
  return crypto.randomBytes(3).toString('base64');
}

/**
 * Encrypt password 根据盐来加密密码
 * @param password 密码
 * @param salt 密码盐
 */

export function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) {
    return ''
  }
  const tempSalt = Buffer.from(salt, 'base64')
  return (
    // 10000 代表迭代次数 16代表长度
    crypto.pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1').toString('base64')
  )
}