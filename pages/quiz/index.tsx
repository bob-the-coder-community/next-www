import React from 'react';
import PrimaryLayout from '../../components/layouts/PrimaryLayout';

type Props = {};

class QuizPage extends React.PureComponent<Props> {
    render(): JSX.Element {
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
                                    <div className="progress-bar" style={{ width: '25%' }} role="progressbar" />
                                </div>
                                <div className="p-2 progress-text">
                                    4/10
                                </div>
                            </div>

                            <div className="question-container">
                                <div className="question-header">
                                    <h4 className="question">
                                        1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit augue eu facilisis convallis non duis imperdiet enim. Enim id orci, ipsum et diam porttitor.
                                    </h4>
                                </div>
                                <div className="question-body">
                                    {
                                        [1, 2, 3, 4].map((item, index) => (
                                            <div className="form-check" key={item}>
                                                <input className="form-check-input" type="radio" name="flexRadioDefault" id={`option-${ index }`} />
                                                <label className="form-check-label" htmlFor={`option-${ index }`}>
                                                    Default radio
                                                </label>
                                            </div>
                                        ))
                                    }

                                    <button className="btn btn-primary mt-4 mb-5 px-4">
                                        Next
                                    </button>
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
