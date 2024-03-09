import { ElMessage } from "element-plus";

import i18n from "../locales";

function newMsg(message: string, type: "success" | "warning" | "error") {
    return ElMessage({
        message: message,
        type: type,
        grouping: true,
    });
}

function newSuccessMsg(message: string) {
    return newMsg(message, "success");
}
function newWarningMsg(message: string) {
    return newMsg(message, "warning");
}
function newErrorMsg(message: string) {
    return newMsg(message, "error");
}

const t = i18n.global.t;

export const messages = {
    generateSuccess: () => newSuccessMsg(t("msg.generateSuccess")),

    promptIsEmpty: () => newWarningMsg(t("msg.promptIsEmpty")),

    motionNotGenerated: () => newErrorMsg(t("msg.motionNotGenerated")),
    generateError: () => newErrorMsg(t("msg.generateError")),
};
