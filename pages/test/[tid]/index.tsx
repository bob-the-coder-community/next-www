import Link from 'next/link';
import React from 'react';
import TestPlatformNavbar from '../../../components/test-platform/Nabar';

type Props = {};
type State = {};

export default class TestLandingPage extends React.PureComponent<Props, State> {
    render(): React.ReactNode {
        return (
            <div className="test-platform">
                <div className="d-flex flex-column page-content">
                    <TestPlatformNavbar container/>
                    <main className="flex-grow-1 h-100 bg-primary my-5">
                        <div className="container page-content">
                            <h1 className="page-title">
                                <small>AGILITE GROUP</small>
                                <u>Senior Software Engineer</u>
                            </h1>
                            <p className="instructions">
                                <strong>Instructions:</strong>
                                <ol>
                                    <li>The examination will consist of 2 questions.</li>
                                    <li>Total time to complete the coding challenge (both questions) is 30 mins. Please allocate your time accordingly.</li>
                                    <li>Please make sure you have a good and stable internet connection and power source. The coding challenge cannot be paused once it begins.</li>
                                    <li>We strongly recommend using a programming language which is more suitable for the role you are applying for.</li>
                                    <li>Please write your code within the function provided. The code editor also includes Template Code. DO NOT EDIT that section of the code, doing so will fail your submission.</li>
                                    <li>You can create custom test cases and test your code for different edge cases an unlimited number of times before submission.</li>
                                    <li>You cannot edit the code once you click Submit.</li>
                                </ol>
                            </p>
                            <button className="btn btn-dark">Start now</button>
                            <p className="help-text">
                                Notice something wrong? Write to us at
                                {' '}
                                <Link href={'mailto:help@bobthecoder.org'}>
                                    <a>help@bobthecoder.org</a>
                                </Link>
                            </p>
                        </div>
                    </main>
                </div>
            </div>
        )
    }
}