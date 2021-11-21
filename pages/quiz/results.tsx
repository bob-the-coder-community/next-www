import axios from 'axios';
import React from 'react';
import PrimaryLayout from '../../components/layouts/PrimaryLayout';
import { Quiz } from '../../types/Quiz';

type Props = {};
type State = {
    correctAnswer: boolean
    selectedAnswer: boolean
    answersDetails: Quiz[]
};

class QuizPage extends React.PureComponent<Props, State> {
    constructor(props: Props){
        super(props);
        this.state = {
            correctAnswer: true,
            selectedAnswer: true,
            // @ts-ignore
            answersDetails: this.props.message
        };
    }
    RestartQuiz = () =>{
        window.location.href = '/quiz';
    } 
    render(): JSX.Element {
        return (
            <PrimaryLayout>
                <div className="container mt-4 mb-4">
                    <div className="quiz-landing-page">
                        <div className="page-header">
                            <div className="blurr_top_right"/>
                            <h1 className="mt-5 page-title d-flex justify-content-center">Great Job!</h1>
                            <div className="mt-5 mx-3 answers_header_box row">
                                <div className="col-lg-3 col-ml-6 col-sm-12 col-12 mt-5 mb-5">
                                        <img src="/images/Answers_Vector 56.png" alt="image_vector" className="score_image image_vector" />
                                    <div className="offset-lg-2 offset-ml-2">
                                        <img src="/images/Answers-Group 166.png" alt="image_group" className="score_image image_group"/>
                                        <img src="/images/Answers-Image.png" alt="image" className="score_image image_group"/>
                                    </div>
                                </div>
                                <div className="offset-lg-4 col-lg-4 col-ml-6 col-sm-12 col-12 col-4 mt-5 mb-5 box_second_half">
                                    <p className="text-center">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.dolor sit amet, conse
                                    </p>
                                    <p className="score offset-4 mt-5 mb-5">
                                        <span className="score_result">9</span>
                                        <span className="score_divide">/</span>
                                        <span className="score_total pt-5">10</span>
                                    </p>    
                                    <div className="d-flex justify-content-around">
                                        <button className="retry_button" onClick={()=> this.RestartQuiz()}>Retry</button>
                                        <button className="share_button">Share</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <h1 className="pt-3 mb-5 page-title">Answers</h1>
                            </div>
                            <div className="pb-5">
                            {
                                this.state.answersDetails.map((eachQuestions, index)=>(
                                    <div className="answers-container" key={index}>
                                        <div className="answers-header col-10">
                                            <h4 className="answers">
                                                {index + 1}. {eachQuestions.Question}
                                            </h4>
                                        </div>
                                        <div className="answers-body mb-5">
                                            {
                                                eachQuestions.Options.map((item, index) => (
                                                    <div className="form-check mb-2" key={index}>
                                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id={`option-${ index }`} />
                                                        {
                                                            <label className={`form-check-label ${item.Correct === true && 'answer_correct'}`} htmlFor={`option-${ index }`}>
                                                                {item.Answer}
                                                            </label>
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                            <div className="mt-5 mb-5 col-lg-6 col-ml-6 col-sm-12 col-12">
                                <button className="retry_button" onClick={()=> this.RestartQuiz()}>Retry</button>
                                <button className="share_button">Share</button>
                            </div>
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
        // @ts-ignore
        props: response.data
    }
}