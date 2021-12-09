const read = require('fs-readdir-recursive');
const { SitemapStream, streamToPromise } = require('sitemap')
const fs = require('fs');

const files = read('./pages', (path) => {
    /** NextJS document files */
    if (path.startsWith('_')) {
        return false;
    }

    /** NextJS API directory */
    if (path.startsWith('api')) {
        return false;
    }

    /** NextJS Dynamic path */
    /** @todo */
    if (path.indexOf('[') > -1 && path.indexOf(']') > -1) {
        return false;
    }

    return true;
});


/** Sitemap Stream */
const sitemap = new SitemapStream({
    hostname: 'https://bobthecoder.org',
});

files.forEach((file) => {
    /** Rewriting index to / */
    file = file.indexOf('index') > -1 ? file.replace('index', '') : file;

    sitemap.write({
        url: file.replace('.tsx', ''),
        changefreq: 'daily',
        priority: 0.3,
    });
});

sitemap.end();
streamToPromise(sitemap).then((data) => {
    fs.writeFileSync('./public/sitemap.xml', data.toString());
    console.log('💫 SITEMAP GENRATED');
    process.exit(0);
}).catch((err) => {
    throw new Error(err);
});

