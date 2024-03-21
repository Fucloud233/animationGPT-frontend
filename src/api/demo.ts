import axios from "axios";
import { postRequest, blob2Url, getRequest } from "./utils";

const VIDEO_TYPE = "video/mp4";
const BVH_TYPE = "application/bvh";

export async function generate(prompt: string, language: string) {
    let request = postRequest("/api/generate", {
        prompt: prompt,
        language: language,
    });

    // Notice: 需要设定 ResponseType -> Blob
    request.responseType = "blob";

    return await axios(request)
        .then((resp) => {
            const blobUrl = blob2Url(resp.data, VIDEO_TYPE);

            // 响应头的文件名，也是该prompt对应的API
            const id = extractFileName(resp.headers["content-disposition"]);

            return {
                data: {
                    url: blobUrl,
                    id: id,
                },
            };
        })
        .catch((err) => {
            const resp = err.response;
            const result = {
                data: undefined,
                translateError: false,
            };

            // 如果返回的状态码是500, 且存在数据，则说明发生翻译错误
            // 详情可见后端代码中的 API
            if (resp.status == 500 && (resp.data as Blob).size != 0) {
                result.translateError = true;
            }

            return result;
        });
}

export async function download(id: string) {
    let requestBody = getRequest("/api/download", {
        id: id,
    });

    return await axios(requestBody).then((resp) => {
        return {
            data: blob2Url(resp.data, BVH_TYPE),
            flag: true,
        };
    });
}

export function extractFileName(content: string) {
    return content?.split(";")[1].split("=")[1];
}
