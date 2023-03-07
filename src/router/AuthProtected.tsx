import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, NavigateFunction, Route, RouteProps } from 'react-router-dom'
import { useProfile } from '../components/Hooks/UserHooks'
import { setAuthorization } from '../helpers/api_helper'

import { logoutUser } from '../store/actions'

type AccessRouteProps = {
    component: React.ComponentType<any>
} & RouteProps

type NavigateTo = {
    pathname: string
    state: {
        from: string
    }
}

const AuthProtected = (
    props: RouteProps & { children?: React.ReactNode; location?: { state?: { from: string }; pathname: string } },
    navigate?: NavigateFunction
) => {
    const dispatch = useDispatch()
    const { userProfile, loading, token } = useProfile()
    useEffect(() => {
        if (userProfile && !loading && token) {
            setAuthorization(token)
        } else if (!userProfile && loading && !token) {
            dispatch(logoutUser())
        }
    }, [token, userProfile, loading, dispatch])

    if (!userProfile && loading && !token) {
        return <Navigate to={{ pathname: '/login', state: { from: props.location?.pathname || '/' } } as NavigateTo} />
    }

    return <>{props.children}</>
}

const AccessRoute = ({ component: Component, ...rest }: AccessRouteProps) => {
    return <Route {...rest} element={<Component />} />
}

export { AuthProtected, AccessRoute }
