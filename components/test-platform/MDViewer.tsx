import React from 'react';
import { markdown } from '../../services/markdown';

type Props = {
    text: string;
};

class MarkdownViewer extends React.PureComponent<Props> {
    render(): React.ReactNode {
        const { text } = this.props;
        const toHTML: string = markdown.parse(text);

        return (
            <div
                className="test-content p-2 markdown-body"
                dangerouslySetInnerHTML={{
                    __html: toHTML
                }}
            />
        )
    }
}

export default MarkdownViewer;