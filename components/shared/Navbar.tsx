import React from 'react';
import Link from 'next/link';
import { ENV } from '../../const';

class NavbarComponent extends React.PureComponent<{}> {
    openTelegram(): void {
        window.open(ENV.JoinLink, '_blank');
        return;
    }

    render(): JSX.Element {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container">
                    <button className="navbar-toggler" type="button">
                        <img src="/images/icons/menu.svg" alt="Menu Toggle" />
                    </button>
                    <Link href="/" passHref>
                        <a className="navbar-brand">
                            &#60;/&#62;
                            bobTheCoder
                        </a>
                    </Link>
                    <div className="d-flex">
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <Link href="/" passHref>
                                    <a className="nav-link just-link mx-3">Home</a>
                                </Link>
                                <Link href="/about" passHref>
                                    <a className="nav-link just-link mx-3">About</a>
                                </Link>
                                <Link href="/code-of-conduct" passHref>
                                    <a className="nav-link just-link mx-3">Code of Conduct</a>
                                </Link>                                
                                <Link href="/" passHref>
                                    <button className="btn btn-primary btn-sm mx-3 px-4" onClick={this.openTelegram}>Join</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default NavbarComponent;
