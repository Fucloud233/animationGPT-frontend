// 从asserts目录下获取文件

type ExampleKind = "agpt" | "agpt_plus" | "mdm" | "mgpt" | "mld";

// 通过图床加载图片
export const getUrlFromPicBed = (name: string, id: number) => {
    const kind = name as ExampleKind;
    return window.config.examples.urls[kind][id];
};

export const getUrl = (name: string, format: string) => {
    const url = `../assets/${name}.${format}`;
    return new URL(url, import.meta.url).href;
};

export const getMp4Url = (name: string) => {
    return getUrl(name, "mp4");
};

export const getGifUrl = (name: string) => {
    return getUrl(name, "gif");
};

export const getWebpUrl = (name: string) => {
    return getUrl(name, "webp");
};
