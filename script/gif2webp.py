from PIL import Image
from pathlib import Path

quality = {'quality': 90}

kinds = [
    "agpt",
    "agpt_plus",
    "mdm",
    "mgpt",
    "mld"
    ]

LENGTH = 20

SRC_FORMAT = "gif"
TGT_FORMAT = "webp"

def to_filename(i, prefix):
    return "%02d.%s"%(i, prefix)

def convert():
    for kind in kinds:
        count = 0

        src_folder_path = f"./gif/{kind}/"
        tgt_folder_path = f"./webp/{kind}/"

        Path(tgt_folder_path).mkdir()

        for i in range(LENGTH):

            src_filename = src_folder_path + to_filename(i, SRC_FORMAT)
            tgt_filename = tgt_folder_path + to_filename(i, TGT_FORMAT)
            try:
                Image.open(src_filename).save(tgt_filename, 'webp', **quality, save_all=True)
                count += 1
            except Exception as e:
                pass

        print(f"{kind}: {count}")

if __name__ == '__main__':
    convert()

