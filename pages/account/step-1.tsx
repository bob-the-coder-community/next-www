import React from 'react';
import AccountLayout from '../../components/layouts/AccountLayout';
import Input from '../../components/shared/Input';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';

type Props = {};
type State = {
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    location: string
};

class Step1Page extends React.PureComponent<Props, State> {

    handleSubmit = (values: State, helper: FormikHelpers<State>): void => {
        console.log(values)
    }

    render(): JSX.Element {
        const Form = {
            InitialValue: {
                first_name: '',
                last_name: '',
                email: '', 
                phone: '',
                location: '',
            },
            Validation: Yup.object({
                first_name: Yup.string()
                    .matches(/^[a-zA-Z ]*$/, 'First name should only container alphabets')
                    .min(4, 'Too short!')
                    .required('First Name is mandatory'),
                last_name: Yup.string()
                    .matches(/^[a-zA-Z ]*$/, 'First name should only container alphabets')
                    .min(4, 'Too short!')
                    .required('Last Name is mandatory'),
                email: Yup.string()
                    .email('Enter a valid email address')
                    .required('Email address is mandatory'),
                phone: Yup.string()
                    .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Enter a valid phone number')
                    .required('Phone number is mandatory'),
                location: Yup.string()
                    .matches(/^[a-zA-Z0-9\s,'-]*$/, 'Enter a valid address')
                    .required('Location is mandatory')
            })
        }
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


                    ------
                    @ cleanup - unused html & styles
                    @ Formik & yup integrations
                */}
                <h1 className="personal-details text-center mb-5">
                    Personal Details
                </h1>
                <Formik 
                    initialValues={Form.InitialValue} 
                    validationSchema={Form.Validation} 
                    onSubmit={(value, helper) => this.handleSubmit(value, helper)}  
                >
                    {
                        (props) => (
                            <form className="user-details needs-validation" noValidate onSubmit={props.handleSubmit}>
                                <Input
                                    name="first_name"
                                    label={'First Name'}
                                    type={'text'}
                                    autoComplete={'off'}
                                    placeholder={'Enter your first name'}   
                                    value={props.values.first_name}
                                    onChange={props.handleChange}
                                    hasError={props.errors.first_name !== undefined}
                                />

                                <Input
                                    name="last_name"
                                    label={'Last Name'}
                                    type={'text'}
                                    autoComplete={'off'}
                                    placeholder={'Enter your last name'}
                                    value={props.values.last_name}
                                    onChange={props.handleChange}
                                    hasError={props.errors.last_name !== undefined}
                                />

                                <Input
                                    name="email"
                                    label={'Email address'}
                                    type={'email'}
                                    autoComplete={'off'}
                                    placeholder={'Enter your email address'}
                                    value={props.values.email}
                                    onChange={props.handleChange}
                                    hasError={props.errors.email !== undefined}
                                /> 

                                <Input
                                    name="phone"
                                    label={'Phone number'}
                                    type={'tel'}
                                    autoComplete={'off'}
                                    placeholder={'Enter your phone number'}
                                    value={props.values.phone}
                                    onChange={props.handleChange}
                                    hasError={props.errors.phone !== undefined}
                                />                        

                                <Input
                                    name="location"
                                    label={'Location'}
                                    type={'text'}
                                    autoComplete={'off'}
                                    placeholder={'Enter your location'}
                                    value={props.values.location}
                                    onChange={props.handleChange}
                                    hasError={props.errors.location !== undefined}
                                />                                                         
                                <button type="submit" className="btn btn-primary w-100 mt-2">Next</button>
                            </form>
                        )
                    }
                </Formik>
            </AccountLayout>
        )
    }
}

export default Step1Page;
