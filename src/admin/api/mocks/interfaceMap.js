const path = '/mock'

// #region
const user = require('./user') // 基础的接口
// #endregion

module.exports = {
  // #region 收起所有

  // #region 公用
  [`${path}/api/v1/draw/verification/code`]: user.vcode, // 登录
}
