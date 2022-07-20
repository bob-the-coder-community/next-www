import sanityClient from '@sanity/client';
import dayjs from 'dayjs';

const client = new sanityClient({
    projectId: 'qutmmqvp',
    dataset: 'production',
    apiVersion: dayjs().format('YYYY-MM-DD'),
    token: process.env.SANITY_API_KEY,
    useCdn: false,
});

const Sanity = {
    Query: async (query: string) => {
        try {
            const result = await client.fetch(query, {});
            return Promise.resolve(result);
        } catch (err) {
            return Promise.reject(err);
        }
    }
}

export {
    Sanity,
}