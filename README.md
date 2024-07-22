# Weather

一个天气网页，接口来源于高德地图。

# 自动部署说明

项目里配置了 githubPages 和 Vercel 两个平台。

## githubPages

githubPages 自动读取 main 分支，打包后自动上传到 gh-pages 分支，gh-pages 分支用来做部署。

> 由于该项目是二级项目，https://ted4kra.github.io/已经部署了博客，所以打包后文件访问的时候需要访问 /Weather/xxx.js，否则会访问到 /xxx.js。故增加了.env.github 文件。
> 每次 githubWorkFlow 部署的时候，都会将.env.github 文件复制到.env 文件中,npm run build 的时候，读取到的 VITE_BROWSER_PATHs 是/Weather,将该变量放在 vite.config.js 的 base 变量里，保证打包后的文件路径是/Weather/xxx.js。

## Vercel

Vercel 是一个静态网站托管平台，它可以将 githubPages 分支的文件自动部署到 URL_ADDRESS 上。打包后的文件会自动访问该容器根目录，所以访问路径应该是/xxx.js，在 Vercel 平台增加了 Environment Variables，设置 VITE_BROWSER_PATH 是 /，保证打包后的文件路径是/xxx.js。

# CI

```yml
name: CI

on:
  push:
    branches:
      - main
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "14.x"

      - name: Install Dependencies
        run: npm install

      - name: Configure GitHub Pages
        run: |
          cp .env.github .env
          cat .env

      - name: Build project for GitHub Pages
        run: npm run build

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4.3.3
        with:
          branch: gh-pages
          folder: dist
          token: ${{ secrets.GITHUB_TOKEN }}
```
