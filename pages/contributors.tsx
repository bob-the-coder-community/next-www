import React from 'react';
import PrimaryLayout from '../components/layouts/PrimaryLayout';
import Image from 'next/image';

type Props = {};
type Founder = {
    url: string,
    title: string,
    description: string
}
type Contributor = {
    url: string,
    title: string
}
type State = {
    founders: Founder[],
    contributors: Contributor[]
};

class ContributorsPage extends React.PureComponent<Props, State> {
    state: Readonly<State> = {
        founders: [
            {
                url: "/../public/images/people/sanjay-achar.png",
                title: "Sanjay Achar",
                description: "Lorem ipsum dolor sit amet.",
            },
            {
                url: "/../public/images/people/sanjay-achar.png",
                title: "Pragathi Muthanna",
                description: "Lorem ipsum dolor sit amet.",
            },
            {
                url: "/../public/images/people/sanjay-achar.png",
                title: "Rachana K",
                description: "Lorem ipsum dolor sit amet.",
            },
            {
                url: "/../public/images/people/sanjay-achar.png",
                title: "Varun Om R",
                description: "Lorem ipsum dolor sit amet.",
            },
        ],
        contributors: [
            {
                url: "/../public/images/people/sanjay-achar.png",
                title: "Zuyufulla Manna",
            },
            {
                url: "/../public/images/people/sanjay-achar.png",
                title: "Ankit Jaiswal",
            },
            {
                url: "/../public/images/people/sanjay-achar.png",
                title: "Sanjana D",
            },
            {
                url: "/../public/images/people/sanjay-achar.png",
                title: "Rohit Gorai",
            },
            {
                url: "/../public/images/people/sanjay-achar.png",
                title: "Shamanth V Kumar",
            },
            {
                url: "/../public/images/people/sanjay-achar.png",
                title: "Saran Kumar",
            },
            {
                url: "/../public/images/people/sanjay-achar.png",
                title: "Monish M K",
            },
        ]
    }

    render(): JSX.Element {
        const {founders, contributors} = this.state
        return (
            <PrimaryLayout>
                <div className="contributors">
                    <div className="blob1"></div>
                    <div className="blob2"></div>
                    <div className="blob3"></div>
                    
                    <div className="container">
                        <h1 className="title display-1">Founders</h1>
                        <div className="foundersContainer row justify-content-xs-center">
                            {
                                founders.map( (founder, index): JSX.Element => {
                                    return (
                                        <div className="founderCard col-sm-6 col-lg-4" key={index}>
                                            <Image src={founder.url} alt="founderImage" width="400" height="400"/>
                                            <div className="founderTitle">{founder.title}</div>
                                            <div className="founderDesc">{founder.description}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="container">
                        <h1 className="title display-1">Contributors</h1>
                        <div className="contributorsContainer row justify-content-xs-center">
                            {
                                contributors.map( (contributor, index): JSX.Element => {
                                    return (
                                        <div className="contributorCard col-xs-12 col-sm-6 col-md-4 col-lg-3" key={index}>
                                            <Image src={contributor.url} alt="contributorImage" width="300" height="300"/>
                                            <h6 className="contributorTitle">{contributor.title}</h6>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </PrimaryLayout>
        )
    }   
}

export default ContributorsPage;
