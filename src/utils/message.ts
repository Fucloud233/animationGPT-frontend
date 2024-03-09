import { ElMessage } from "element-plus";

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

export const messages = {
    generateSuccess: () => newSuccessMsg("生成成功"),

    promptIsEmpty: () => newWarningMsg("请输入提示词"),

    motionNotGenerated: () => newErrorMsg("动作尚未生成，请先生成"),
    generateError: () => newErrorMsg("模型生成失败"),
};
