import Endpoints from '../common/Endpoints'
import Request from '../common/Request'

export const emailAlreadyExistService = async (email: string, navigation: any) => {
    try {
        let header = await Request.getDefaultHeader()
        let response = await Request.do('get', header, {}, `${Endpoints.systemUsers.checkEmailExist}${email}`, navigation)

        return response
    } catch (e) {
        throw e
    }
}

export const documentAlreadyExistService = async (document: string, navigation: any) => {
    try {
        let header = await Request.getDefaultHeader()
        let response = await Request.do('get', header, {}, `${Endpoints.companies.checkDocumentExist}${document}`, navigation)

        return response
    } catch (e) {
        throw e
    }
}
