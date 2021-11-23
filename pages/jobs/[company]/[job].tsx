import Link from 'next/link';
import React from 'react';
import PrimaryLayout from '../../../components/layouts/PrimaryLayout';
import { ENV } from '../../../const';

type Props = {
    job: {
        Type: string;
        _id: string;
        Title: string;
        Slug: string;
        Description: string;
        Compensation: string;
        Date: string;
        Company: {
            _id: string;
            Name: string;
            Description: string;
            Location: string;
        }
    };
};
type State = {};

class Job extends React.Component<Props, State> {
    componentDidMount(): void {
        console.log(this.props);
    }

    render(): JSX.Element {
        const { job } = this.props;
        const url: string = `https://bobthecoder.org/jobs/${ job.Company.Name.split(' ').join('-').toLocaleLowerCase() }/${ job.Slug }`;

        return (
            <PrimaryLayout>
                <div className="job-description">
                    <div className="container">
                        <div className="header">
                            <h1 className="job-title">Data Entry Internship in Bangalore at Knowhere Studio</h1>
                            <ul className="job-meta-details">
                                <li className="company">
                                    Knowhere Studio
                                </li>
                                <li className="posted-date">
                                    26th Nov 2021
                                </li>
                                <li className="share-this">
                                    <ul className="social-icons">
                                        <li className="social-icon">
                                            <Link passHref href={`https://www.linkedin.com/shareArticle?url=${ url }&title=Apply for ${ job.Title }`}>
                                                <a target="_blank">
                                                    <img src="/images/icons/social/linkedin.png" alt="LinkedIn" />
                                                </a>
                                            </Link>
                                        </li>
                                        <li className="social-icon">
                                            <Link passHref href={`https://www.facebook.com/sharer.php?u=${ url }`}>
                                                <a target="_blank">
                                                    <img src="/images/icons/social/facebook.png" alt="Facebook" />
                                                </a>
                                            </Link>
                                        </li>
                                        <li className="social-icon">
                                            <Link passHref href={`https://twitter.com/share?url=${ url }&text=Apply for ${ job.Title }&via=bobTheCoder.org`}>
                                                <a target="_blank">
                                                    <img src="/images/icons/social/twitter.png" alt="Twitter" />
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div className="job-details">
                            <div className="description">
                                <h4 id="about-knowhere-studio">About Knowhere Studio</h4>
                                <p>We&#39;re a young startup based in Bengaluru. We&#39;re a team of super-coders, designers &amp; business developers. We started off with a mission to help fellow entrepreneurs with their startup mission We&#39;ve worked on 20+ projects and our team has a collective experience of over 10 years in development &amp; user-focused UI/UX design.</p>
                                <p>We see ourselves as a right fit in:</p>
                                <ol>
                                    <li>Developing custom mobile &amp; web-based dynamic applications</li>
                                    <li>Research and strategic based UI/UX designing and development</li>
                                    <li>Continuous support in technology throughout a business journey</li>
                                </ol>
                                <h4 id="about-the-internship">About the internship</h4>
                                <p>Selected intern&#39;s day-to-day responsibilities include:</p>
                                <ol>
                                    <li>Selected Entering customer and account data from source documents within time limits</li>
                                    <li>Compiling, verifying the accuracy, and sorting information to prepare source data for computer entry</li>
                                    <li>Reviewing data for deficiencies or errors, correcting any incompatibilities, and checking the output intern&#39;s day-to-day responsibilities include:</li>
                                </ol>
                                <h4 id="who-can-apply">Who can apply</h4>
                                <p>Only those candidates can apply who:</p>
                                <ol>
                                    <li>are available for full time (in-office) internship</li>
                                    <li>can start the internship between 5th Oct&#39;21 and 9th Nov&#39;21</li>
                                    <li>are available for a duration of 2 months</li>
                                    <li>have relevant skills and interests</li>
                                </ol>
                            </div>
                            <button className="btn btn-primary mt-4 mb-5 px-4">
                                APPLY NOW!
                            </button>
                        </div>
                    </div>
                </div>
            </PrimaryLayout>
        )
    }
}

export async function getServerSideProps(context: { query: { company: any; job: any; }; }) {
    try {
        const { job } = context.query;
        const response = await fetch(`${ENV.baseUrl}/jobs/?Slug=${ job }`, {
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

export default Job;
