## About

[Miibo](https://mebo.work/) のAIサービスと組み合わせたDiscord Botです。

## How to use

依存関係のインストール
 ```
 npm ci
 ```

src配下のconfig.tmp.jsonをconfig.jsonにrenameしてください

config.json内のパラメーターの値を設定する

[Discord Developer Portal](https://discord.com/developers/applications) でDiscord Bot関連の値を取得します。

[Miiboダッシュボード](https://miibo.dev/admin/dashboard) でMiiboのAPIキーとAgentIdを取得します。

起動します。
```
npm start
```

## Docker を使う場合

config.json内のパラメーターの値を設定する

docker image作成

```
docker build . -t image-name
```

dockerコンテナ起動

```
docker run -d image-name
```
