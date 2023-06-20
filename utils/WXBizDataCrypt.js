var crypto = require('crypto')

function WXBizDataCrypt(appId, sessionKey) {
  this.appId = appId
  this.sessionKey = sessionKey
}

WXBizDataCrypt.prototype.decryptData = function (encryptedData, iv) {
  // base64 decode
  //var sessionKey = new Buffer(this.sessionKey, 'base64')
  var sessionKey = String.fromCharCode.apply(null, new Uint8Array(uni.base64ToArrayBuffer(this.sessionKey)));
  //encryptedData = new Buffer(encryptedData, 'base64')
  encryptedData = String.fromCharCode.apply(null, new Uint8Array(uni.base64ToArrayBuffer(encryptedData)));
  iv = new Buffer(iv, 'base64')

  try {
     // 解密
    var decipher = crypto.getDAesString('aes-128-cbc', sessionKey, iv)
    // 设置自动 padding 为 true，删除填充补位
    decipher.setAutoPadding(true)
    var decoded = decipher.update(encryptedData, 'binary', 'utf8')
    decoded += decipher.final('utf8')
    
    decoded = JSON.parse(decoded)

  } catch (err) {
    throw new Error('Illegal Buffer')
  }

  if (decoded.watermark.appid !== this.appId) {
    throw new Error('Illegal Buffer')
  }

  return decoded
}

module.exports = WXBizDataCrypt
