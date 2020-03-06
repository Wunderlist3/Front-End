import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';

export default function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => {
                return localStorage.getItem('token') ? (
                    <Component {...props} {...rest} />
                ) : (
                    <Redirect to='/signin' />
                );
            }}
        />
    );
}