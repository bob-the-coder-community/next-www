import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { NextPage } from 'next';
import { ENV } from '../const';
import PrimaryLayout from '../components/layouts/PrimaryLayout';

class HomePage extends React.PureComponent<{}> {
	openTelegram(): void {
		window.open(ENV.JoinLink, '_blank');
		return;
	}

	render(): JSX.Element {
		return (
			<PrimaryLayout>
				<Head>
					<title>bobTheCoder.org - Exclusing JavaScript Community</title>
					<meta name="title" content="bobTheCoder - Exclusing JavaScript Community" />
					<meta name="description" content="Bob the Coder began with the goal of providing an open community for coders. A community where all JavaScript problems, from the fundamentals to the advanced, are addressed and are freely available to everybody.🚀" />

					<meta property="og:type" content="website" />
					<meta property="og:url" content="https://bobthecoder.org/" />
					<meta property="og:title" content="bobTheCoder - Exclusing JavaScript Community" />
					<meta property="og:description" content="Bob the Coder began with the goal of providing an open community for coders. A community where all JavaScript problems, from the fundamentals to the advanced, are addressed and are freely available to everybody.🚀" />

					<meta property="twitter:card" content="summary_large_image" />
					<meta property="twitter:url" content="https://bobthecoder.org/" />
					<meta property="twitter:title" content="bobTheCoder - Exclusing JavaScript Community" />
					<meta property="twitter:description" content="Bob the Coder began with the goal of providing an open community for coders. A community where all JavaScript problems, from the fundamentals to the advanced, are addressed and are freely available to everybody.🚀" />
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
										We are a fast growing JS community with a goal of helping developers make most of the ecosystem.
									</p>
									<button className="btn btn-primary mt-4 px-5" onClick={this.openTelegram}>
										Join
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
							<p className="section-description">
								Didn't convince? Read what our members say about us
							</p>

							<div className="row mt-5">
								<div className="col-md-4 col-12">
									<div className="card teal-card">
										<ul>
											<li>We curate a short & important updates from JS ecosystem. Get to know whats happening in less than a minute.</li>
											<li>We create a very simple yet challenging JS quiz.</li>
											<li>Our deep connection with hottest startups brings in opportunity that helps you learn and earn well.</li>
										</ul>
									</div>
								</div>
								<div className="col-md-4 col-12">
									<div className="card yellow-card">
										<ul>
											<li>Daily JS updates</li>
											<li>Weekly JS quiz</li>
											<li>Job offers from hot startups</li>
										</ul>
									</div>
								</div>
								<div className="col-md-4 col-12">
									<div className="card orange-card">
										<ul>
											<li>Turpis lectus facilisi ut ut dignissim ipsum sapien in massa.</li>
											<li>Hendrerit vulputate nisl venenatis amet elementum, sapien, at malesuada praesent.</li>
											<li>Hendrerit vulputate nisl venenatis amet elementum, sapien, at malesuada praesent.</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* Daily Challange */}
					<section className="daily-challange">
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
					</section>

					{/* Blogs */}
					<section className="blogs">
						<div className="container">
							<h1 className="section-title">Our Blogs</h1>
							<div className="highlight" />

							<div className="blogs">
								<div className="row">
									{
										[1, 2, 3].map((i) => (
											<div className="col-md-4 col-12" key={i}>
												<div className="blog-card">
													<img src="https://source.unsplash.com/random" alt="Blog Title" />
													<h4 className="blog-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
													<p className="blog-description">
														Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo eaque sit adipisci animi temporibus veritatis omnis maxime dolor minus, saepe nesciunt alias commodi itaque fugit accusamus officia doloremque, eos quidem!
														<span className="read-more">more...</span>
													</p>
												</div>
											</div>
										))
									}
									<div className="col-12">
										<button className="btn btn-primary">READ MORE</button>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</PrimaryLayout>
		)
	}
}

export default HomePage as NextPage;
