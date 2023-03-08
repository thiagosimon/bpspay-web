import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import withRouter from '../../../components/Common/withRouter'
import { STORAGE_KEYS } from '../../../utils/Constant'
import { removeStoreItem } from '../../../utils/Storage'

const Logout = () => {
    useEffect(() => {
        const onLogout = async () => {
            await removeStoreItem(STORAGE_KEYS.TOKEN)
            await removeStoreItem(STORAGE_KEYS.USER)
            await removeStoreItem(STORAGE_KEYS.CORRELATION_ID)

            window.location.href = '/login'
        }

        onLogout()
    }, [])

    return <Navigate to="/login" />
}

Logout.propTypes = {
    history: PropTypes.object
}

export default withRouter(Logout)
