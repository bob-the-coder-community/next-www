import showdown from 'showdown';
import highlighter from 'showdown-highlight';
import fromSanityBlockToMarkdown from '@sanity/block-content-to-markdown';

const parser = new showdown.Converter({
    extensions: [highlighter({
        pre: true,
    })],
});

function parse(str: string): string {
    return parser.makeHtml(str);
}

function fromSanityBlock(content: any[]): string {
    const serializers = {
        types: {
            code: (props: { node: { language: string; code: string; }; }) => '```' + props.node.language + '\n' + props.node.code + '\n```'
        }
    }

    return parse(fromSanityBlockToMarkdown(content, serializers));
}

export const markdown = {
    parse,
    fromSanityBlock
}