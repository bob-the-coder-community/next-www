import React from 'react';
import PrimaryLayout from '../components/layouts/PrimaryLayout';

type Props = {};
type State = {};

class ContributorsPage extends React.PureComponent<Props, State> {
    render(): JSX.Element {
        return (
            <PrimaryLayout>
                <div className="contributors">
                    <div className="container">
                        <h1>Contributors</h1>
                    </div>
                </div>
            </PrimaryLayout>
        )
    }   
}

export default ContributorsPage;
