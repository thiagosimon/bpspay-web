import React from 'react'
import { Route, Routes } from 'react-router-dom'

//Layouts
import NonAuthLayout from '../layouts/NonAuthLayout'
import VerticalLayout from '../layouts/index'

//routes
import { AuthProtected } from './AuthProtected'
import { authProtectedRoutes, publicRoutes } from './allRoutes'

const Index = () => {
    return (
        <React.Fragment>
            <Routes>
                <Route>
                    {publicRoutes.map((route, idx) => (
                        <Route path={route.path} element={<NonAuthLayout>{route.component}</NonAuthLayout>} key={idx} />
                    ))}
                </Route>

                <Route>
                    {authProtectedRoutes.map((route, idx) => (
                        <Route
                            path={route.path}
                            element={
                                <AuthProtected>
                                    <VerticalLayout>{route.component}</VerticalLayout>
                                </AuthProtected>
                            }
                            key={idx}
                        />
                    ))}
                </Route>
            </Routes>
        </React.Fragment>
    )
}

export default Index
