import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { logoutUser } from '../../store/actions'

//redux
import { useDispatch, useSelector } from 'react-redux'

import withRouter from '../../components/Common/withRouter'

const Logout = props => {
    const dispatch = useDispatch()

    const { isUserLogout } = useSelector(state => ({
        isUserLogout: state.Login.isUserLogout
    }))

    useEffect(() => {
        dispatch(logoutUser())
    }, [dispatch])

    if (isUserLogout) {
        return <Navigate to="/login" />
    }

    return <></>
}

Logout.propTypes = {
    history: PropTypes.object
}

export default withRouter(Logout)
