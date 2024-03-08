import axios from "axios";
import { postRequest, blob2Url } from "./utils";

const VIDEO_TYPE = "video/mp4";

export async function generate(prompt: string, language: string) {
    let request = postRequest("/api/generate", {
        prompt: prompt,
        language: language,
    });

    // Notice: 需要设定 ResponseType -> Blob
    request.responseType = "blob";

    return await axios(request).then((resp) => {
        const blobUrl = blob2Url(resp.data, VIDEO_TYPE);

        // console.log(blobUrl);

        return {
            data: blobUrl,
            flag: true,
        };
    });
}
