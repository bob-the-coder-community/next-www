import Link from 'next/link';
import React from 'react';

type Props = {};
type State = {};

class NavbarComponent extends React.PureComponent<Props, State> {
    render(): React.ReactNode {
        const Links: { name: string; link: string }[] = [
            { name: 'home.', link: '/' },
            { name: 'about.', link: '/#about' },
            { name: 'team.', link: '/#team' },
            { name: 'links.', link: '/#footer' },
        ];
        
        return (
            <nav className="navbar bg-light">
                <div className="container">
                    <div className="d-flex flex-md-row flex-column align-items-center w-100">
                        <a href="/" className="navbar-brand flex-grow-1">
                            bobTheCoder.
                        </a>
                        <div className="menu-items">
                            {
                                Links.map((link) => (
                                    <Link href={link.link} key={link.link} passHref>
                                        <a>{link.name}</a>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default NavbarComponent;
