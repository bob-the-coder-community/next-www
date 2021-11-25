import React from 'react';
import PrimaryLayout from '../../components/layouts/PrimaryLayout';
import Prism from 'prismjs';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import dayjs from 'dayjs';

type Props = {};
type State = {
    question: string | null;
    answer: string | null;
};

type Form = {
    input: string
};
class CodeBot extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            question: null,
            answer: null,
        };
    }

    async submit(value: Form, helper: FormikHelpers<Form>) {
        try {
            const res = await fetch('/api/codex', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: value.input,
                }),
            });

            const answer = await res.json();
            this.setState({
                question: value.input,
                answer: answer.message[0].text,
            });
        } catch (err) {
            console.error(err);
        } finally {
            helper.setSubmitting(false);
        }
    }

    render(): JSX.Element {
        const { question, answer } = this.state;
        const Form = {
            initialValues: {
                input: '',
            },
            validation: yup.object({
                input: yup.string().required('Required').max(160, 'Must be 30 characters or less').min(3, 'Must be 3 characters or more'),
            }),
        }
        return (
            <PrimaryLayout hideFooter>
                <div className="chat-bot-page d-flex flex-column">
                    <div className="messages flex-fill overflow-hidden">
                        <div className="response">
                            {
                                question && answer && (
                                    <>
                                        <p className="m-0 text-center">
                                            <small className="time text-center">{dayjs().format('HH:mm')}</small>
                                        </p>
                                        <div className="message">
                                            <div className="question mb-0">
                                            /* {question} */
                                            </div>
                                            <pre>
                                                <code dangerouslySetInnerHTML={{
                                                    __html: Prism.highlight(answer, Prism.languages.javascript, 'javascript')
                                                }} />
                                            </pre>
                                            <a className="open-in-fiddle" href="http://jsfiddle" target="_blank" rel="noopener noreferrer">
                                                open in jsFiddle
                                            </a>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                    <Formik initialValues={Form.initialValues} validationSchema={Form.validation} onSubmit={(value, helper) => this.submit(value, helper)}>
                        {
                            (props) => (
                                <form onSubmit={props.handleSubmit}>
                                    <div className="input-box d-flex flex-row">
                                        <div className="form-group flex-fill">
                                            <input disabled={props.isSubmitting} autoCapitalize={'on'} autoComplete={'off'} autoFocus type="text" name="input" value={props.values.input} onChange={props.handleChange} maxLength={160} className="form-control" placeholder="Ask your question here..." />
                                        </div>
                                        <button className="btn btn-dark" type="submit" disabled={props.isSubmitting}>
                                            <img src="/images/icons/send.png" alt="send" />
                                        </button>
                                    </div>
                                </form>
                            )
                        }
                    </Formik>
                </div>
            </PrimaryLayout>
        )
    }
}

export default CodeBot;
