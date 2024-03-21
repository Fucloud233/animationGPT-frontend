# AnimationGPT

本仓库是 AnimationGPT 的前端部分，
使用 Vue3 和 Element 编写了用于介绍和运行 Demo 的页面。

后端部分：[animationGPT-backend](https://github.com/Fucloud233/animationGPT-backend)

## 配置说明

### 端口配置

-   前端 Port: `8080`
-   后端 Port: `8082`

### Nginx 配置

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

   # 配置静态文件访问
   location /assets {
      alias /usr/share/nginx/html/assets;
   }
}

```
