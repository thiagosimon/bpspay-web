import Endpoints from '../common/Endpoints'
import Request from '../common/Request'

export const registerUserService = async (body: any, navigation: any) => {
    try {
        let header = await Request.getDefaultHeader()
        let response = await Request.do('post', header, body, Endpoints.systemUsers.systemUser, navigation)

        return response
    } catch (e) {
        throw e
    }
}

export const registerUserFormDataService = async (body: any, file: any, navigation: any) => {
    try {
        let formData = new FormData()

        formData.append('file', file)
        formData.append('jsonData', JSON.stringify(body))

        let header = await Request.getDefaultHeader()
        let response = await Request.do('post', header, formData, Endpoints.systemUsers.formData, navigation)

        return response
    } catch (e) {
        throw e
    }
}
