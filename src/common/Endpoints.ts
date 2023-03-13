// const domain = 'https://api-gateway-shield.herokuapp.com',
const domain = 'http://localhost:3000'
const viaCepDomain = 'https://viacep.com.br/ws/'

export default {
    domain: domain,
    addresses: {
        address: `${domain}/api/address/v1/`,
        geolocation: `${domain}/api/address/geo/v1/`
    },
    systemUsers: {
        changeLanguage: `${domain}/api/users/system/change/language/v1/`,
        delete: `${domain}/api/users/delete/v1/`,
        systemUser: `${domain}/api/users/v1/`,
        formData: `${domain}/api/users/formdata/v1/`,
        login: `${domain}/api/users/system/login/v1/`,
        gencode: `${domain}/api/users/system/password/gencode/v1/`,
        checkCode: `${domain}/api/users/system/password/checkcode/v1/`,
        resetPass: `${domain}/api/users/system/password/change/online/v1/`,
        resetPassNotLog: `${domain}/api/users/system/password/change/v1/`,
        getMe: `${domain}/api/users/me/v1/`,
        ListUserByType: `${domain}/api/users/bytype/v1/`,
        companyUser: {
            search: `${domain}/api/users/system/search/companyuser/v1/`
        },
        checkEmailExist: `${domain}/api/users/check/email/v1/`,
        count: `${domain}/api/generic/count/byfilter/v1/`,
        resendConfirmRegister: `${domain}/api/users/system/active/resend/v1/`,
        activeRegister: `${domain}/api/users/system/active/v1/`,
        refreshToken: `${domain}/api/users/system/refreshtoken/v1/`
    },
    companies: {
        company: `${domain}/api/company/v1/`,
        formData: `${domain}/api/company/formdata/v1/`,
        filter: `${domain}/api/company/filter/v1/`,
        delete: `${domain}/api/company/delete/v1/`,
        checkDocumentExist: `${domain}/api/company/check/document/v1/`,
        acceptServiceTerm: `${domain}/api/company/terms/service/accept/v1/`
    },
    logs: {
        filter: `${domain}/api/logs/filter/v1/`
    },
    cep: {
        find: `${viaCepDomain}`
    },
    helpers: {
        terms: `${domain}/api/helpers/data/terms/v1/`
    },
    location: {
        geolocation: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='
    }
}
