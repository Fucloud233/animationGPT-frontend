# AnimationGPT

本仓库是 AnimationGPT 的前端部分，
使用 Vue3 和 Element 编写了用于介绍和运行 Demo 的页面。

后端部分：[animationGPT-backend](https://github.com/Fucloud233/animationGPT-backend)

## 配置说明

### 1. Nginx 配置

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
   # 注意: 不要将静态文件放置到 html 目录内，会直接被覆盖
   location ^~ /assets/examples {
      alias /usr/share/nginx/examples;
   }
}

```

### 2. 网页配置

本项目还提供了配置文件，允许项目被打包成动态文件后动态地修改网页内容配置，
详情请查看 [config.js](public/configs.js)。
