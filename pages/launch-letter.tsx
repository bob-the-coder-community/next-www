import React from 'react';
import Head from 'next/head';
import PrimaryLayout from '../components/layouts/PrimaryLayout';

type Props = {};

class LaunchLetter extends React.PureComponent<Props> {
    render(): JSX.Element {
        return (
            <PrimaryLayout>
				<Head>
					<title>🚀 Launch Letter - bobTheCoder.org</title>
					<meta name="title" content="🚀 Launch Letter - bobTheCoder" />

					<meta property="og:type" content="website" />
					<meta property="og:url" content="https://bobthecoder.org/launch-letter" />
					<meta property="og:title" content="🚀 Launch Letter - bobTheCoder" />

					<meta property="twitter:card" content="summary_large_image" />
					<meta property="twitter:url" content="https://bobthecoder.org/launch-letter" />
					<meta property="twitter:title" content="🚀 Launch Letter - bobTheCoder" />
				</Head>
                                
                <section className="launch-letter-page">
                    <div className="green-box" />
                    <div className="container">
                        <h1 className="page-title">🎉 Launch Letter</h1>
                        <p>
                            Did you know that ‘undefined’ is not a reserved keyword in JavaScript? Well, there are probably a few thousand other facts you know or don’t. But hello there!
                        </p>
                        <p>
                            We are more than elated to see you in this new community!!
                        </p>
                        <p>
                            This is a space for all developers - big and small who work with Javascript or aspiring to learn, grow, ask questions, stay updated, and upskill!
                        </p>
                        <p>
                            JavaScript is possibly the most important programming language in the world. Common examples of JavaScript that you might use every day include the search box on Amazon, a news recap video embedded on The Economic Times, or refreshing your Twitter feed.
                        </p>
                        <p>
                            The first version of JavaScript was called Mocha. Shortly after the Mocha prototype was introduced in Netscape Communicator (May 1995), it was renamed LiveScript. It was then renamed JavaScript. Marc Andreessen’s founder wanted to make the web more dynamic by making animations and user interaction. He wanted to make Netscape Communicator more attractive to developers by equipping it with an enterprise-level coding language (Java) and a smaller scripting language (JavaScript). Although the initial plan was to add interactivity, today, it has evolved into helping build mobile apps and high-performance servers.
                        </p>
                        <p>
                            This community aims at bringing developers together, help one another explore javascript, answer questions, and make resources available to anyone and everyone without discriminating based on purchasing capacity or any other grounds. We also aim to put out blogs and articles about the latest happenings in the javascript space to ensure everyone is running with the latest trends and happenings.
                        </p>
                        <p>
                            Knowhere Studio, an innovative technology start-up studio is heavily dependent on JavaScript for its development needs. They embrace jam stack and the goal is to fuel entrepreneurs' dreams in a modern way to build websites and apps that deliver well.
                        </p>
                        <p>
                            What’s more!? We hope to be launching android and apple apps for the community in a while. Although we’re new, stay assured, the people behind the face of the community are people who’ve been on the field for a long time now and have extensive knowledge about Javascript and its nuances!
                        </p>
                        <div className="d-flex">
                            <div className="person">
                                <img src="/images/people/sanjay-achar.jpg" alt="Sanjay Achar" className="picture" />
                                <h1>Sanjay Achar</h1>
                                <p>Founder</p>
                            </div>
                            <div className="person">
                                <img src="/images/people/pragathi-muthanna.jpg" alt="Pragathi Muthanna" className="picture" />
                                <h1>Pragathi Muthanna</h1>
                                <p>Community Manager</p>
                            </div>                            
                        </div>
                    </div>
                </section>
            </PrimaryLayout>
        )
    }
}

export default LaunchLetter;
