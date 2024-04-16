/// <reference types="vite/client" />

declare interface Config {
    demoOk: boolean;
    defaultLang: "enUS" | "zhCN";

    articleUrl: string;

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
