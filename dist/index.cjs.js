'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@tiptap/core');

const YOUTUBE_REGEX = /^(https?:\/\/)?(www\.|music\.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(?!channel\/)(?!@)(.+)?$/;
const YOUTUBE_REGEX_GLOBAL = /^(https?:\/\/)?(www\.|music\.)?(youtube\.com|youtu\.be)\/(?!channel\/)(?!@)(.+)?$/g;
const VIMEO_REGEX = /^(https?:\/\/)?(www\.)?(vimeo\.com\/\d+|player\.vimeo\.com\/video\/\d+)(\/?.*)?$/;
const VIMEO_REGEX_GLOBAL = /^(https?:\/\/)?(www\.)?(vimeo\.com\/\d+|player\.vimeo\.com\/video\/\d+)(\/?.*)?$/g;
const isValidYoutubeUrl = (url) => {
    if (!url)
        return false;
    return url.match(YOUTUBE_REGEX);
};
const isValidVimeoUrl = (url) => {
    if (!url)
        return false;
    return url.match(VIMEO_REGEX);
};
const getEmbedUrlFromYoutubeUrl = (url) => {
    if (!isValidYoutubeUrl(url))
        return null;
    // if is already an embed url, return it
    if (url.includes('/embed/'))
        return url;
    // if is a youtu.be url, get the id after the /
    if (url.includes('youtu.be')) {
        const id = url.split('/').pop();
        if (!id)
            return null;
        return `https://www.youtube.com/embed/${id}`;
    }
    const videoIdRegex = /(?:v=|shorts\/)([-\w]+)/gm;
    const matches = videoIdRegex.exec(url);
    if (!matches || !matches[1])
        return null;
    return `https://www.youtube.com/embed/${matches[1]}`;
};
const getEmbedUrlFromVimeoUrl = (url) => {
    if (!isValidVimeoUrl(url))
        return null;
    const videoIdRegex = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/;
    const matches = videoIdRegex.exec(url);
    if (!matches || !matches[1])
        return null;
    return `https://player.vimeo.com/video/${matches[1]}`;
};

const Vimeo = core.Node.create({
    name: 'vimeo',
    group: 'block',
    draggable: true,
    addOptions() {
        return {
            addPasteHandler: true,
            HTMLAttributes: {},
            width: 640,
            height: 480,
        };
    },
    addAttributes() {
        return {
            src: { default: null },
            width: { default: this.options.width },
            height: { default: this.options.height },
        };
    },
    parseHTML() {
        return [{ tag: 'div[data-vimeo-video] iframe' }];
    },
    addCommands() {
        return {
            setVimeoVideo: (options) => ({ commands }) => {
                if (!isValidVimeoUrl(options.src))
                    return false;
                return commands.insertContent({
                    type: this.name,
                    attrs: options,
                });
            },
        };
    },
    addPasteRules() {
        if (!this.options.addPasteHandler)
            return [];
        return [
            core.nodePasteRule({
                find: VIMEO_REGEX_GLOBAL,
                type: this.type,
                getAttributes: (match) => ({ src: match.input }),
            }),
        ];
    },
    renderHTML({ HTMLAttributes }) {
        const embedUrl = getEmbedUrlFromVimeoUrl(HTMLAttributes.src);
        HTMLAttributes.src = embedUrl;
        return [
            'div',
            {
                'data-vimeo-video': '',
                style: 'padding:56.25% 0 0 0; position:relative;',
            },
            [
                'iframe',
                core.mergeAttributes(this.options.HTMLAttributes, {
                    src: embedUrl,
                    frameborder: '0',
                    width: this.options.width,
                    height: this.options.height,
                    allow: 'autoplay; fullscreen; picture-in-picture; clipboard-write',
                    style: 'position:absolute; top:0; left:0; width:100%; height:100%;',
                }, HTMLAttributes),
            ],
        ];
    },
});

const Youtube = core.Node.create({
    name: 'youtube',
    group: 'block',
    draggable: true,
    addOptions() {
        return {
            addPasteHandler: true,
            HTMLAttributes: {},
            width: 640,
            height: 480,
        };
    },
    addAttributes() {
        return {
            src: { default: null },
            width: { default: this.options.width },
            height: { default: this.options.height },
        };
    },
    parseHTML() {
        return [{ tag: 'div[data-youtube-video] iframe' }];
    },
    addCommands() {
        return {
            setYoutubeVideo: (options) => ({ commands }) => {
                if (!isValidYoutubeUrl(options.src))
                    return false;
                return commands.insertContent({
                    type: this.name,
                    attrs: options,
                });
            },
        };
    },
    addPasteRules() {
        if (!this.options.addPasteHandler)
            return [];
        return [
            core.nodePasteRule({
                find: YOUTUBE_REGEX_GLOBAL,
                type: this.type,
                getAttributes: (match) => ({ src: match.input }),
            }),
        ];
    },
    renderHTML({ HTMLAttributes }) {
        const embedUrl = getEmbedUrlFromYoutubeUrl(HTMLAttributes.src);
        HTMLAttributes.src = embedUrl;
        return [
            'div',
            {
                'data-youtube-video': '',
                style: 'padding:56.25% 0 0 0; position:relative;',
            },
            [
                'iframe',
                core.mergeAttributes(this.options.HTMLAttributes, {
                    src: embedUrl,
                    frameborder: '0',
                    allowfullscreen: '',
                    width: this.options.width,
                    height: this.options.height,
                    allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
                    style: 'position:absolute; top:0; left:0; width:100%; height:100%;',
                }, HTMLAttributes),
            ],
        ];
    },
});

var index = [Vimeo, Youtube];

exports.Vimeo = Vimeo;
exports.Youtube = Youtube;
exports.default = index;
//# sourceMappingURL=index.cjs.js.map
