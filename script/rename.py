from pprint import pprint
from pathlib import Path
import json

import pandas as pd


filename = "./introduce_examples.csv"

lang_list = ["cn", "en"]


# 给测试用例重命名
def rename():

    data = pd.read_csv(filename).to_dict()

    names = [name for name in data['id'].values()]

    kinds = [
        # "OriginalSMPL",
        # "Original", 
        # "S4-50", 
        # "S4-70"
        "agpt",
        "agpt_plus",
        "mdm",
        "mgpt",
        "mld"
        ]

    format = "mp4"

    reverse = False

    for kind in kinds:
        count = 0

        for (i, name) in enumerate(names):
            folder_name = f"./examples/{kind}/"

            # 特殊处理
            if kind == "Original":
                name = name + "_original"
            elif kind == "OriginalSMPL":
                name = name + "_original_mesh"
                
            index_name = "%02d.%s"%(i, format)
            id_name =  f"{name}.{format}"

            try:
                if reverse:
                    path = Path(folder_name + index_name)
                    path.rename(folder_name + id_name)
                else: 
                    path = Path(folder_name + id_name)
                    path.rename(folder_name + index_name)
                count += 1
            except:
                pass
        
        print(f"{kind}: {count}")
            

# 将 csv 文件转换为 json 文件
def extract():
    data = pd.read_csv(filename).to_dict()

    for lang in lang_list:

        text_cn = [name for name in data[f'text_{lang}'].values()]

        with open(f"{lang}.json", 'w') as f:
            json.dump(text_cn, f, indent=4, ensure_ascii=False)


def extract_examples():
    data = pd.read_csv(filename).to_dict()

    for lang in lang_list:
        text = [ name for name in data[f'{lang}'].values()]

        with open(f"{lang}_example.json", 'w') as f:
            json.dump(text, f, indent=4, ensure_ascii=False)

if __name__ == "__main__":

    # extract_examples()
    rename()

