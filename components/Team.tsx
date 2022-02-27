import React from 'react';
import Link from 'next/link';

type Props = {
    image: string;
    name: string;
    email: string;
    about: string;
};

class TeamComponent extends React.PureComponent<Props> {
    render(): React.ReactNode {
        const { name, email, image, about } = this.props;

        return (
            <div className="team-member d-flex flex-sm-row flex-column align-items-center">
                <img src={image} alt={name} />
                <div className="information">
                    <h4>{name}</h4>
                    <p>{about}</p>
                    <Link passHref href={`mailto:${email}`}>
                        <a target="_blank" className="mt-auto">-&gt; talk to me here</a>
                    </Link>
                </div>
            </div>
        )
    }
}

export default TeamComponent;
