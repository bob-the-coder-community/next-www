import showdown from 'showdown';
import highlighter from 'showdown-highlight';

const parser = new showdown.Converter({
    extensions: [highlighter({
        pre: true,
    })],
});

function decode(str: string): string {
    return parser.makeHtml(str);
}

export {
    decode
}