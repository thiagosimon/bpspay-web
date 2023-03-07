import axios, { AxiosResponse } from 'axios'
import { getObjectFromStore, removeStoreItem } from '../utils/Storage'
const TIMEOUT = 30000

export const catchError = (error: any) => {}

axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

export default {
    getDefaultHeader: async (callback?: (header: Record<string, string>) => Promise<Record<string, string>>) => {
        const token = getObjectFromStore('token')
        const correlationId = getObjectFromStore('correlationId')

        const header = {
            'Content-Type': 'application/json',
            Authorization: token || '',
            'x-correlation-id': ''
        }

        if (correlationId && correlationId !== String('undefined')) {
            header['x-correlation-id'] = correlationId
        }
        if (callback) {
            return callback(header)
        }

        return header
    },
    do: async (
        method: 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch' | 'link' | 'unlink',
        headers: Record<string, string>,
        params: any,
        endpoint: string,
        navigate: any,
        callbackSuccess?: (data: any, res: AxiosResponse) => Promise<any>,
        callbackError?: (err: any) => Promise<any>
    ) => {
        try {
            let res = null
            const instance = axios.create()
            instance.defaults.timeout = TIMEOUT

            res = await instance({
                method: method,
                headers: headers,
                data: params,
                url: endpoint
            })

            if (callbackSuccess) {
                return callbackSuccess(res.data, res)
            }

            return res
        } catch (err) {
            if (err && err.code === 'ECONNABORTED') {
                navigate.navigate('WithoutInternet')
            } else {
                if (err.response && err.response.status === 401) {
                    if (err.response.data.messageId === 'response.invalid.token') {
                        removeStoreItem('token')
                        removeStoreItem('correlationId')
                        navigate.navigate('/login')
                    } else {
                        if (callbackError) {
                            return callbackError(err)
                        }

                        throw err
                    }
                } else {
                    if (callbackError) {
                        return callbackError(err)
                    }

                    throw err
                }
            }
        }
    }
}
