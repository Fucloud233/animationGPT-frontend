import requests
import json

URL = 'https://api.superbed.cn/timeline'

kinds = [
    "agpt",
    "agpt_plus",
    "mdm",
    "mgpt",
    "mld"
]

LENGTH = 20

def pull(token):
    
    result = {

    }

    for kind in kinds:
        sub_result = [0] * LENGTH

        resp = requests.get(URL, params={
            "token": token,
            "f": 'json',
            'categories': kind
        })

        if resp.status_code != 200:
            print("requests error")
            break
        
        data = json.loads(resp.content.decode('utf-8'))

        print(f"{kind}: {data['total']}")

        for d in data['docs']:
            i = int(d['filename'].split('.')[0])
            sub_result[i] = d['url']


        result[kind] = sub_result

    
    return result

def main():
    # https://www.superbed.cn/
    token = ""
    file_path = "examples.json"

    result = pull(token=token)
    
    with open(file_path, 'w') as f:
        json.dump(result, f, indent=4)
    
if __name__ == '__main__':
    main()
        

        
        

        


