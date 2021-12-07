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
                title: "Lorem ipsum dolor sit amet.",
                description: "Lorem ipsum dolor sit amet.",
            },
            {
                url: "/../public/images/people/sanjay-achar.png",
                title: "Lorem ipsum dolor sit amet.",
                description: "Lorem ipsum dolor sit amet.",
            },
            {
                url: "/../public/images/people/sanjay-achar.png",
                title: "Lorem ipsum dolor sit amet.",
                description: "Lorem ipsum dolor sit amet.",
            },
            {
                url: "/../public/images/people/sanjay-achar.png",
                title: "Lorem ipsum dolor sit amet.",
                description: "Lorem ipsum dolor sit amet.",
            },
            {
                url: "/../public/images/people/sanjay-achar.png",
                title: "Lorem ipsum dolor sit amet.",
                description: "Lorem ipsum dolor sit amet.",
            },
        ],
        contributors: [
            {
                url: "/../public/images/people/sanjay-achar.png",
                title: "Lorem ipsum dolor sit amet.",
            },
            {
                url: "/../public/images/people/sanjay-achar.png",
                title: "Lorem ipsum dolor sit amet.",
            },
            {
                url: "/../public/images/people/sanjay-achar.png",
                title: "Lorem ipsum dolor sit amet.",
            },
            {
                url: "/../public/images/people/sanjay-achar.png",
                title: "Lorem ipsum dolor sit amet.",
            },
            {
                url: "/../public/images/people/sanjay-achar.png",
                title: "Lorem ipsum dolor sit amet.",
            },
            {
                url: "/../public/images/people/sanjay-achar.png",
                title: "Lorem ipsum dolor sit amet.",
            },
            {
                url: "/../public/images/people/sanjay-achar.png",
                title: "Lorem ipsum dolor sit amet.",
            },
            {
                url: "/../public/images/people/sanjay-achar.png",
                title: "Lorem ipsum dolor sit amet.",
            },
            {
                url: "/../public/images/people/sanjay-achar.png",
                title: "Lorem ipsum dolor sit amet.",
            },
            {
                url: "/../public/images/people/sanjay-achar.png",
                title: "Lorem ipsum dolor sit amet.",
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
                        <h1 className="title">Founders</h1>
                        <div className="foundersContainer">
                            {
                                founders.map( (founder, index): JSX.Element => {
                                    return (
                                        <div className="founderCard" key={index}>
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
                        <h1 className="title">Contributors</h1>
                        <div className="contributorsContainer">
                            {
                                contributors.map( (contributor, index): JSX.Element => {
                                    return (
                                        <div className="contributorCard" key={index}>
                                            <Image src={contributor.url} alt="contributorImage" width="300" height="300"/>
                                            <div className="contributorTitle">{contributor.title}</div>
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
