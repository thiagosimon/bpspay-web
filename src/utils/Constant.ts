export const DOMAIN = 'https://api-gateway-bpspay.herokuapp.com'
export const SHIELDGO_DASHBOARD_URL = 'https://admin.bpspay.com.br/'

export const STORAGE_KEYS = {
    USER: 'user',
    TOKEN: 'token',
    CORRELATION_ID: 'correlationId',
    IN_PROGRESS_PATROL: 'inProgressPatrol'
}

export const TERMS = {
    TERMS_OF_USE: 'TERMS_OF_USE',
    SERVICE_AGREEMENT: 'SERVICE_AGREEMENT'
}

export const USER_TYPE = {
    ADMIN: 'ADMIN',
    ADMIN_MASTER: 'ADMIN_MASTER',
    SUPER_ADMIN_MASTER: 'SUPER_ADMIN_MASTER'
}

export const COMPANY_TYPE = {
    CLIENT: 'CLIENT'
}

export const COMPANY_STATUS = {
    ACTIVE: 'ACTIVE',
    ARCHEIVED: 'ARCHEIVED',
    PENDING_ACCEPT_TERMS: 'PENDING_ACCEPT_TERMS'
}

export const USER_STATUS = {
    ACTIVE: 'ACTIVE',
    ARCHEIVED: 'ARCHEIVED',
    PENDING_CONFIRMATION: 'PENDING_CONFIRMATION',
    PENDING_ACCEPT_TERMS: 'PENDING_ACCEPT_TERMS'
}

export const COMPANY_SERVICE_STATUS = {
    ALREADY_EXISTS: 'response.msg.document.already.exists',
    REGISTER_ERROR: 'response.msg.register.error',
    REGISTER_SUCCESS: 'response.msg.register.success'
}

export const USER_SERVICE_STATUS = {
    INVALID_REGISTER_TOKEN: 'response.invalid.token',
    INVALID_PASSWOD: 'response.user.password.incorrect'
}
