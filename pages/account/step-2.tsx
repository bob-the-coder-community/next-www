import React from 'react';
import AccountLayout from '../../components/layouts/AccountLayout';
import Input from '../../components/shared/Input';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';

type Props = {};
type State = {
    stackoverflow_username: string,
    github_username: string,
    your_website: string,
    public_email: string,
};

class Step2Page extends React.PureComponent<Props, State> {

    handleSubmit = (values: State, helper: FormikHelpers<State>): void => {
        console.log(values)
    }
    
    render(): JSX.Element {
        const Form = {
            InitialValue: {
                stackoverflow_username: '',
                github_username: '',
                your_website: '',
                public_email: '',
            },
            Validation: Yup.object({
                // (?:https?:)?\/\/(?:www\.)?stackoverflow\.com\/users\/[0-9]+\/[A-z0-9-_.]+\/?
                stackoverflow_username: Yup.string()
                    .matches( /(?:https?:)?\/\/(?:www\.)?stackoverflow\.com\/users\/[0-9]+\/[A-z0-9-_.]+\/?/, "Enter a valid stackoverflow username")
                    .required("Stackoverflow username is mandatory"),
                
                    // (?:https?:)?\/\/(?:www\.)?github\.com\/[A-z0-9-_.]+\/?
                github_username: Yup.string()
                    .matches(/(?:https?:)?\/\/(?:www\.)?github\.com\/[A-z0-9-_.]+\/?/, "Enter a valid github username")
                    .required("Github username is mandatory"),
                
                // https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)

                your_website: Yup.string()
                    .matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, "Enter a valid domain name")
                    .required("Your website link is mandatory"),
                    
                public_email: Yup.string()
                    .email('Enter a valid email address')
                    .required('Email address is mandatory')
            })
        }

        return (
            <AccountLayout>
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
                                    name="stackoverflow_username"
                                    label={'Stackoverflow Username'}
                                    type={'text'}
                                    autoComplete={'off'}
                                    placeholder={'Your stackoverflow profile link'}   
                                    value={props.values.stackoverflow_username}
                                    onChange={props.handleChange}
                                    hasError={props.errors.stackoverflow_username!== undefined}
                                />

                                <Input
                                    name="github_username"
                                    label={'Github Username'}
                                    type={'text'}
                                    autoComplete={'off'}
                                    placeholder={'Your github profile link'}
                                    value={props.values.github_username}
                                    onChange={props.handleChange}
                                    hasError={props.errors.github_username !== undefined}
                                />

                                <Input
                                    name="your_website"
                                    label={'Your Website'}
                                    type={'text'}
                                    autoComplete={'off'}
                                    placeholder={'Your website link'}
                                    value={props.values.your_website}
                                    onChange={props.handleChange}
                                    hasError={props.errors.your_website !== undefined}
                                /> 

                                <Input
                                    name="public_email"
                                    label={'Public email address'}
                                    type={'email'}
                                    autoComplete={'off'}
                                    placeholder={'Your public email address'}
                                    value={props.values.public_email}
                                    onChange={props.handleChange}
                                    hasError={props.errors.public_email !== undefined}
                                />                                                                             
                                <button type="submit" className="btn btn-primary w-100 mt-2">Create</button>
                            </form>
                        )
                    }
                </Formik>            
            </AccountLayout>
        )
    }
}

export default Step2Page;
