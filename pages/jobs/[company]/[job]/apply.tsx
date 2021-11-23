import Link from 'next/link';
import React from 'react';
import Countdown from '../../../../components/Countdown';
import PrimaryLayout from '../../../../components/layouts/PrimaryLayout';
import { ENV } from '../../../../const';
import { decode } from '../../../../services/markdown';
import { Job, MCQ } from '../../../../types/Job';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';

type Form = {
    full_name: string,
    email: string,
    phone: string,
    resume: string;
};
type Props = {
    job: Job;
};
type State = {
    stage: 'introduction' | 'exam' | 'completed';
    active_question: number;
    selected_answers: number[];
    questions: MCQ[];
};

class Apply extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        const answers = [];
        for (let i = 0; i < props.job.Test.MCQs.length; i++) {
            answers.push(-1);
        }

        this.state = {
            stage: 'introduction',
            active_question: 0,
            selected_answers: answers,
            questions: props.job.Test.MCQs,
        }
    }

    navigate(type: 'prev' | 'next'): void {
        const { active_question } = this.state;
        this.setState({ active_question: active_question + (type === 'next' ? 1 : -1) });
    }

    set_anwser(question: number, answer: number): void {
        const { selected_answers } = this.state;
        selected_answers[question] = answer;
        this.setState({ selected_answers }, () => this.forceUpdate());
        return;
    }

    complete(): void {
        this.setState({ stage: 'completed' });
    }

    async submit(value: Form, helpers: FormikHelpers<Form>): Promise<void> {
        try {
            const { questions, selected_answers } = this.state;

            const body: any = {
                full_name: value.full_name,
                email: value.email,
                phone: value.phone,
                resume: value.resume,
                questions: questions.map((question, q_index) => {
                    return {
                        question: question.Question,
                        options: question.MCQ_Option.map((option, o_index) => ({
                            value: option.Value,
                            selected: selected_answers[q_index] === o_index ? true : false,
                        }))
                    }
                }),
                slug: this.props.job.Slug,
            }

            await fetch(`/api/jobs`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: new Headers({
                    'content-type': 'application/json',
                })
            });

            window.location.href = 'https://join.bobthecoder.org/';
        } catch (err) {
            console.log(err);
            alert('Sorry, something went wrong');
        }
    }

    start(): void {
        this.setState({ stage: 'exam' });
    }

    async file2Base64(file: File, helpers: FormikHelpers<Form>): Promise<void> {
        try {
            const p = () => (
                new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    // @ts-ignore
                    reader.onload = () => resolve(reader.result.toString());
                    reader.onerror = error => reject(error);
                })
            );

            const base64 = await p();
            helpers.setFieldValue('resume', base64);
        } catch (error) {
            helpers.setStatus(error);
        }
    }

    render(): JSX.Element {
        const { job } = this.props;
        const { stage, active_question, questions, selected_answers } = this.state;
        const url: string = `https://bobthecoder.org/jobs/${job.Company.Name.split(' ').join('-').toLocaleLowerCase()}/${job.Slug}`;
        const Form = {
            initialValues: {
                full_name: '',
                email: '',
                phone: '',
                resume: ''
            },
            validation: yup.object({
                full_name: yup.string().required('Full name is required'),
                email: yup.string().email('Invalid email').required('Email is required'),
                phone: yup.string().required('Phone number is required'),
                resume: yup.string().required('Resume is required')
            }),
        };

        return (
            <PrimaryLayout>
                <div className="container">

                    {/* Introduction */}
                    {
                        stage === 'introduction' && (
                            <div className="job-apply">
                                <div className="content">
                                    <div className="header">
                                        <Link href={url}>
                                            <img src="/images/icons/back-button.svg" alt="Go back" className="back-button" />
                                        </Link>
                                        <h1 className="title">
                                            You're applying for
                                            {' '}
                                            <u>
                                                {job.Title}
                                            </u>
                                        </h1>
                                    </div>
                                    <div className="instructions" dangerouslySetInnerHTML={{ __html: decode(job.Test.Information) }} />
                                    <div className="footer d-flex justify-content-end">
                                        <button className="btn btn-primary" onClick={() => this.start()}>Let's Start!</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }


                    {/* Assessment */}
                    {
                        stage === 'exam' && (
                            <div className="container mt-4 mb-4">
                                <div className="quiz-landing-page">
                                    <div className="page-header">
                                        <button className="btn btn-outline-light p-0 m-0">
                                            <img src="/images/icons/back-button.svg" alt="Back" className="mt-3 mb-4" />
                                        </button>
                                        <h1 className="page-title">
                                            <Countdown time={job.Test.Duration} finished={() => this.complete()} />
                                        </h1>
                                        <p className="page-description">
                                            Try our jsQUIZ. This quiz is a nice collection of questions to test your Javascript skills
                                        </p>
                                    </div>

                                    <div className="page-body mt-5">
                                        {/* Progressbar */}
                                        <div className="progress-container d-flex align-items-center">
                                            <div className="progress flex-grow-1">
                                                <div className="progress-bar" style={{ width: `${(100 / questions.length) * active_question + 1}%` }} role="progressbar" />
                                            </div>
                                            <div className="p-2 progress-text">
                                                {active_question + 1 + ``}/{questions.length}
                                            </div>
                                        </div>

                                        {
                                            questions.map((question, index) => {
                                                if (index === active_question) {
                                                    return (
                                                        <div className="question-container" key={question._id}>
                                                            <div className="question-header">
                                                                <h4 className="question">
                                                                    <span dangerouslySetInnerHTML={{ __html: decode(question.Question) }}></span>
                                                                </h4>
                                                            </div>

                                                            <div className="question-body">
                                                                {
                                                                    question.MCQ_Option.map((option, o_index) => (
                                                                        <div className="form-check" key={o_index}>
                                                                            <input
                                                                                className="form-check-input"
                                                                                onChange={() => this.set_anwser(index, o_index)}
                                                                                type="radio"
                                                                                name="flexRadioDefault"
                                                                                id={`question-${index}-option-${o_index}`}
                                                                                checked={selected_answers[index] === o_index}
                                                                            />
                                                                            <label className="form-check-label" htmlFor={`question-${index}-option-${o_index}`}>
                                                                                {option.Value}
                                                                            </label>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                }

                                                return <div key={question._id}></div>;
                                            })
                                        }

                                        {/* Buttons */}
                                        <div className="d-flex">
                                            {
                                                active_question > 0 && (
                                                    <button className="btn btn-outline-primary mt-4 mb-5 px-4" style={{ marginRight: '20px' }} onClick={() => this.navigate('prev')} disabled={active_question === 0}>
                                                        Previous
                                                    </button>
                                                )
                                            }
                                            {
                                                active_question < questions.length - 1 && (
                                                    <button className="btn btn-primary mt-4 mb-5 px-4" onClick={() => this.navigate('next')}>
                                                        Next
                                                    </button>
                                                )
                                            }
                                            {
                                                active_question === questions.length - 1 && (
                                                    <button className="btn btn-primary mt-4 mb-5 px-4" onClick={() => this.complete()}>
                                                        Submit
                                                    </button>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )
                    }

                    {/* Completed */}
                    {
                        stage === 'completed' && (
                            <div className="job-apply">
                                <div className="content submit">
                                    <div className="header">
                                        <h1 className="title">
                                            ✅ Congratulations! You've completed the test
                                        </h1>
                                    </div>
                                    <Formik initialValues={Form.initialValues} validationSchema={Form.validation} onSubmit={(value, helper) => this.submit(value, helper)}>
                                        {
                                            (props) => (
                                                <form onSubmit={props.handleSubmit}>
                                                    <div className="instructions">
                                                        <p>As next step, we need the below information</p>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="form-group">
                                                                    <input type="text" name="full_name" className="form-control" value={props.values.full_name} onFocus={() => props.setTouched({ full_name: true })} onChange={props.handleChange} placeholder={'Full name'} />
                                                                    <small>{props.errors.full_name && props.touched.full_name && props.errors.full_name}</small>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="form-group">
                                                                    <input type="email" name="email" className="form-control" value={props.values.email} onFocus={() => props.setTouched({ email: true })} onChange={props.handleChange} placeholder={'Email address'} />
                                                                    <small>{props.errors.email && props.touched.email && props.errors.email}</small>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="form-group">
                                                                    <input type="tel" name="phone" className="form-control" value={props.values.phone} onFocus={() => props.setTouched({ phone: true })} onChange={props.handleChange} placeholder={'Phone number'} />
                                                                    <small>{(props.errors.phone && props.touched.phone && props.errors.phone) || 'We use this information to contact you'}</small>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="form-group">
                                                                    {/* @ts-ignore */}
                                                                    <input type="file" accept="application/pdf" name="phone" className="form-control" onFocus={() => props.setTouched({ resume: true })} onChange={(e) => this.file2Base64(e.target.files[0], props)} placeholder={'Resume'} />
                                                                    <small>{props.errors.resume && props.touched.resume && props.errors.resume}</small>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="d-grid gap-2">
                                                                    <button className="btn btn-primary" type="submit" disabled={props.isSubmitting}>SUBMIT</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            )
                                        }
                                    </Formik>
                                </div>
                            </div>
                        )
                    }
                </div>
            </PrimaryLayout>
        )
    }
}

export async function getServerSideProps(context: { query: { company: any; job: any; }; }) {
    try {
        const { job } = context.query;
        const response = await fetch(`${ENV.baseUrl}/jobs/?Slug=${job}`, {
            method: 'GET',
            headers: new Headers({
                'content-type': 'application/json',
            }),
        });

        const data = await response.json();
        if (data.length === 0) {
            return {
                props: {
                    job: null,
                },
                notFound: true,
            }
        }

        return {
            props: {
                job: data[0],
            }
        }
    } catch (err) {
        return {
            props: {
                job: null,
            },
            notFound: true,
        }
    }
}

export default Apply;
