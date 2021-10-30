export interface Blogs {
    _id:         string;
    Link:        string;
    Title:       string;
    Description: string;
    createdAt:   Date;
    updatedAt:   Date;
    __v:         number;
    Thumbanil:   Thumbanil;
    id:          string;
}

export interface Thumbanil {
    _id:             string;
    name:            string;
    alternativeText: string;
    caption:         string;
    hash:            string;
    ext:             EXT;
    mime:            MIME;
    size:            number;
    width:           number;
    height:          number;
    url:             string;
    formats:         Formats;
    provider:        string;
    related:         string[];
    createdAt:       Date;
    updatedAt:       Date;
    __v:             number;
    id:              string;
}

export enum EXT {
    PNG = ".png",
}

export interface Formats {
    thumbnail: Large;
    large:     Large;
    medium:    Large;
    small:     Large;
}

export interface Large {
    name:   string;
    hash:   string;
    ext:    EXT;
    mime:   MIME;
    width:  number;
    height: number;
    size:   number;
    path:   null;
    url:    string;
}

export enum MIME {
    ImagePNG = "image/png",
}
