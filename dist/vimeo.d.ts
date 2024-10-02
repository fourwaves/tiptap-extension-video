import { Node } from '@tiptap/core';
export interface VimeoOptions {
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
type SetVimeoVideoOptions = {
    src: string;
    width?: number;
    height?: number;
};
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        vimeo: {
            setVimeoVideo: (options: SetVimeoVideoOptions) => ReturnType;
        };
    }
}
export declare const Vimeo: Node<VimeoOptions, any>;
export {};
