import React from 'react';
import AccountLayout from '../../components/layouts/AccountLayout';
import {
    FacebookLoginButton,
    GoogleLoginButton,
    GithubLoginButton,
    TwitterLoginButton,
    LinkedInLoginButton,
    AppleLoginButton
} from 'react-social-login-buttons';

type Props = {};
type State = {};

class AccountLanding extends React.PureComponent<Props, State> {
    render(): JSX.Element {
        return (
            <AccountLayout>
                {/* 
                    @todo
                    
                    https://www.npmjs.com/package/react-social-login-buttons
                    
                    Setup buttons for
                        1. Google
                        2. Facebook
                        3. Github
                        4. Twitter
                        5. GitHub

                    Figma link - https://www.figma.com/file/tPpXaTmUfp6x2HxKxb81uh/Bob-the-coder?node-id=126%3A1491

                    Note:
                        1. All styles should be in styles/pages/account.scss (file already created)
                        2. @isanjayachar - to write APIs
                */}

                {/* Text should be in one the text components like h1, 2, 3, p, small, span, etc... */}
                {/* Class names and any props that you pass should be closed within a double quotes */}
                <h1 className="personal-details text-center mb-5">
                    Personal Details
                </h1>
                <GoogleLoginButton className="login-btns google-login-btn mt-3">
                    Continue with Google
                </GoogleLoginButton>
                <FacebookLoginButton className="login-btns facebook-login-btn mt-3">
                    Continue with Facebook
                </FacebookLoginButton>
                <LinkedInLoginButton className="login-btns linkedin-login-btn mt-3">
                    Continue with LinkedIn
                </LinkedInLoginButton>
                <GithubLoginButton className="login-btns github-login-btn mt-3">
                    Continue with Github
                </GithubLoginButton>
                <TwitterLoginButton className="login-btns twitter-login-btn mt-3">
                    Continue with Twitter
                </TwitterLoginButton>
            </AccountLayout>
        )
    }
}

export default AccountLanding;
