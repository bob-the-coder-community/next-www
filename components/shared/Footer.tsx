import React, { createRef } from 'react';
import { ENV } from '../../const';
import ActionButton from '../ActionButton';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';

const BUTTON_REF: React.LegacyRef<ActionButton> = createRef();

type Props = {};
type State = {
    newsletter_status: 'prestine' | 'loading' | 'success';
};

type Form = {
    email_address: string;
}
class FooterComponent extends React.PureComponent<Props, State> {
    async submit(value: Form, helpers: FormikHelpers<Form>): Promise<void> {
        try {
            // @ts-ignore
            BUTTON_REF.current.changeStatus('loading');
            await fetch('/api/newsletter', {
                method: 'POST',
                headers: new Headers({
                    'content-type': 'application/json',
                }),
                body: JSON.stringify({
                    email: value.email_address,
                }),
            });

            helpers.resetForm();

            // @ts-ignore
            BUTTON_REF.current.changeStatus('complete');
        } catch (err) {
            console.error(err);
            // @ts-ignore
            BUTTON_REF.current.changeStatus('error');            
        }
    }

    render(): JSX.Element {
        const Form = {
            InitialValues: {
                email_address: '',
            },
            Validations: yup.object({
                email_address: yup.string().required('Email address is required').email('Enter a valid email address'),
            }),
        }

        return (
            <footer>
                <section className="top-section">
                    <div className="container">
                        <div className="d-flex flex-md-row flex-column">
                            <img src="/images/news-letter.png" alt="News Letter" />
                            <Formik initialValues={Form.InitialValues} validationSchema={Form.Validations} onSubmit={this.submit}>
                                {
                                    (props) => (
                                        <form onSubmit={props.handleSubmit}>
                                            <div className="subscribe-newsletter">
                                                <h3 className="title">Subscribe to our newsletter</h3>
                                                <p>
                                                    Looking for exciting new updates in the ever changing world of JavaScript?  Sign up to our weekly Newsletter and stay up to date.
                                                </p>
                                                <div className="d-flex">
                                                    <input value={props.values.email_address} autoComplete="off" type="email" name="email_address" onFocus={() => props.setTouched({ email_address: true })} onChange={props.handleChange} placeholder="Enter your email address..." className="form-control" />
                                                    <ActionButton ref={BUTTON_REF} text={'Subscribe'} onClick={() => props.handleSubmit()} />
                                                </div>
                                                {
                                                    props.errors.email_address && props.touched.email_address && (
                                                        <small className="text-danger">
                                                            <strong>{ props.errors.email_address }</strong>
                                                        </small>
                                                    )
                                                }
                                            </div>
                                        </form>
                                    )
                                }
                            </Formik>
                        </div>
                    </div>
                </section>
                <div className="bottom-section">
                    <div className="container">
                        <div className="d-flex flex-md-row flex-column">
                            <img src="/images/logo/white.png" alt="Logo" className="footer-logo" />
                            <div className="helpful-links flex-grow-1">
                                <div className="d-flex flex-md-row flex-column">
                                    <div className="__section">
                                        <h4 className="title">Links</h4>
                                        <ul>
                                            <li>
                                                <a href="/">Home</a>
                                            </li>
                                            {/* <li>
                                                <a href="/about">About</a>
                                            </li> */}
                                            <li>
                                                <a href="/launch-letter">Launch Letter</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="__section">
                                        <h4 className="title">Community</h4>
                                        <ul>
                                            <li>
                                                <a href={ENV.JoinLink} target="_blank">Join</a>
                                            </li>
                                            <li>
                                                <a href="/code-of-conduct">Code of Conduct</a>
                                            </li>
                                            <li>
                                                <a href="/legal/privacy-policy">Privacy Policy</a>
                                            </li>
                                            <li>
                                                <a href="https://github.com/bob-the-coder-community" target="_blank">GitHub</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="d-flex flex-md-row flex-column justify-content-between align-items-center">
                            <p className="copyright left">
                                © {(new Date()).getFullYear()} Bob the coder. All rights reserved.
                            </p>
                            <p className="copyright">
                                <a href="https://netlify.com" target="_blank">
                                    This site is powered by
                                    <img src="/images/icons/netlify-logo.png" alt="Netlify Logo" />
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default FooterComponent;
