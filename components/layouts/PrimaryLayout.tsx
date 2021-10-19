import React from 'react';
import FooterComponent from '../shared/Footer';
import NavbarComponent from '../shared/Navbar';

class PrimaryLayout extends React.PureComponent<{}> {
    render(): JSX.Element {
        const { children } = this.props;

        return (
            <>
                <NavbarComponent />
                <main>
                    {children}
                </main>
                <FooterComponent />
            </>
        )
    }
}

export default PrimaryLayout;
