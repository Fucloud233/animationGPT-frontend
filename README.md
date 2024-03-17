# AnimationGPT

## 配置说明

当使用 `npm run build` 命令将本项目文件转换为静态文件，
并使用 nginx 部署时，需要在 nginx 中配置以下内容。

```
server {
   # 监听端口
   listen 8080;
   # 项目所在文件路径
   root /usr/share/nginx/html;

   # 以下是为 vue-router 进行配置
   location / {
      try_files $uri $uri/ @router;
      index index.html;
   }
   location @router {
      rewrite ^.*$ /index.html last;
   }

   # 以下是为后端服务器镜像进行配置
   location /api {
      proxy_pass  http://127.0.0.1:8082/;
      proxy_redirect off;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
   }
}

```
