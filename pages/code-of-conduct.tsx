import Head from 'next/head';
import React from 'react';
import PrimaryLayout from '../components/layouts/PrimaryLayout';

type Props = {};

class CodeOfConductPage extends React.PureComponent<Props> {
    render(): JSX.Element {
        return (
            <PrimaryLayout>
				<Head>
					<title>Code of Conduct - bobTheCoder.org</title>
					<meta name="title" content="Code of Conduct - bobTheCoder.org" />

					<meta property="og:type" content="website" />
					<meta property="og:url" content="https://bobthecoder.org/code-of-conduct" />
					<meta property="og:title" content="Code of Conduct - bobTheCoder.org" />

					<meta property="twitter:card" content="summary_large_image" />
					<meta property="twitter:url" content="https://bobthecoder.org/code-of-conduct" />
					<meta property="twitter:title" content="Code of Conduct - bobTheCoder.org" />
				</Head>
                                
                <div className="container">
                    <div className="code-of-conduct-page">
                        <div className="yellow-box" />
                        <h1 className="page-title">Code of Conduct</h1>
                        <p>
                            bobTheCoder is a friendly place to learn to code. We’re committed to keeping it that way.
                        </p>
                        <p>
                            By using bobTheCoder, you agree that you'll follow this code of conduct.
                        </p>
                        <p>
                            In short: Be nice. No harassment, trolling, or spamming.
                            <ul>
                                <li>
                                    <strong>Harassment</strong> includes sexual language and imagery, deliberate intimidation, stalking, name-calling, unwelcome attention, libel, and any malicious hacking or social engineering. bobTheCoder should be a harassment-free experience for everyone, regardless of gender, gender identity and expression, age, sexual orientation, disability, physical appearance, body size, race, national origin, or religion (or lack thereof).
                                </li>
                                <li>
                                    <strong>Trolling</strong> includes posting inflammatory comments to provoke an emotional response or disrupt discussions.
                                </li>
                                <li>
                                    <strong>Spamming</strong> includes posting off-topic messages to disrupt discussions, promote a product, solicit donations, advertise a job / internship / gig, or flooding discussions with files or text.
                                </li>
                            </ul>
                        </p>
                        <p>
                            If you see someone harass, troll, or spam anywhere in the bobTheCoder community (forum, chat, YouTube, etc.), notify us by email <a href="mailto:abuse@bobthecoder.org">abuse@bobthecoder.org</a> – preferably with a screen shot and URL of the offense. The moderator team will take any action we deem appropriate, up to and including banning the offender from bobTheCoder.
                        </p>
                        <p>
                            <small>
                                <i>
                                    Inspired from
                                    {' '}
                                    <a href="https://www.freecodecamp.org/news/code-of-conduct/" target="_blank">
                                        freeCodeCamp
                                    </a>
                                </i>
                            </small>
                        </p>
                    </div>
                </div>
            </PrimaryLayout>
        )
    }
}

export default CodeOfConductPage;
