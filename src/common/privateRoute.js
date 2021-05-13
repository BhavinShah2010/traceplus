import React from 'react'
import { Redirect, Route, withRouter } from 'react-router-dom'


const PrivateRoute = ({component: Component, ...rest }) => {

    let isLoggedIn = localStorage.getItem('isLoggedIn')


    return (
        <Route onEnter={() => window.analytics()} {...rest} render={props => (
            isLoggedIn && isLoggedIn == 'true' ? (
                <Component {...props}/>
              ) : (
                <Redirect to={{
                  pathname: '/login',
                }}/>
              )
          
        )}/>
    )
}

export default (PrivateRoute) 