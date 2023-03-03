import React, { useEffect } from 'react'

//import Scss
import './assets/scss/themes.scss'

//imoprt Route
import Route from './router'

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper";

// Fake Backend
import fakeBackend from './helpers/AuthType/fakeBackend'
import { changeLayoutMode } from './store/actions'
import { useDispatch } from 'react-redux'
// Activating fake backend
fakeBackend()

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// };

// init firebase backend
// initFirebaseBackend(firebaseConfig);

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        const setDarkMode = () => {
            dispatch(changeLayoutMode('light'))
        }
        setDarkMode()
    }, [])

    return (
        <React.Fragment>
            <Route />
        </React.Fragment>
    )
}

export default App
