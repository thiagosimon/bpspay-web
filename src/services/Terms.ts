import Endpoints from '../common/Endpoints'
import Request from '../common/Request'

export const userTermServices = async (navigation: any) => {
    try {
        let header = await Request.getDefaultHeader()
        let response = await Request.do('get', header, null, Endpoints.helpers.terms, navigation)

        return response
    } catch (e) {
        throw e
    }
}
