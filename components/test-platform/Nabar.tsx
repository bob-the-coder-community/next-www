import Link from 'next/link';
import React from 'react';

type Props = {
    container?: boolean;
};
type State = {};

class TestPlatformNavbar extends React.PureComponent<Props, State> {
    render(): React.ReactNode {
        const { container } = this.props;

        return (
            <div className="test-platform-navbar">
                <div className={container && 'container' || 'px-4'}>
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        <Link href={'/'}>
                            <a className="brand-img">
                                <img src="/images/test-platform/logo.svg" alt="bobTheCoder - Test Platform" />
                            </a>
                        </Link>
                        <Link href={'/'}>
                            <a className="close-icon">
                                <img src="/images/test-platform/close.svg" alt="Quit Test" />
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default TestPlatformNavbar;