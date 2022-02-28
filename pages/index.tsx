import React from 'react';
import TeamComponent from '../components/Team';
import Link from 'next/link';
import Head from 'next/head';

type Props = {};

class HomePage extends React.PureComponent<Props> {
	render(): JSX.Element {
		const Team: {
			name: string;
			email: string;
			about: string;
			image: string;
		}[] = [
				{ name: 'Sanjay Achar', email: 'sanjay@bobthecoder.org', image: '/images/people/sanjay-achar.png', about: 'Founder Knowhere Studio. Currently working as Senior Software Engineer.' },
				{ name: 'Jasmine Kaur', email: 'jasmine@bobthecoder.org', image: '/images/people/jasmine-kaur.png', about: 'An MBA student, currently helping companies find right talents' },
				{ name: 'Khushi Tomar', email: 'khushi@bobthecoder.org', image: '/images/people/khushi-tomar.png', about: 'UI/UX design intern. Currently working on bobTheCoder design system' },
			];

		return (
			<div className="landing-page bg-dark h-100">
				<Head>
					<title>bobTheCoder.org - Solving Developers Pain</title>
					<meta name="title" content="bobTheCoder.org - Solving Developers Pain" />
					<meta name="description" content="bobTheCoder - is a community-driven platform trying to solve real-time problems of developers and start-ups. We are currently in alpha stage experimenting platform market-fit" />

					<meta property="og:type" content="website" />
					<meta property="og:url" content="https://bobthecoder.org/" />
					<meta property="og:title" content="bobTheCoder.org - Solving Developers Pain" />
					<meta property="og:description" content="bobTheCoder - is a community-driven platform trying to solve real-time problems of developers and start-ups. We are currently in alpha stage experimenting platform market-fit" />

					<meta property="twitter:card" content="summary_large_image" />
					<meta property="twitter:url" content="https://bobthecoder.org/" />
					<meta property="twitter:title" content="bobTheCoder.org - Solving Developers Pain" />
					<meta property="twitter:description" content="bobTheCoder - is a community-driven platform trying to solve real-time problems of developers and start-ups. We are currently in alpha stage experimenting platform market-fit" />
				</Head>
				
				<div className="content-container">
					{/* Letter */}
					<section className="letter">
						<h1>Hello,</h1>
						<p>
							We failed (😳 disastrously!...) scaling up
							{' '}
							<span className="highlight">
								Knowhere Studio
							</span>
							{' '}
							, and now we are committed to solve problem that led to our failure
						</p>
						<p>
							<span className="highlight">
								bobTheCoder
							</span>
							{' '}
							is a community-driven platform trying to solve real-time problems of
							developers and start-ups. We are currently in alpha stage
							experimenting platform market-fit
						</p>
						<p>
							We are currently working with
							{' '}
							<span className="highlight">
								100+ developers
							</span>
							{' '}
							and
							{' '}
							<span className="highlight">
								a few start-ups
							</span>
						</p>
						<p>
							Our focus is currently on
							{' '}
							<span className="highlight">
								enhancing learning experience
							</span>
							{' '}
							for developers, and help companies
							{' '}
							<span className="highlight">
								discover talents
							</span>
						</p>
					</section>

					{/* Team */}
					<section className="team">
						<h2>#Team</h2>
						<div className="teammates">
							<div className="row">
								{
									Team.map((member, index) => (
										<div className={`col-md-6 col-12 ${ index > 1 && 'mt-5' }`} key={member.email}>
											<TeamComponent {...member} />
										</div>
									))
								}

								<div className="col-12 mt-5">
									<h6 className="mt-2">
										Do you want to help us solve challenges? Drop your resume
										{' '}
										<Link passHref href={'mailto:solve@bobthecoder.org'}>
											<a target="_blank">
												solve@bobthecoder.org
											</a>
										</Link>
									</h6>
								</div>
							</div>
						</div>
					</section>

					{/* Links */}
					<section className="links">
						<h2>🚀 Links</h2>
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
													-&gt; {link.name}
													<small>{link.description}</small>
												</h4>
											</a>
										</Link>
									</li>
								))
							}
						</ul>
					</section>

					<footer>
						<p>© 2022 bobTheCoder. All rights reserved.</p>
					</footer>
				</div>
			</div>
		)
	}
}

export default HomePage;
