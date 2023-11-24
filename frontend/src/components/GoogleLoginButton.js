import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

function GoogleLoginButton() {

    const onSuccess = (credentialResponse) => {
        var credentialResponseDecoded = jwtDecode(credentialResponse.credential)
        console.log(credentialResponseDecoded);
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