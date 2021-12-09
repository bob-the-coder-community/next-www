import React from 'react';
import PrimaryLayout from '../components/layouts/PrimaryLayout';
import Head from 'next/head';

const Members: {
    founders: {
        title: string;
        description: string;
        url: string;
    }[];
    others: {
        title: string;
        url: string;
    }[];
} = {
    founders: [
        {
            url: "/images/people/sanjay-achar.png",
            title: "Sanjay Achar",
            description: "Founder",
        },
        {
            url: "/images/people/pragathi-muthanna.png",
            title: "Pragathi Muthanna",
            description: "Founding Partner",
        },      
    ],
    others: [
        {
            url: "/images/people/rachana-kn.png",
            title: "Rachana KN",
        },
        {
            url: "/images/people/om-varun-r.png",
            title: "Varun Om R",
        },          
        {
            url: "/images/people/zuyufulla-manna.png",
            title: "Zuyufulla Manna",
        },
        {
            url: "/images/people/ankit-jaiswal.png",
            title: "Ankit Jaiswal",
        },
        {
            url: "/images/people/sanjana-d.png",
            title: "Sanjana D",
        },
        {
            url: "/images/people/rohit-gorai.png",
            title: "Rohit Gorai",
        },
        {
            url: "/images/people/shamanth-kumar.png",
            title: "Shamanth V Kumar",
        },
        {
            url: "/images/placeholder-image.png",
            title: "Saran Kumar",
        },
        {
            url: "/images/placeholder-image.png",
            title: "Monish M K",
        },        
    ]
};

type Props = {};
type State = {};

class ContributorsPage extends React.PureComponent<Props, State> {
    render(): JSX.Element {
        const { founders, others } = Members;
        return (
            <PrimaryLayout>
				<Head>
					<title>Contributors - bobTheCoder.org</title>
					<meta name="title" content="Contributors - bobTheCoder.org" />
					<meta name="description" content="Look who is contributing to bobTheCoder.org" />

					<meta property="og:type" content="website" />
					<meta property="og:url" content="https://bobthecoder.org/contributors" />
					<meta property="og:title" content="Contributors - bobTheCoder.org" />
					<meta property="og:description" content="Look who is contributing to bobTheCoder.org" />

					<meta property="twitter:card" content="summary_large_image" />
					<meta property="twitter:url" content="https://bobthecoder.org/contributors" />
					<meta property="twitter:title" content="Contributors - bobTheCoder.org" />
					<meta property="twitter:description" content="Look who is contributing to bobTheCoder.org" />
				</Head>

                <div className="contributors">
                    <div className="container">
                        <div className="radial-gradient" />

                        <div className="core-members">
                            <h1 className="title">Founders</h1>
                            <div className="row">
                                {
                                    founders.map((person, index) => (
                                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 person-card" key={index}>
                                            <img src={person.url} alt={person.title} className="founder-image" />
                                            <h4 className="founder-name">{person.title}</h4>
                                            <small className="text-muted">{person.description}</small>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="core-members other-contributors">
                            <h1 className="title">Contributors</h1>
                            <div className="row">
                                {
                                    others.map((person, index) => (
                                        <div className="col-lg-2 col-md-3 col-sm-4 col-6 person-card" key={index}>
                                            <img src={person.url} alt={person.title} className="founder-image" />
                                            <h4 className="contributor-name">{person.title}</h4>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>                        
                    </div>
                </div>
            </PrimaryLayout>
        )
    }   
}

export default ContributorsPage;
