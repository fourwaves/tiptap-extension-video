export declare const YOUTUBE_REGEX: RegExp;
export declare const YOUTUBE_REGEX_GLOBAL: RegExp;
export declare const VIMEO_REGEX: RegExp;
export declare const VIMEO_REGEX_GLOBAL: RegExp;
export declare const isValidYoutubeUrl: (url: string) => false | RegExpMatchArray;
export declare const isValidVimeoUrl: (url: string) => false | RegExpMatchArray;
export declare const getEmbedUrlFromYoutubeUrl: (url: string) => string;
export declare const getEmbedUrlFromVimeoUrl: (url: string) => string;
