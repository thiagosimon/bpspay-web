import React, { useEffect, useState } from 'react'
import { Navigate, NavigateFunction, Route, RouteProps } from 'react-router-dom'
import { useProfile } from '../hooks/useProfile'
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
    props: RouteProps & {
        children?: React.ReactNode
        location?: { state?: { from: string }; pathname: string }
    },
    navigate?: NavigateFunction
) => {
    const { userProfile, loading, token } = useProfile()
    const [shouldNavigateToLogin, setShouldNavigateToLogin] = useState(false)

    useEffect(() => {
        if (userProfile && !loading && token) {
            localStorage.setItem('token', token)
        } else if (!userProfile && loading && !token) {
            localStorage.removeItem('token')
            setShouldNavigateToLogin(true)
        }
    }, [token, userProfile, loading])

    if (shouldNavigateToLogin) {
        return <Navigate to={{ pathname: '/login', state: { from: props.location?.pathname || '/' } } as NavigateTo} />
    }

    if (!userProfile && loading && !token) {
        return <Navigate to={{ pathname: '/login', state: { from: props.location?.pathname || '/' } } as NavigateTo} />
    }

    return <>{props.children}</>
}

const AccessRoute = ({ component: Component, ...rest }: AccessRouteProps) => {
    return <Route {...rest} element={<Component />} />
}

export { AccessRoute, AuthProtected }
