import React from 'react';

type Props = {
    text: string;
};

class MarkdownViewer extends React.PureComponent<Props> {
    render(): JSX.Element {
        const { text } = this.props;

        return (
            <div
                className="test-content p-2 markdown-body"
                dangerouslySetInnerHTML={{
                    __html: text
                }}
            />
        )
    }
}

export default MarkdownViewer;