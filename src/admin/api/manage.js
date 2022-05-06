
import { createApi } from './config/ajax'
import { mockURL, /* baseURL, */ path } from './config/config'

const prefix = 'api/v1/draw'
const option = { baseURL: mockURL }



//获取验证码
export const verificationCode = createApi(`${path}/${prefix}/verification/code`, option)
//用户注册
export const userRegister = createApi(`${path}/${prefix}/user/register`, option)
//用户登陆
export const userLogin = createApi(`${path}/${prefix}/user/login`, option)
//用户绘画作品
export const userPaintings = createApi(`${path}/${prefix}/paintings`, option)
// 模块管理
export const fetchModuleList = createApi(`${path}/${prefix}/resource/list`, option) // 获取模块列表



