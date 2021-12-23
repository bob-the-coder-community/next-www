import React from 'react';
import PrimaryLayout from '../components/layouts/PrimaryLayout';
import Input from '../components/shared/Input';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Modal } from 'react-bootstrap';

type Props = {};
type State = {
    public_email: string;
    github_username: string;
    stackoverflow_username: string;
    your_website: string;
    testAttempted: number;
    overallPerformance: number;
    skills: string[];
    first_name: string,
    last_name: string,
    phone: string,
    location: string,
    email: string,
    showModal: boolean,
    add_skill: string,
};

class UserPublicPage extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            public_email: 'example@example.com',
            github_username: 'githubUsername',
            stackoverflow_username: 'stackoverflowUsername',
            your_website: 'mywebsite.com',
            testAttempted: 24,
            overallPerformance: 90.2,
            skills: ['Javascript', 'React', 'Java', 'Python'],
            first_name: "Sanjay",
            last_name: "Achar",
            phone: "9012345678",
            location: "Bangalore",
            email: "abcd123@bobthecoder.org",
            add_skill: "",
            showModal: false,
        }
    }

    handleShowModal = () => {            
        this.setState({showModal: true})
    }

    handleHideModal = () => {
        this.setState({showModal: false})
    }


    handleSubmit = (values: State, helper: FormikHelpers<State>): void => {
        console.log(values)
    }

    render(): JSX.Element {
        const {public_email, github_username, stackoverflow_username, your_website, testAttempted, overallPerformance, skills, showModal} = this.state;
        const Form = {
            InitialValue: {
                ...this.state,
                add_skill: ""
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
                    .required('Location is mandatory'),
                stackoverflow_username: Yup.string()
                    .matches( /(?:https?:)?\/\/(?:www\.)?stackoverflow\.com\/users\/[0-9]+\/[A-z0-9-_.]+\/?/, "Enter a valid stackoverflow username")
                    .required("Stackoverflow username is mandatory"),
                github_username: Yup.string()
                    .matches(/(?:https?:)?\/\/(?:www\.)?github\.com\/[A-z0-9-_.]+\/?/, "Enter a valid github username")
                    .required("Github username is mandatory"),
                your_website: Yup.string()
                    .matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, "Enter a valid domain name")
                    .required("Your website link is mandatory"),
                public_email: Yup.string()
                    .email('Enter a valid email address')
                    .required('Email address is mandatory'),
                add_skill: Yup.string()
                    .matches(/^[a-zA-Z ]*$/, 'Skill must only contain characters')
                    .required('First Name is mandatory')
            })
        }
        // @todo
        // Design - https://www.figma.com/file/tPpXaTmUfp6x2HxKxb81uh/Bob-the-coder?node-id=141%3A1900
        // Responsive and 
        // 1. GitHub
        // 2. Stackover flow
        // 3. LinkedIn
        // 4. Email
        // 5. Facebook
        return (
            <PrimaryLayout>
                <div className="profile-page container">
                    <div className="profile-header">
                        <div className="cover"/>
                        <div className="profile-header-content p-4">
                            <div className="d-flex flex-sm-row flex-column justify-content-between">
                                <img src="https://via.placeholder.com/400" alt="Profile Image" className="profile-img" />
                                <h6 className="text-muted text-right text-sm-left detail">
                                    Joined on 4th Dec
                                </h6>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-4 col-12">                
                                    <h3 className="title">
                                        Username
                                    </h3>       
                                    <h4 className="job">Javascript Developer</h4>         
                                </div>
                                <div className="col-md-2 col-12 mt-auto mb-0">
                                    <span className="location p-2">
                                        <img src="/images/location.png" alt="location"/>
                                        Bengaluru
                                    </span>
                                </div>
                                <div className="col-md-6 col-12">
                                    <h6 className="text-end detail">Connect at</h6>
                                    <div className="d-flex flex-row justify-content-end">
                                        {
                                            [1, 2, 3, 4, 5, 6].map((i) => (
                                                <a href="" key={i} className="social-media"></a>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8 col-sm-12">
                            <div className="details-card">
                                <div className="row details-header"> 
                                    <div className="col-xs-12">
                                        Details
                                    </div>
                                </div>
                                <div className="row details-content">
                                    <div className="col-6 detail-name">Email address: </div>
                                    <a href="" className="col-6 detail-value text-dark">{public_email}</a>
                                </div>
                                <div className="row details-content">
                                    <div className="col-6 detail-name">Github Username: </div>
                                    <a href="" className="col-6 detail-value">{github_username}</a>
                                </div>
                                <div className="row details-content">
                                    <div className="col-6 detail-name">Stackoverflow Username: </div>
                                    <a href="" className="col-6 detail-value">{stackoverflow_username}</a>
                                </div>
                                <div className="row details-content">
                                    <div className="col-6 detail-name">Website: </div>
                                    <a href="" className="col-6 detail-value">{your_website}</a>
                                </div>
                            </div>
                            <button className="btn btn-primary mt-2" onClick={this.handleShowModal} data-bs-toggle="modal" data-bs-target="#edit_user_modal">Edit</button>
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <div className="col-12">
                                <div className="details-card">
                                    <div className="row details-header"> 
                                        <div className="col-xs-12">
                                            Skills
                                        </div>
                                    </div>
                                    <div className="skills d-flex flex-row flex-wrap p-2">
                                        {
                                            skills.map((skill, index): JSX.Element => {
                                                return (
                                                    <div className="m-1 p-1 skill" key={index}>
                                                        {skill}
                                                        <img src={"/images/cross-small.png"} alt="skillImg" className="skill-img"/>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="details-card">
                                    <div className="row details-header"> 
                                        <div className="col-xs-12">
                                            Performance
                                        </div>
                                    </div>
                                    <div className="row details-content">
                                        <div className="col-6 detail-name">Test Attempted: </div>
                                        <div className="col-6 detail-value text-dark">{testAttempted}</div>
                                    </div>
                                    <div className="row details-content">
                                        <div className="col-6 detail-name">Github Username: </div>
                                        <div className="col-6 detail-value green">{overallPerformance}%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`modal fade${showModal?" show": ""}`} id="edit_user_modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <Formik 
                                    initialValues={Form.InitialValue} 
                                    validationSchema={Form.Validation} 
                                    onSubmit={(value, helper) => this.handleSubmit(value, helper)}  
                                >
                                    {
                                        (props) => (
                                            <form className="p-5" onSubmit={props.handleSubmit}>
                                                <h4 className="mb-3">Your Online Presence</h4>
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
                                                <h4 className="mb-3">Personal Details</h4>
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
                                                <h4 className="mb-3">Skills</h4>
                                                <Input
                                                    name="add_skill"
                                                    label={"New Skill"}
                                                    type={'text'}
                                                    autoComplete={'off'}
                                                    placeholder={'Enter a new skill'}
                                                    value={props.values.add_skill}
                                                    onChange={props.handleChange}
                                                    hasError={props.errors.location !== undefined}
                                                />
                                                <div className="skills d-flex flex-row flex-wrap p-2 border">
                                                    {
                                                        skills.map((skill, index): JSX.Element => {
                                                            return (
                                                                <div className="m-1 p-1 skill" key={index}>
                                                                    {skill}
                                                                    <img src={"/images/cross-small.png"} alt="skillImg" className="skill-img"/>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <button type="submit" className="btn btn-primary mt-5">Done</button>
                                            </form>
                                        )
                                    }
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </PrimaryLayout>
        )
    }
}

export default UserPublicPage;
