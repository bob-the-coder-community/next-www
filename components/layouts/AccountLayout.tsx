import React from 'react';
import PrimaryLayout from './PrimaryLayout';

type Props = {};
type State = {};

class AccountLayout extends React.PureComponent<Props, State> {
    render(): JSX.Element {
        const { children } = this.props;

        return (
            <PrimaryLayout>
                <div className="account-layout">
                    <div className="container">
                        <div className="account-container d-flex flex-row">
                            <div className="side-panel">
                                <div className="d-flex flex-column">
                                    <div className="top-content">
                                        <h1>Create your account</h1>
                                        <p>Take a step forward in your successful java script carrier.</p>
                                        <ul>
                                            <li>Daily Challenges</li>
                                            <li>Personalised study materials</li>
                                            <li>Test Series</li>
                                            <li>Job opportunities</li>
                                        </ul>
                                    </div>
                                    <div className="bottom-content mt-auto">
                                        <p>Join 100+ members community</p>
                                        <ul>
                                            {
                                                [
                                                    '/images/people/rachana-kn.png',
                                                    '/images/people/om-varun-r.png',
                                                    '/images/people/zuyufulla-manna.png',
                                                    '/images/people/ankit-jaiswal.png',
                                                    '/images/people/sanjana-d.png',
                                                    '/images/people/rohit-gorai.png',
                                                    '/images/people/shamanth-kumar.png',
                                                ].map((item) => (
                                                    <li key={item}>
                                                        <img src={item} alt="Image" />
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="child-container">
                                <div className="box" />
                                <div className="box-2" />
                                <div className="child-content">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PrimaryLayout>
        )
    }
}

export default AccountLayout;
