import React from 'react';
import { NextPage } from 'next';
import PrimaryLayout from '../components/layouts/PrimaryLayout';

class HomePage extends React.PureComponent<{}> {
	render(): JSX.Element {
		return (
			<PrimaryLayout>
				Hello, world!
			</PrimaryLayout>
    	)
	}
}

export default HomePage as NextPage;
