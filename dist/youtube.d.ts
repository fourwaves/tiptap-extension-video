import { Node } from '@tiptap/core';
export interface YoutubeOptions {
    /**
     * Controls if the paste handler for youtube videos should be added.
     * @default true
     * @example false
     */
    addPasteHandler: boolean;
    /**
     * The HTML attributes for a youtube video node.
     * @default {}
     * @example { class: 'foo' }
     */
    HTMLAttributes: Record<string, any>;
    /**
     * The width of the youtube video.
     * @default 640
     * @example 1280
     */
    width: number;
    /**
     * The height of the youtube video.
     * @default 480
     * @example 720
     */
    height: number;
}
/**
 * The options for setting a youtube video.
 */
type SetYoutubeVideoOptions = {
    src: string;
    width?: number;
    height?: number;
};
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        youtube: {
            setYoutubeVideo: (options: SetYoutubeVideoOptions) => ReturnType;
        };
    }
}
export declare const Youtube: Node<YoutubeOptions, any>;
export {};
