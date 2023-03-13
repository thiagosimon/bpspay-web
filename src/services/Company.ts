import Endpoints from '../common/Endpoints'
import Request from '../common/Request'

export const registerCompanyService = async (body: any, navigation: any) => {
    try {
        let header = await Request.getDefaultHeader()
        let response = await Request.do('post', header, body, Endpoints.companies.company, navigation)

        return response
    } catch (e) {
        throw e
    }
}

export const upadateCompanyService = async (body: any, param: any, navigation: any) => {
    try {
        let header = await Request.getDefaultHeader()
        let response = await Request.do('put', header, body, `${Endpoints.companies.company}/${param}`, navigation)

        return response
    } catch (e) {
        throw e
    }
}

export const acceptServiceTerms = async (navigation: any) => {
    try {
        let header = await Request.getDefaultHeader()
        let response = await Request.do('put', header, {}, Endpoints.companies.acceptServiceTerm, navigation)

        return response
    } catch (e) {
        throw e
    }
}
