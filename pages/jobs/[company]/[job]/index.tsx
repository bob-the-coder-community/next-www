import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import PrimaryLayout from '../../../../components/layouts/PrimaryLayout';
import { ENV } from '../../../../const';
import dayjs from 'dayjs';
import { decode } from '../../../../services/markdown';

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
    render(): JSX.Element {
        const { job } = this.props;
        const url: string = `https://bobthecoder.org/jobs/${job.Company.Name.split(' ').join('-').toLocaleLowerCase()}/${job.Slug}`;

        return (
            <PrimaryLayout>
                <Head>
                    <title>bobTheCoder.org - {job.Title}</title>
                    <meta name="title" content={`bobTheCoder.org - ${job.Title}`} />
                    <meta name="description" content={`Apply for ${job.Title} at ${job.Company.Name}`} />

                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={url} />
                    <meta property="og:title" content={`bobTheCoder.org - ${job.Title}`} />
                    <meta property="og:description" content={`Apply for ${job.Title} at ${job.Company.Name}`} />

                    <meta property="twitter:card" content="summary_large_image" />
                    <meta property="twitter:url" content={url} />
                    <meta property="twitter:title" content={`bobTheCoder.org - ${job.Title}`} />
                    <meta property="twitter:description" content={`Apply for ${job.Title} at ${job.Company.Name}`} />
                </Head>

                <div className="job-description">
                    <div className="container">
                        <div className="header">
                            <h1 className="job-title">{job.Title}</h1>
                            <ul className="job-meta-details">
                                <li className="company">
                                    {job.Company.Name}
                                </li>
                                <li className="posted-date">
                                    {dayjs(job.Date, 'YYYY-MM-DD').format('DD MMM YYYY')}
                                </li>
                                <li className="share-this">
                                    <ul className="social-icons">
                                        <li className="social-icon">
                                            <Link passHref href={`https://www.linkedin.com/shareArticle?url=${url}&title=Apply for ${job.Title}`}>
                                                <a target="_blank">
                                                    <img src="/images/icons/social/linkedin.png" alt="LinkedIn" />
                                                </a>
                                            </Link>
                                        </li>
                                        <li className="social-icon">
                                            <Link passHref href={`https://www.facebook.com/sharer.php?u=${url}`}>
                                                <a target="_blank">
                                                    <img src="/images/icons/social/facebook.png" alt="Facebook" />
                                                </a>
                                            </Link>
                                        </li>
                                        <li className="social-icon">
                                            <Link passHref href={`https://twitter.com/share?url=${url}&text=Apply for ${job.Title}&via=bobTheCoder.org`}>
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
                            <div className="description" dangerouslySetInnerHTML={{ __html: decode(job.Description) }} />
                            <Link href={url + '/apply'} passHref={false}>
                                <button className="btn btn-primary mt-4 mb-5 px-4">
                                    APPLY NOW!
                                </button>
                            </Link>
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

export default Job;
