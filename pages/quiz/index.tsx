import axios from 'axios';
import React from 'react';
import PrimaryLayout from '../../components/layouts/PrimaryLayout';
import { Quiz } from '../../types/Quiz';
import dayjs from 'dayjs';
import { ENV } from '../../const';
import { NextPageContext } from 'next';
import { decode } from '../../services/markdown';
import Head from 'next/head';

type Props = {
    questions: Quiz[];
    date: string;
};
type State = {
    active_question: number;
    selected_answers: number[];
};

class QuizPage extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        const answers = [];
        for (let i = 0; i < props.questions.length; i++) {
            answers.push(-1);
        }

        this.state = {
            active_question: 0,
            selected_answers: answers,
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

    public submit(): void {
        const { selected_answers } = this.state;
        const { date, questions } = this.props;

        /** Delaying for a 100% progress completion */
        this.setState({ active_question: (questions.length - 1) }, () => {
            const qa_mapping: { [key: string]: number } = {};
            for (let i = 0; i < questions.length; i++) {
                qa_mapping[questions[i]._id] = selected_answers[i];
            }
            
            const key: string = `${ date }::${ dayjs().unix() }::${ JSON.stringify(qa_mapping) }`;
            const buffer: string = Buffer.from(key, 'ascii').toString('base64');

            return window.location.href = `/quiz/results?recover=${ buffer }`;
        });
    }

    render(): JSX.Element {
        const { questions } = this.props;
        const { active_question, selected_answers } = this.state;

        return (
            <PrimaryLayout>
				<Head>
					<title>jsQUIZ - bobTheCoder.org</title>
					<meta name="title" content="jsQUIZ - bobTheCoder.org" />
					<meta name="description" content="Try our jsQUIZ. This quiz is a nice collection of questions to test your Javascript skills" />

					<meta property="og:type" content="website" />
					<meta property="og:url" content="https://bobthecoder.org/quiz" />
					<meta property="og:title" content="jsQUIZ - bobTheCoder.org" />
					<meta property="og:description" content="Try our jsQUIZ. This quiz is a nice collection of questions to test your Javascript skills" />
					<meta property="og:image" content="/images/quiz-thumbanil.jpg" />

					<meta property="twitter:card" content="summary_large_image" />
					<meta property="twitter:url" content="https://bobthecoder.org/quiz" />
					<meta property="twitter:title" content="jsQUIZ - bobTheCoder.org" />
					<meta property="twitter:description" content="Try our jsQUIZ. This quiz is a nice collection of questions to test your Javascript skills" />
					<meta property="twitter:image" content="/images/quiz-thumbanil.jpg" />
				</Head>

                <div className="container mt-4 mb-4">
                    <div className="quiz-landing-page">
                        <div className="page-header">
                            <button className="btn btn-outline-light p-0 m-0">
                                <img src="/images/icons/back-button.svg" alt="Back" className="mt-3 mb-4" />
                            </button>
                            <h1 className="page-title">Daily Test</h1>
                            <p className="page-description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit augue eu facilisis convallis non duis imperdiet enim.
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
                                                        question.Options.map((option, o_index) => (
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
                                                                    {option.Answer}
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
                                <button className="btn btn-outline-primary mt-4 mb-5 px-4" style={{ marginRight: '20px' }} onClick={() => this.navigate('prev')} disabled={active_question === 0}>
                                    Previous
                                </button>
                                {
                                    active_question < questions.length - 1 && (
                                        <button className="btn btn-primary mt-4 mb-5 px-4" onClick={() => this.navigate('next')}>
                                            Next
                                        </button>
                                    )
                                }
                                {
                                    active_question === questions.length - 1 && (
                                        <button className="btn btn-primary mt-4 mb-5 px-4" onClick={() => this.submit()}>
                                            Submit
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </PrimaryLayout>
        )
    }
}

export default QuizPage;

export async function getServerSideProps(context: NextPageContext) {
    try {
        const { date } = context.query;
        const response = await fetch(`${ENV.baseUrl}/mc-qs?Date=${date || dayjs().format('YYYY-MM-DD')}`, {
            method: 'GET',
            headers: new Headers({
                'content-type': 'application/json',
            }),
        });
        const questions = await response.json();
        return {
            props: {
                questions,
                date: date || dayjs().format('YYYY-MM-DD'),
            }
        }
    } catch (err) {
        return {
            props: {
                questions: [],
                date: 'null',
            },
            notFound: true,
        }
    }
}