import React from 'react';
import Link from 'next/link';

type Props = {
    image: string;
    name: string;
    about: string;
    position: string;
};

class TeamComponent extends React.PureComponent<Props> {
    render(): JSX.Element {
        const { name, image, about, position } = this.props;

        return (
            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                <div className="team-member d-flex flex-row">
                    <img src={image} alt={name} />
                    <div className="content d-flex flex-column h-100">
                        <h6>{name}</h6>
                        <small>{position}</small>
                        <p>{about}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default TeamComponent;
