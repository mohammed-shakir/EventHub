import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { loginGoogle } from '../api_calls/user';

function GoogleLoginButton() {

    const onSuccess = async (credentialResponse) => {
        var credentialResponseDecoded = jwtDecode(credentialResponse.credential)
        console.log(credentialResponseDecoded);

        try {
            const response = await loginGoogle({ token: credentialResponse.credential });
            localStorage.setItem('token', response.token);
            window.location.href = '/';
        } catch (error) {
            console.error('Error during Google Login: ', error);
        }
      };

    return (
        <div>
            <GoogleLogin
                onSuccess={onSuccess}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </div>
    );
}

export default GoogleLoginButton;