import React from 'react';
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
            </>
        )
    }
}

export default PrimaryLayout;
