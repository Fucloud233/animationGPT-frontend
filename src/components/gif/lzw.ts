export function lzwDecode(minCodeSize: number, data: Uint8Array) {
    var output = [];

    var pos = 0;
    // 编码的长度
    var codeSize = minCodeSize + 1;

    var clearCode = 1 << minCodeSize;
    var eoiCode = clearCode + 1;

    var dict = [] as number[][];

    // code 是当前编码 last 是后一个编码
    var code: number = 0;
    var last: number = 0;
    while (true) {
        last = code;
        code = readCode(codeSize);

        if (code == clearCode) {
            clear();
            continue;
        }

        if (code == eoiCode) break;

        if (code > dict.length) {
            throw new Error("Invalid LZW code");
        }

        if (code == dict.length || last !== clearCode) {
            dict.push(dict[last].concat(dict[last][0]));
        }

        output.push.apply(output, dict[code]);

        //
        if (dict.length == 1 << codeSize && codeSize < 12) {
            codeSize++;
        }
    }

    return output;

    // 读取 codeSize 的序号内容
    function readCode(size: number) {
        var code = 0;
        for (var i = 0; i < size; i++) {
            // size 不是对齐的，它可能大于 8bit，也可能小于 8bit
            // 这里的 data 是按照 8 进行划分
            // 1. data[pos>>3]  : 取 8 的倍数
            // 2. 1 << (pos & 7): 取 8 的余数
            if (data[pos >> 3] & (1 << (pos & 7))) {
                code |= 1 << i;
            }
            pos++;
        }
        return code;
    }

    function clear() {
        dict = [];
        codeSize = minCodeSize + 1;
        for (var i = 0; i < clearCode; i++) dict[i] = [i];
        dict[clearCode] = [];
        dict[eoiCode] = [];
    }
}
