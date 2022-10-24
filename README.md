### ひふみよのプロダクト

####YUI LooP

琉球大学の学内移動の課題を解決するWebアプリ。

## 開発環境

- Node.js : 16.18.0-alpine

- Docker : 3.9

## 環境構築

hfmyディレクトリ内で、
```docker-compose build```
でイメージを形成。

```docker-compose up```
でコンテナを起動。

```
hfmy-react-app-1 | Starting the development server...
hfmy-react-app-1 | 
hfmy-react-app-1 | Compiled successfully!
hfmy-react-app-1 | 
hfmy-react-app-1 | You can now view yui-loop in the browser.
hfmy-react-app-1 | 
hfmy-react-app-1 |   Local:            http://localhost:3000
hfmy-react-app-1 |   On Your Network:  http://172.18.0.2:3000
hfmy-react-app-1 | 
hfmy-react-app-1 | Note that the development build is not optimized.
hfmy-react-app-1 | To create a production build, use npm run build.
hfmy-react-app-1 | 
hfmy-react-app-1 | webpack compiled successfully
hfmy-react-app-1 | 

```
と表示されればOK。

ブラウザ上で(https://localhost:3000)[https://localhost:3000]と検索すればプロダクト名が表示されるはず。



## Author

- Funasako

- MIyagi

- Higa

- Yabiku




