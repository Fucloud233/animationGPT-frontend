/// <reference types="vite/client" />

declare interface Config {
    demoOk: boolean;
    examples: ExamplesConfig;
}

declare interface ExamplesConfig {
    kindList: [string];
    kindLabelList: [string];
    size: number;
}

declare interface Window {
    config: Config;
}
