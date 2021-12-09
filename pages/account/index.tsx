import React from 'react';
import AccountLayout from '../../components/layouts/AccountLayout';

type Props = {};
type State = {};

class AccountLanding extends React.PureComponent<Props, State> {
    render(): JSX.Element {
        return (
            <AccountLayout>
                Hello, world!
            </AccountLayout>
        )
    }
}

export default AccountLanding;
