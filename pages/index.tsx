import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
				</div>
			</PrimaryLayout>
		)
	}
}

export default HomePage as NextPage;
