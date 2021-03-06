import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import NavbarComponent from '../components/shared/Navbar';
import TeamComponent from '../components/Team';

type Props = {};

class HomePage extends React.PureComponent<Props> {
	render(): JSX.Element {
		const Team: {
			name: string;
			position: string;
			email: string;
			about: string;
			image: string;
		}[] = [
				{ name: 'Jasmine Kaur', position: 'Lead - Talent Acquisition', email: 'jasmin@bobthecoder.org', image: '/images/people/jasmine-kaur.png', about: 'I lead entire talent acquisitions and hiring process for our customers.' },
				{ name: 'Dr. Akriti Pradhan', position: 'In-house Consultant', email: 'akriti@bobthecoder.org', image: '/images/people/akriti-pradhan.jpg', about: 'I bring in medicial expertise into data science. I lead a stealth healthcare project.' },
				{ name: 'Dr. Priyanka Nath', position: 'Content Producer', email: 'priyanka@bobthecoder.org', image: '/images/people/priyanka-nath.png', about: 'Everything is content. I am producing content for an upcoming project.' },
				{ name: 'Rhythm Bhatia', position: 'Talent Acquisition', email: 'rhythm@bobthecoder.org', image: '/images/people/rhythm-bhatia.jpg', about: 'Communication is the key. I make sure they are on-time, accurate and actionable.' },
			];

		const hire = (): void => {
			window.open('mailto:hire@bobthecoder.org', '_black');
			return;
		}

		return (
			<div className="landing-page">
				<Head>
					<title>bobTheCoder.org - Hire your dream engineering team</title>
					<meta name="title" content="bobTheCoder.org - Hire your dream engineering team" />
					<meta name="description" content="We have sourced silicon valley calibre engineers in India to work on some of the cutting-edge technologies" />

					<meta property="og:type" content="website" />
					<meta property="og:url" content="https://bobthecoder.org/" />
					<meta property="og:title" content="bobTheCoder.org - Hire your dream engineering team" />
					<meta property="og:description" content="We have sourced silicon valley calibre engineers in India to work on some of the cutting-edge technologies" />

					<meta property="twitter:card" content="summary_large_image" />
					<meta property="twitter:url" content="https://bobthecoder.org/" />
					<meta property="twitter:title" content="bobTheCoder.org - Hire your dream engineering team" />
					<meta property="twitter:description" content="We have sourced silicon valley calibre engineers in India to work on some of the cutting-edge technologies" />
				</Head>

				<main>
					<NavbarComponent />
					<section id="home">
						<div className="hero-section">
							<div className="container h-100">
								<div className="d-flex flex-column justify-content-center align-items-center hero-content">
									<h1>Hiring your dream engineering team shouldn't be hard.</h1>
									<p>Are you looking for silicon-valley caliber software engineers in India? Our team can help you find the best of them!</p>
									<button className="btn btn-light" onClick={hire}>
										Hire Developers.
									</button>
									<p>
										Looking for job?
										{' '}
										<a href="mailto:candidates@bobthecoder.org">
											click here
										</a>
									</p>
								</div>
							</div>
						</div>
						<div className="clients">
							<div className="container">
								<h6>These companies trust us to hire best software engineers.</h6>
								<img src="/images/clients.png" alt="Clients" />
							</div>
						</div>
					</section>
					<section id="about">
						<div className="container">
							<div className="d-flex flex-row align-items-center justify-content-between">
								<div className="content flex-fill mr-2">
									<h3>We are not a typical recruitment agency.</h3>
									<p>bobTheCoder only works with high-caliber software engineers who push boundaries in engineering. Some of the engineers we work with are building compilers, runtimes, or shipping high performant web assembly products to thousands of users.</p>
									<p>Our matching procedure is more than if/else. Once matched, candidates will go through a live coding interview with one of our interviewers.</p>
									<p>Typically, we jot down 50 software engineers for a single position. The competition is fierceful</p>
								</div>
								<div className="illustration flex-fill d-none d-lg-block">
									<img src="/images/about-illustration.png" alt="About us" />
								</div>
							</div>
						</div>
					</section>
					<section id="team">
						<div className="container">
							<h1>We are a small team, by design!</h1>
							<div className="row mt-5">
								{
									Team.map((team) => <TeamComponent {...team} key={team.email} />)
								}
							</div>
							<h4>
								Do you have a problem in mind? Let's solve it together!
								{' '}
								Write to
								{' '}
								<a href="mailto:careers@bobthecoder.org">careers@bobthecoder.org</a>
							</h4>
						</div>
					</section>
					<section id="footer">
						<div className="container">
							<h1>???? Links</h1>
							<div className="links">
								<ul>
									{
										[
											{ name: 'GitHub', link: 'https://github.com/bob-the-coder-community', description: 'We believe in open-source. Currently, all our source code is available on GitHub for free' },
											{ name: 'LinkedIn', link: 'https://www.linkedin.com/company/bob-the-coder', description: 'We will start posting company updates, you should definitely follow us' },
											{ name: 'Telegram', link: 'https://join.bobthecoder.org', description: 'There is a 100+ developers community hidden in telegram! Join us now' },
										].map((link) => (
											<li key={link.link}>
												<Link passHref href={link.link}>
													<a target="_blank">
														<h4>
															- {link.name}
															<small>{link.description}</small>
														</h4>
													</a>
												</Link>
											</li>
										))
									}
								</ul>
							</div>
							<p>
								?? 2022 bobTheCoder. All rights reserved.
							</p>							
						</div>
					</section>
				</main>
			</div>
		)
	}
}

export default HomePage;
