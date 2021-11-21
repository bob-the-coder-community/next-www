import axios from 'axios';
import React from 'react';
import PrimaryLayout from '../../components/layouts/PrimaryLayout';
import { Quiz } from '../../types/Quiz';

type Props = {};
type State = {
    QuizQuestions: Quiz[]
    QuestionNumber: number
    TotalQuestions: number,
};

class QuizPage extends React.PureComponent<Props, State> {
    constructor(props:Props){
        super(props);
        this.state = {
            // @ts-ignore
            QuizQuestions: this.props.message,
            QuestionNumber: 0,
            // @ts-ignore
            TotalQuestions: this.props.message.length-1,
        };
    }
    NextQuestion = () => {
        const { QuestionNumber } = this.state;
        this.setState({
            QuestionNumber: QuestionNumber + 1
        })
    }
    PreviousQuestion = () => {
        const { QuestionNumber } = this.state;
        this.setState({
            QuestionNumber: QuestionNumber - 1
        })
    }
    SubmitAll = () => {
        window.location.href = '/answers';
    }
    WidthOfBar = () => {
        return ((this.state.QuestionNumber + 1)/(this.state.TotalQuestions + 1))*100
    }
    render(): JSX.Element {
        const { QuestionNumber, QuizQuestions } = this.state;
        return (
            <PrimaryLayout>
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
                            <div className="progress-container d-flex align-items-center">
                                <div className="progress flex-grow-1">
                                    <div className="progress-bar" style={{ width: `${this.WidthOfBar()}%` }} role="progressbar" />
                                </div>
                                <div className="p-2 progress-text">
                                    {this.state.QuestionNumber+1}/{this.state.TotalQuestions + 1}
                                </div>
                            </div>

                            <div className="question-container">
                                {
                                    <div>
                                        <div className="question-header">
                                            <h4 className="question">
                                                {QuestionNumber+1}. {QuizQuestions[QuestionNumber].Question}
                                            </h4>
                                        </div>
                                        <div className="question-body">
                                            {QuizQuestions[QuestionNumber].Options.map((item, index) => (
                                                <div className="form-check" key={index}>
                                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id={`option-${ index }`} />
                                                    <label className="form-check-label" htmlFor={`option-${ index }`}>
                                                        {item.Answer}
                                                    </label>
                                                </div>
                                            ))}
                                            <div className="d-flex justify-content-between col-4">
                                                {
                                                    this.state.QuestionNumber > 0 && (
                                                        <button className="btn btn-primary mt-4 mb-5 px-4" onClick={() => this.PreviousQuestion()}>
                                                            Previous
                                                        </button>
                                                    )
                                                }
                                                {
                                                    this.state.QuestionNumber !== this.state.TotalQuestions && (
                                                        <button className="btn btn-primary mt-4 mb-5 px-4" onClick={() => this.NextQuestion()}>
                                                            Next
                                                        </button>
                                                    )
                                                }
                                                {
                                                    this.state.QuestionNumber === this.state.TotalQuestions && (
                                                        <button className="btn btn-primary mt-4 mb-5 px-4" onClick={() => this.SubmitAll()}>
                                                            Submit
                                                        </button>
                                                    )
                                                }
                                            </div>  
                                        </div>
                                    </div>
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

export const getStaticProps = async () => {
    const response = await axios.get('http://localhost:3000/api/quiz')
    return {
        props: response.data
    }
}