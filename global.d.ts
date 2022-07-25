declare global {
    interface Window {
        plausible: string; // error RIP
    }
}

declare module '@sanity/block-content-to-markdown';