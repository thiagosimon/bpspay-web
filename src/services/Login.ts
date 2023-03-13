import Endpoints from '../common/Endpoints'
import Request from '../common/Request'

export const userLoginService = async (params: any, navigation: any) => {
    const body = {
        email: params.email,
        password: params.password
    }

    try {
        let header = await Request.getDefaultHeader()
        let response = await Request.do('post', header, body, Endpoints.systemUsers.login, navigation)

        return response
    } catch (e) {
        throw e
    }
}

export async function sendEmailCode(emailPass: String, navigation: any) {
    const body = {
        email: emailPass.toLowerCase()
    }
    try {
        let header = await Request.getDefaultHeader()
        let response = await Request.do('post', header, body, Endpoints.systemUsers.gencode, navigation)

        return response
    } catch (e) {
        throw e
    }
}

export async function confirmEmailCode(emailPass: String, navigation: any) {
    const body = {
        email: emailPass.toLowerCase()
    }
    try {
        let header = await Request.getDefaultHeader()
        let response = await Request.do('post', header, body, Endpoints.systemUsers.resetPassNotLog, navigation)

        return response
    } catch (e) {
        throw e
    }
}

export async function changePassword(body: any, navigation: any) {
    try {
        let header = await Request.getDefaultHeader()
        let response = await Request.do('post', header, body, Endpoints.systemUsers.resetPass, navigation)

        return response
    } catch (e) {
        throw e
    }
}

export const refreshTokenService = async (navigation: any) => {
    try {
        let header = await Request.getDefaultHeader()
        let response = await Request.do('get', header, null, Endpoints.systemUsers.refreshToken, navigation)

        return response
    } catch (e) {
        throw e
    }
}
