/// <reference types="vite/client" />

declare interface Config {
    demoOk: boolean;
    examples: ExamplesConfig;
}

declare interface ExamplesConfig {
    kindList: [string];
    kindLabelList: [string];
    size: number;
    urls: {
        agpt: [string];
        agpt_plus: [string];
        mdn: [string];
        mgpt: [string];
        mld: [string];
    };
}

declare interface Window {
    config: Config;
}
