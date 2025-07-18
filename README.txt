バックエンドの起動方法
1. cd shogi2-backend
2. npm install
3. npm run dev

フロントエンドの起動方法
1. cd shogi2-frontend
2. npm install
3. npm run build
4. npx serve dist -p 5173       (5173の部分は好きなポート番号でOK)

LAN内の別の端末でアクセスするときはshogi2-frontendの11、12行目あたりを<自分のIPアドレス:3000>という形に変更する
