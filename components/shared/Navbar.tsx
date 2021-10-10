import React from 'react';
import Link from 'next/link';

class NavbarComponent extends React.PureComponent<{}> {
    openTelegram(): void {
        window.open('https://t.me/bob_the_coder_group', '_blank');
        return;
    }

    render(): JSX.Element {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand">LOGO</a>
                    <button className="navbar-toggler" type="button">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="d-flex">
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <Link href="/" passHref>
                                    <a className="nav-link just-link mx-3">Home</a>
                                </Link>
                                <Link href="/about" passHref>
                                    <a className="nav-link just-link mx-3">About</a>
                                </Link>
                                <Link href="/contact" passHref>
                                    <a className="nav-link just-link mx-3">Contact</a>
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
