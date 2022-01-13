import React from 'react';
import {
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    GithubAuthProvider,
    TwitterAuthProvider,
} from 'firebase/auth';
import AccountLayout from '../../components/layouts/AccountLayout';
import {
    FacebookLoginButton,
    GoogleLoginButton,
    GithubLoginButton,
    TwitterLoginButton,
} from 'react-social-login-buttons';
import { FirebaseApp } from '../../services/firebase';
import { FirebaseError } from 'firebase/app';
import { Snackbar } from '../../services/snackbar';


type Props = {};
type State = {
    isLoading: boolean;
};

class AccountLanding extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isLoading: false,
        }
    }

    componentDidMount() {
        FirebaseApp.auth.onAuthStateChanged((user) => {
            console.log(user);
        });
    }

    async Login(provider: 'google' | 'twitter' | 'facebook' | 'github'): Promise<void> {
        this.setState({ isLoading: true });

        try {
            const FirebaseProvider = {
                'google': new GoogleAuthProvider(),
                'twitter': new TwitterAuthProvider(),
                'facebook': new FacebookAuthProvider(),
                'github': new GithubAuthProvider(),
            }

            await signInWithPopup(FirebaseApp.auth, FirebaseProvider[provider]);
        } catch (err) {
            const AuthError = err as FirebaseError;
            if (AuthError.code === 'auth/popup-closed-by-user') {
                Snackbar.show('Login cancelled');
                return;
            }

            if (AuthError.code === 'auth/account-exists-with-different-credential') {
                Snackbar.show('Account exists with different provider');
                return;
            }

            Snackbar.show(AuthError.message);
            return;
        } finally {
            this.setState({ isLoading: false });
        }
    }

    render(): JSX.Element {
        const { isLoading } = this.state;

        return (
            <AccountLayout>
                <h1 className="personal-details text-center mb-5">
                    Personal Details
                </h1>
                <div style={{ pointerEvents: isLoading ? 'none' : 'inherit' }}>
                    <GoogleLoginButton className="login-btns google-login-btn mt-3" onClick={() => this.Login('google')}>
                        Continue with Google
                    </GoogleLoginButton>
                    <FacebookLoginButton className="login-btns facebook-login-btn mt-3" onClick={() => this.Login('facebook')}>
                        Continue with Facebook
                    </FacebookLoginButton>
                    <GithubLoginButton className="login-btns github-login-btn mt-3" onClick={() => this.Login('github')}>
                        Continue with Github
                    </GithubLoginButton>
                    <TwitterLoginButton className="login-btns twitter-login-btn mt-3" onClick={() => this.Login('twitter')}>
                        Continue with Twitter
                    </TwitterLoginButton>
                </div>
            </AccountLayout>
        )
    }
}

export default AccountLanding;
