import { NextPageContext } from 'next';
import Head from 'next/head';
import React from 'react';
import PrimaryLayout from '../../components/layouts/PrimaryLayout';
import { ENV } from '../../const';
import { decode } from '../../services/markdown';
import { Quiz } from '../../types/Quiz';

type Props = {
    questions: Quiz[];
};

class ResultsPage extends React.PureComponent<Props> {
    tryAgain() {
        window.location.href = '/quiz';
    }


    render(): JSX.Element {
        const { questions } = this.props;
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
                            <div className="blurr_top_right" />
                            {/* <h1 className="mt-5 page-title d-flex justify-content-center">Great Job!</h1> */}
                            <div className="mt-5 mx-3 answers_header_box row">
                                <div className="col-lg-3 col-ml-6 col-sm-12 col-12 mt-5 mb-5">
                                    <img src="/images/answer-background.png" alt="image_vector" className="score_image image_vector" />
                                    <div className="offset-lg-2 offset-ml-2">
                                        <img src="/images/answer-graffite.png" alt="image_group" className="score_image image_group" />
                                        <img src="/images/answer.png" alt="image" className="score_image image_group" />
                                    </div>
                                </div>
                                <div className="offset-lg-4 col-lg-4 col-ml-6 col-sm-12 col-12 col-4 mt-5 mb-5 box_second_half">
                                    <p className="text-center">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.dolor sit amet, conse
                                    </p>
                                    <p className="score offset-4 mt-5 mb-5">
                                        <span className="score_result">{questions.reduce((a, b) => a + (b.Correct ? 1 : 0), 0)}</span>
                                        <span className="score_divide">/</span>
                                        <span className="score_total pt-5">{questions.length}</span>
                                    </p>
                                    <div className="d-flex justify-content-around">
                                        <button className="retry_button" onClick={() => null}>Retry</button>
                                        <button className="share_button">Share</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h1 className="pt-3 mb-5 page-title">Answers</h1>
                        <div className="pb-5">
                            {
                                questions.map((question, index) => (
                                    <div className="answers-container" key={question._id}>
                                        <div className="answers-header col-10">
                                            <h4 className="answers" dangerouslySetInnerHTML={{ __html: decode(question.Question) }} />
                                            <div className="answers-body mb-5">
                                                {
                                                    question.Options.map((option, o_index) => (
                                                        <div className="form-check mb-2" key={o_index}>
                                                            <input className="form-check-input" type="radio" name={`question-${index}`} id={`question-${index}-option-${o_index}`} defaultChecked={question.AnswerIndex === o_index} />
                                                            <label className={`form-check-label ${option.Correct === true && 'answer_correct'}`} htmlFor={`question-${index}-option-${o_index}`}>
                                                                {option.Answer}
                                                            </label>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                            <div className="mt-5 mb-5 col-lg-6 col-ml-6 col-sm-12 col-12">
                                <button className="retry_button" onClick={() => this.tryAgain()}>Retry</button>
                                <button className="share_button">Share</button>
                            </div>
                        </div>
                    </div>
                </div>
            </PrimaryLayout>
        )
    }
}

export async function getServerSideProps(context: NextPageContext) {
    try {
        const { recover } = context.query;

        if (!recover) {
            return {
                redirect: '/quiz',
            }
        }

        // @ts-ignore
        const data = Buffer.from(recover, 'base64').toString('ascii').split('::');
        const questions = JSON.parse(data[2]);

        const response = await (await fetch(`${ENV.baseUrl}/mc-qs?${Object.keys(questions).map((key) => `&_id=${key}`).join('')}`, {
            method: 'GET',
            headers: new Headers({
                'content-type': 'application/json',
            })
        })).json();

        const findObj = response.map((question: Quiz) => {
            return {
                ...question,
                Correct: questions[question._id] === -1 ? false : (question.Options[questions[question._id]].Correct === true),
                AnswerIndex: questions[question._id],
            }
        });

        return {
            props: {
                questions: findObj,
            }
        }
    } catch (err) {
        console.error(err);
        return {
            props: {
                questions: [],
                date: 'null',
            },
            notFound: true,
        }
    }
}

export default ResultsPage;
