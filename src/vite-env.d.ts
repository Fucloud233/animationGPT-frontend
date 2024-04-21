/// <reference types="vite/client" />

declare interface Config {
    demoOk: boolean;
    badTipDelay: number;

    defaultLang: "enUS" | "zhCN";

    introduce: IntroduceConfig;
    examples: ExamplesConfig;
}

declare interface ExamplesConfig {
    kindList: [string];
    kindLabelList: [string];
    size: number;
    urls: {
        agpt: [string];
        agpt_plus: [string];
        mdm: [string];
        mgpt: [string];
        mld: [string];
    };
}

declare interface IntroduceConfig {
    articleUrl: string;
    cid: string | undefined;
    bvid: string;

    author: string;
    record: string;
}

declare interface Window {
    config: Config;
}

declare module "*.vue" {
    import type { ComponentOptions } from "vue";
    const Component: ComponentOptions;
    export default Component;
}

declare module "*.md" {
    import type { ComponentOptions } from "vue";
    const Component: ComponentOptions;
    export default Component;
}
