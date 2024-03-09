export enum ResultFileKind {
    Mp4 = "mp4",
    Bvh = "bvh",
}

export function getMime(kind: ResultFileKind) {
    switch (kind) {
        case ResultFileKind.Mp4:
            return "video/mp4";
        case ResultFileKind.Bvh:
            return "application/bvh";
    }
}
