import React from 'react';
import { NextPage } from 'next';

class HomePage extends React.PureComponent<{}> {
  render(): JSX.Element {
    return (
      <>Hello, world</>
    )
  }
}

export default HomePage as NextPage;
