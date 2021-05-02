# 我的餐廳清單
一個使用 Node.js + Express 打造的餐廳美食網站，可以查看自己的餐廳清單、依照餐廳名稱與類別進行搜尋，在查詢不到關鍵字餐廳時，頁面會有提示沒有符合的餐廳、。同時在每個餐廳列表中，可以進行修改及刪除表上餐廳，也可以任意新增自己喜歡的餐廳名單。

##  專案畫面

### 專案首頁
<img width="921" alt="restaurant_index" src="https://user-images.githubusercontent.com/69742330/116818548-8b965600-ab9e-11eb-8f43-50cb45509c0a.png">

### 餐廳詳細資訊頁面
<img width="1041" alt="restaurant_show" src="https://user-images.githubusercontent.com/69742330/116203915-c8adb300-a76e-11eb-9ff8-80712b8a6aa1.png">

### 新增餐廳頁面
<img width="965" alt="add restaurant" src="https://user-images.githubusercontent.com/69742330/116818622-f5aefb00-ab9e-11eb-913b-b110796cec78.png">


## 產品功能
1. 使用者可以點擊任一餐廳，查看更多餐廳資訊，如地址、電話與簡介
2. 使用者可以依照中文名稱、餐廳類別進行搜尋
3. 使用者可以新增新的餐廳
4. 使用者可以編輯目前已有餐廳內容
5. 使用者可以刪除餐廳

## 環境建置與需求
+ [Node.js: v14.16.1](https://nodejs.org/en/)

## 安裝與執行步驟
打開終端機將專案下載至本地執行
```
git clone https://github.com/tinahung126/restaurantList.git
```
進入專案資料夾
```
cd restaurantList
```
安裝專案需求套件
```
npm install 
npm i nodemon
```
啟動伺服器，執行專案
```
npm run dev
```
終端機顯示 Start listening on http://localhost:3000 即成功啟動，可至 http://localhost:3000 開始使用！
