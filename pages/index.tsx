import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { ENV } from '../const';
import { Blog } from '../types/Blogs';
import PrimaryLayout from '../components/layouts/PrimaryLayout';
import BlogsComponent from '../components/Blogs';


type Props = {
	blogs: Blog[];
}

class HomePage extends React.PureComponent<Props> {
	openTelegram(): void {
		window.open(ENV.JoinLink, '_blank');
		return;
	}

	render(): JSX.Element {
		const { blogs } = this.props;

		return (
			<PrimaryLayout>
				<Head>
					<title>bobTheCoder.org - Exclusive JavaScript Community</title>
					<meta name="title" content="bobTheCoder - Exclusive JavaScript Community" />
					<meta name="description" content="Bob the Coder began with the goal of providing an open community for coders. A community where all JavaScript problems, from the fundamentals to the advanced, are addressed and are freely available to everybody.🚀" />

					<meta property="og:type" content="website" />
					<meta property="og:url" content="https://bobthecoder.org/" />
					<meta property="og:title" content="bobTheCoder - Exclusive JavaScript Community" />
					<meta property="og:description" content="Bob the Coder began with the goal of providing an open community for coders. A community where all JavaScript problems, from the fundamentals to the advanced, are addressed and are freely available to everybody.🚀" />
					<meta property="og:image" content="/images/thumbanil.jpg" />

					<meta property="twitter:card" content="summary_large_image" />
					<meta property="twitter:url" content="https://bobthecoder.org/" />
					<meta property="twitter:title" content="bobTheCoder - Exclusive JavaScript Community" />
					<meta property="twitter:description" content="Bob the Coder began with the goal of providing an open community for coders. A community where all JavaScript problems, from the fundamentals to the advanced, are addressed and are freely available to everybody.🚀" />
					<meta property="twitter:image" content="/images/thumbanil.jpg" />
				</Head>

				<div className="landing-page">
					<section className="hero-section">
						<div className="container">

							{/* Radial Container */}
							<div className="radial-gradient" />

							{/* Hero Content */}
							<div className="d-flex flex-sm-row flex-column align-items-center justify-content-between mb-5">
								<div className="hero-lhc">
									<h1 className="hero-title">Bob the coder</h1>
									<h6 className="hero-cta">
										Exclusive community for JS developer
									</h6>
									<p className="hero-description">
										bobTheCoder is one of the newest, fast growing DEV communities on the block, aiming to help you explore the world of JS with a new perspective.
									</p>
									<button className="btn btn-primary mt-4 px-5" onClick={this.openTelegram}>
										Join now
									</button>
								</div>
								<div className="hero-rhc d-none d-md-block">
									<Image src={require('../public/images/main-illustration.png')} width={400} height={400} objectFit="contain" className="hero-img" />
								</div>
							</div>
						</div>
					</section>

					<div className="mt-5" />

					{/* Launch Letter */}
					<section className="launch-letter mt-5 mb-5">
						<div className="container">
							<div className="alert alert-light mt-5">
								<span className="pr-3">✉️</span>
								{' '}
								<strong>
									Launch Letter:
								</strong>
								{' '}
								Read our launch letter by our founder and community manager.
								{' '}
								<Link href="/launch-letter" passHref>
									<a className="text-primary">Read more</a>
								</Link>
							</div>
						</div>
					</section>

					<div className="right-background" />

					{/* Why should you join */}
					<section className="why-should-you-join mt-5 mb-5">
						<div className="container">
							<h1 className="section-title">Why should you join?</h1>
							<p className="section-description">
								Bob the coder is a fast-growing JS community in India. We help developers make the most of the ecosystem and find relevant opportunities.
							</p>
							<div className="row mt-5">
								<div className="col-md-4 col-12">
									<div className="card teal-card">
										<p>
											Bob The Coder as a community has also launched a new initiative to help our members get placed in some exciting new roles to help jump start their careers.
										</p>
										<p>
											We have an active recruitment base to help our members find their dream jobs and connect them with some of the top companies/startups in and around the country.
										</p>
										<p>
											We take care of the entire recruitment process and filter out our candidates on various levels and prepare them for some of the most challenging roles out there.
										</p>
									</div>
								</div>
								<div className="col-md-4 col-12">
									<div className="card yellow-card">
										<ul>
											<li>Active community experience with daily updates on the JS world.</li>
											<li>Intellectual discussions on everything JavaScript and more.</li>
											<li>Blogs and quizzes for the members to help and understand JavaScript better. </li>
										</ul>
									</div>
								</div>
								<div className="col-md-4 col-12">
									<div className="card orange-card">
										<p>
											We have created an evolving community of young minds to discuss and deliberate their JS queries with our experts in the community.
										</p>
										<p>
											Daily updates on the happenings of JavaScript are posted on the group to keep our members up to date with the latest developments in the JS world.
										</p>
										<p>
											Weekly quizzes to help improve the performance of members with challenging tasks and projects designed and developed by our team.
										</p>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* Daily Challange */}
					{/* <section className="daily-challange">
						<div className="container">
							<div className="custom-message">
								<div className="d-flex">
									<div className="msg-container">
										We have got something for you !!!
									</div>
									<img src="/images/wynk.png" alt="Wynk!" />
								</div>
							</div>

							<h1 className="section-title">Your Daily Challange</h1>
							<div className="bullets">
								{
									[0, 2, 3, 4, 5].map((i) => (
										<div className={`bullet ${i === 0 ? 'active' : ''}`} key={i}></div>
									))
								}
							</div>
							<div className="questions-container">
								<h6 className="question">
									Q. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi, nec vestibulum, libero lorem. Interdum vel adipiscing ultricies laoreet euismod sit amet ante laoreet.
								</h6>
								<div className="answer">
									<div className="form-group">
										<textarea rows={10} className="form-control" data-gramm="false" placeholder={'Type your answer here'}></textarea>
									</div>
									<div className="d-flex flex-row">
										<button className="btn btn-outline-primary">Reset</button>
										<button className="btn btn btn-primary">Submit</button>
									</div>
								</div>
							</div>
						</div>
					</section> */}

					{/* Blogs */}
					<BlogsComponent blogs={blogs} />
				</div>
			</PrimaryLayout>
		)
	}
}

export async function getServerSideProps() {
    try {
        const response = await fetch(`${ process.env.BaseEndpoint }/blogs`, {
            method: 'GET',
            headers: new Headers({
                'content-type': 'application/json',
            }),
        });

        const data = await response.json();
        return {
            props: {
                blogs: data.message,
            }
        }
    } catch (err) {
        return {
            props: {
				blogs: [],
			}
        }
    }
}

export default HomePage;
