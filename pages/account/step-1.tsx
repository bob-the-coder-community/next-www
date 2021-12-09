import React from 'react';
import AccountLayout from '../../components/layouts/AccountLayout';

type Props = {};
type State = {};

class Step1Page extends React.PureComponent<Props, State> {
    render(): JSX.Element {
        return (
            <AccountLayout>
                {/* 
                    @todo
                    1. Create a new input component that extends bootstrap input
                        Props:
                            a) label
                            b) type (input type - https://www.w3schools.com/html/html_form_input_types.asp)
                            c) required (if yes, astrisks should appear next to label -- refer design)
                            d) helper text - (https://getbootstrap.com/docs/4.0/components/forms/)
                            e) value 
                            d) onChange (it's a function which you pass directly)
                            f) name (name of the input)
                            d) error text (if not null, the input change style as per the design)

                    2. Formik integrations
                */}
            </AccountLayout>
        )
    }
}

export default Step1Page;
