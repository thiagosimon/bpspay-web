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
