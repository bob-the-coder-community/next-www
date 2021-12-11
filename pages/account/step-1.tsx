import React from 'react';
import AccountLayout from '../../components/layouts/AccountLayout';
import Input from '../../components/shared/Input';

type Props = {};
type State = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    location: string
};

class Step1Page extends React.PureComponent<Props, State> {

    state: State = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        location: ""
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if (name === "phone") {
            if (/^\d+$/.test(value) || value === "")
                this.setState({ [name]: value } as Pick<State, keyof State>)
        }
        else
            this.setState({ [name]: value } as Pick<State, keyof State>)
    }

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
                <h1 className="personal-details text-center mb-5">
                    Personal Details
                </h1>
                <form className="user-details needs-validation" noValidate onSubmit={(e) => { e.preventDefault() }}>
                    <Input
                        name="first_name"
                        label={'First Name'}
                        type={'text'}
                        autoComplete={'off'}
                        placeholder={'Enter your first name'}
                        value={'Sanjay'}
                    />

                    <Input
                        name="last_name"
                        label={'Last Name'}
                        type={'text'}
                        autoComplete={'off'}
                        placeholder={'Enter your last name'}
                    />

                    <Input
                        name="email"
                        label={'Email address'}
                        type={'email'}
                        autoComplete={'off'}
                        placeholder={'Enter your email address'}
                        hasError
                    /> 

                    <Input
                        name="phone"
                        label={'Phone number'}
                        type={'tel'}
                        autoComplete={'off'}
                        placeholder={'Enter your phone number'}
                    />                        

                    <Input
                        name="location"
                        label={'Location'}
                        type={'text'}
                        autoComplete={'off'}
                        placeholder={'Enter your location'}
                    />                                                                           

                    {/* <div className="mb-4 form-group">
                        <label className="user-details-labels">
                            <h6 className="ml-lg-3 mb-0">First name</h6>
                            <input type="text" 
                                value={this.state.firstName}
                                className="form-control user-inputs" 
                                name="firstName" 
                                placeholder="Enter your first name" 
                                required 
                                onChange={this.handleChange}/>
                        </label>
                    </div>
                    <div className="mb-4 form-group">
                        <label className="user-details-labels">
                            <h6 className="ml-lg-3 mb-0">Last name</h6>
                            <input 
                                value={this.state.lastName}
                                type="text" 
                                className="form-control user-inputs" 
                                name="lastName" 
                                placeholder="Enter your last name" 
                                required 
                                onChange={this.handleChange}/>
                        </label>
                    </div>
                    <div className="mb-4 form-group">
                        <label className="user-details-labels">
                            <h6 className="ml-lg-3 mb-0">Email address</h6>
                            <input 
                                value={this.state.email}
                                type="email" 
                                className="form-control user-inputs" 
                                name="email" 
                                placeholder="Enter your email" 
                                required 
                                onChange={this.handleChange}/>
                        </label>
                    </div>
                    <div className="mb-4 form-group">
                        <label className="user-details-labels">
                            <h6 className="ml-lg-3 mb-0">Phone</h6>
                            <input 
                                value={this.state.phone}
                                type="text" 
                                maxLength={10} 
                                className="form-control user-inputs" 
                                name="phone"
                                placeholder="Enter your phone number" 
                                required 
                                onChange={this.handleChange}/>
                        </label>
                    </div>
                    <div className="mb-3 form-group">
                        <label className="user-details-labels">
                            <h6 className="ml-lg-3 mb-0">Location</h6>
                            <input 
                                value={this.state.location}
                                type="text" 
                                className="form-control user-inputs" 
                                name="location" 
                                placeholder="Enter your current location" 
                                required 
                                onChange={this.handleChange}/>
                        </label>
                    </div> */}
                    <button type="submit" className="btn next-btn w-100 mt-2">Next</button>
                </form>
            </AccountLayout>
        )
    }
}

export default Step1Page;
