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
				{ name: 'Jasmine Kaur', position: 'Lead - Talent Acquisition', email: 'jasmin@bobthecoder.org', image: '/images/people/jasmine-kaur.png', about: 'Leading talents acquisition team and helping companies hire better engineers' },
				{ name: 'Dr. Akriti Pradhan', position: 'In-house Consultant', email: 'akriti@bobthecoder.org', image: '/images/people/akriti-pradhan.png', about: 'Leading a stealth healthcare based big data project.' },
				{ name: 'Dr. Priyanka Nath', position: 'Content Producer', email: 'priyanka@bobthecoder.org', image: '/images/people/priyanka-nath.png', about: 'Leading a stealth content production project.' },
				{ name: 'Rhythm Bhatia', position: 'Talent Acquisition', email: 'rhythm@bobthecoder.org', image: '/images/people/rhythm-bhatia.png', about: 'Leading talents and recruiters communications.' },
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
									<p>We have sourced silicon valley calibre engineers in India to work on some of the cutting-edge technologies</p>
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
								<h6>These companies trust us to hire best software engineers</h6>
								<img src="/images/clients.png" alt="Clients" />
							</div>
						</div>
					</section>
					<section id="about">
						<div className="container">
							<div className="d-flex flex-row align-items-center justify-content-between">
								<div className="content flex-fill mr-2">
									<h3>We are not a typical recuritment agency.</h3>
									<p>We do not match candidate and company on as is basis. Our matching criteria is tougher and stricter than many dating apps. </p>
									<p>Once matched, the candidates must go through a unique selection process to prove the right fit for your needs.</p>
									<p>We generally interact with 100+ engineers for a single position, and share upto 5 profiles for further processing by your team</p>
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
								Do you have a problem in mind? Let's solve together!
								{' '}
								Write to
								{' '}
								<a href="mailto:careers@bobthecoder.org">careers@bobthecoder.org</a>
							</h4>
						</div>
					</section>
					<section id="footer">
						<div className="container">
							<h1>🚀 Links</h1>
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
								© 2022 bobTheCoder. All rights reserved.
							</p>							
						</div>
					</section>
				</main>
			</div>
		)
	}
}

export default HomePage;
