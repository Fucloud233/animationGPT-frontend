/// <reference types="vite/client" />

declare interface Config {
    demoOk: boolean;
}

declare interface Window {
    config: Config;
}
