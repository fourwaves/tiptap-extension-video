export const YOUTUBE_REGEX =
  /^(https?:\/\/)?(www\.|music\.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(?!channel\/)(?!@)(.+)?$/;
export const YOUTUBE_REGEX_GLOBAL =
  /^(https?:\/\/)?(www\.|music\.)?(youtube\.com|youtu\.be)\/(?!channel\/)(?!@)(.+)?$/g;

export const VIMEO_REGEX = /^(https?:\/\/)?(www\.)?(vimeo\.com\/\d+|player\.vimeo\.com\/video\/\d+)(\/?.*)?$/;
export const VIMEO_REGEX_GLOBAL = /^(https?:\/\/)?(www\.)?(vimeo\.com\/\d+|player\.vimeo\.com\/video\/\d+)(\/?.*)?$/g;

export const isValidYoutubeUrl = (url: string) => {
  return url.match(YOUTUBE_REGEX);
};

export const isValidVimeoUrl = (url: string) => {
  return url.match(VIMEO_REGEX);
};

export const getEmbedUrlFromYoutubeUrl = (url: string) => {
  if (!isValidYoutubeUrl(url)) return null;

  // if is already an embed url, return it
  if (url.includes('/embed/')) return url;

  // if is a youtu.be url, get the id after the /
  if (url.includes('youtu.be')) {
    const id = url.split('/').pop();
    if (!id) return null;

    return `https://www.youtube.com/embed/${id}`;
  }

  const videoIdRegex = /(?:v=|shorts\/)([-\w]+)/gm;
  const matches = videoIdRegex.exec(url);

  if (!matches || !matches[1]) return null;

  return `https://www.youtube.com/embed/${matches[1]}`;
};

export const getEmbedUrlFromVimeoUrl = (url: string) => {
  if (!isValidVimeoUrl(url)) return null;

  const videoIdRegex = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/;
  const matches = videoIdRegex.exec(url);

  if (!matches || !matches[1]) return null;

  return `https://player.vimeo.com/video/${matches[1]}`;
};
