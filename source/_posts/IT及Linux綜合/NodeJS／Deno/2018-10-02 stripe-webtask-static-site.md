---
uuid: 06c02192-2fbd-11e9-89cb-3d3b7bb24e51
title: '[WebTask.io x Stripe]係靜態網站上建立Stripe 收款頁面。'
id: 1541145672
tags:
  - stripe
  - webtask.io
  - static site
  - webservice
  - payments gateway
  - hexo
  - javascript
  - FaaS
  - NodeJS
  - We7Pay
categories:
  - IT及Linux綜合
  - NodeJS／Deno
thumbnail: >-
  /img/2018-11-02 stripe-webtask-on-static-site/Screenshot 2018-11-05 at
  11.24.23.png
date: 2018-11-02 16:01:12
---
近日孤單寂寞冷，想係自己嘅blog放個位方便經Stripe收錢。不過因爲係用hexo gen嘅靜態網頁，而Stripe要求一定要用server去做charge先真正過到數……雖然可以直接係javascript到過……但係應該，唔會有人愚蠢到會咁做吧（會暴露secrect key）？但就咁爲咗一個function而開一個NodeJS Project又有少少秦……。之後經過一番搜尋之後發現WebTask.io呢個服務十分好，可以以NodeJS 寫 micro webservice，官方嘅講法係FaaS(Function as a Service)……啫係你只需要寫一個function，唔需要做太多conf都可以做到。

# Stripe
官方網站：[https://stripe.com/](https://stripe.com/)
Stripe係個支付方式，可以經Visa、MasterCard、American Express等嘅信用卡/扣款卡，Apple Pay，Android Pay，WeChat Pay，AliPay等方式都可以，不過似乎要聯絡CS先有得搞……所以唔好咁複雜啦.png。而Stripe最大優點係佢專注於開發者角度，即係佢提供整套APIs，可以讓開發者便利地開發各種收款應用及網上商店，能一站式做到貨品存貨及售價管理、收款及傳送收據等一連串動作，基本上用Stripe做後臺做e-shop嘅話唔需要其他服務架啦。而且支援NodeJS、Python、Go、Java、Ruby甚至乎就咁用curl做API Call亦到可以。而且支援咁多Language之餘手續費仲要平過PayPal……PayPal，what7u doing？

#webtask.io
官方網站[https://webtask.io/](https://webtask.io/)
而webtask.io線上即時撰寫、測試、部署HTTP endpoint webservice於一身嘅服務。佢特色係你唔需要整理好整個webservice系統係點，你可以只寫一個function，亦只需要寫function嘅部分，佢就可以直接生成一條公開嘅webservice url供你去呼喚佢。佢免費版本唯一限制係1秒1個request，作爲大公司可以會難啲，但作爲微企業或者個人使用已經十分足夠。

# 準備
1. Stripe 帳號及其API key
2. webtask.io 帳號
3. 你嘅Editor（例如Atom）

# 付款頁面
### 建立付款掣
首先第一步梗係開個html file，建立付款掣。
```html
<form action="loading.html">
<input name="price" id="stripeValueInput" value=10 min="10" type="number" onchange="onValueChangeCallback()"/>
<div style="padding-left: 8px; padding-top: 8px;" id="payButtonHolder" style="height:300px;"></div>
</form>
```
請注意務必要以<form>包覆所有參數，否則最後有關資料無法提交進行下一步。而係該範例中，我會每當<input>更改價錢就會重新生成付款按鈕（會不同價格），所以我亦需要一個<div>去承載付款按鈕。
此外，亦需要注意仿照上面，爲放置付款掣嘅<div>手動設置高度(`style="height:300px;"`)，否則高度係0嘅話就會變成隱藏咗……
此外，<form>嘅 `action=""`請設置到另一版靜態畫面用以等待處理付款過程。

### 更新付款掣
在此你亦需要創建一個callback function for <input>嘅數值改變時候去呼喚。
```javascript
function renderStripePayButton(price){
  let payButton = document.getElementById('payButtonHolder')
  payButton.innerHTML = ""
  payButton.appendChild(strHtmlPayButton(price))
}
function strHtmlPayButton(price){
  let newPrice = parseFloat(price) * 100
  var s = document.createElement('script');
  s.src = "https://checkout.stripe.com/v2/checkout.js"
  s.setAttribute("class","stripe-button")
  s.setAttribute("data-key",publishableKey)
  s.setAttribute("data-locale","auto")
  s.setAttribute("data-currency","HKD")
  s.setAttribute("data-description","TTO.MOE 網上支付")
  s.setAttribute("data-amount","newPrice")
  return s
}
```
請注意：請勿直接使用 `div.innerHTML = '<script>...</script>'` 方式去建立<script>標籤，因爲經過該方式建立嘅<script>並不會執行當中嘅內容，所以爲咗使<script>會被執行而生成按鈕，請務必仿照上述方式，用`document.createElement(String)`嘅function去創建，並透過`element.appendChlid(Any)`去塞入當中。
並謹記係塞入前記得清空 `innerHTML` ，否則就會每次更新都會多粒掣。

### 設置Callback
```javascript
function onValueChangeCallback(){
  let valueHolder = document.getElementById('stripeValueInput')
  renderStripePayButton(valueHolder.value)
}
```
之後謹記寫入供<input>嘅`onchange=""`使用嘅callback function，以便能使其正常運作。此外，你亦可以係DOM完全載入時生成出預設嘅付款掣：
```javascript
document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    onValueChangeCallback()
  });
```
如此，係載入完成嘅時候會首先建立預設價格嘅時候都會生成付款掣鳥。

### 等待付款
之後可以開啓另一版供人等待，並設置頭先嘅<form>帶入該版：
```html
<form action="loading.html">
```
之後經付款按鈕入來會發現，有一堆透過GET METHOD 傳遞嘅參數，而此時嘅URL結構會類似咁：
`https://example.com/loading.html?price=10&stripeToken=tok_1DRywmIFPTuezfQkjeWo0td4&stripeTokenType=card&stripeEmail=lenchan139%40tto.moe`
呢度有多個參數被傳入，包括：
- price (我哋自行添加嘅)
- stripeToken （單次token，用過一次會失效，用來charge該次交易）
- stripeTokenType（付款方式，你可以根據該付款方式又唔同處理。不過在該範例中該參數並沒有實際意義）
- stripeEmail（付款方電郵，可以稍後用以經Stripe，自動送出收據）

首先我哋可以暫時無視該頁面先，首先於webtask.io寫好實際處理付款所需嘅Webservice。

### Charge In webtask.io
撳咗掣之後其實未到數。由於stripe需要用secrect key去係server-side行charge去正式收錢先會到數，直接寫個NodeJS App大得濟，所以我哋可以用 webtask.io 寫單版 webservice 而唔需要理咁多conf之類嘅事。
首先打開panel之後開新task：
![pic](/img/2018-11-02 stripe-webtask-on-static-site/Screenshot 2018-11-05 at 10.31.44.png)

之後按下齒輪，埋下Stripe 嘅secret key：
![pic](/img/2018-11-02 stripe-webtask-on-static-site/Screenshot 2018-11-05 at 10.32.03.png)
![pic](/img/2018-11-02 stripe-webtask-on-static-site/Screenshot 2018-11-05 at 10.32.12.png)
![pic](/img/2018-11-02 stripe-webtask-on-static-site/Screenshot 2018-11-05 at 10.32.17.png)

之後開好嘅正文應該如此：
```javascript
/**
* @param context {WebtaskContext}
*/
module.exports = function(context, cb) {
  cb(null, { hello: context.query.name || 'Anonymous' });
};
```
之後import stripe，並拎好各paramaters：
```javascript
const stripe = require('stripe')
module.exports = function(context, cb) {
  let secretKey = context.secrets.stripe_secret_key
  let amount = parseFloat(context.body.price)
  let price = amount.toFixed(2).toString().replace(".","")
  let token = context.body.token
  let email = context.body.email
}
```
之後開始創建stripe嘅charge option：
```javascript
let chargeOptions = {
  amount: price,
  description: "TTO.MOE ONLINE PAYMENTS",
  currency: "hkd",
  receipt_email: email,
  source: token
}
```

開始charge：
```javascript
stripe(secretKey)
  .charges
  .create(chargeOptions)
  .then(charge=>{

  }, error=> {

  })
```

之後檢查返是否成功，是就回覆成功：
```javascript
stripe(secretKey)
  .charges
  .create(chargeOptions)
  .then(charge =>{
    if(charge.status === 'succeeded'){
      cb(null, {success:1, stripe:charge})
    }
  }, error => {
    cb(null,{success:0,inPara:context.body, error:err})
  })
```
### call webtask.io
之後就係最後一步，係個static web入面call返個webservice做嘢。
使用javascript內置嘅功能自動重新處理好參數們供xmlHttpRequest使用：
```javascript
var url = new URL(window.location.href);
var price = url.searchParams.get("price");
var token = url.searchParams.get("stripeToken")
var type = url.searchParams.get("stripeTokenType")
var email = url.searchParams.get("stripeEmail")
var params = url.searchParams.toString()
```

仲有記得埋好webtask.io嘅url：
```javascript
var reqUrl = "https://id.sandbox.auth0-extend.com/tto-moe-stripe-checker"
```

之後開個function call返webtask.io嘅function：
```javascript
function dlOnAsyncTask(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var json = JSON.parse(this.responseText);
          console.log(json)
          if(json && json.success){
            alert("付費成功！即將返回首頁！")
            window.location.href = ("/")
          }else{
            alert("付費失敗！請稍後重試！")
            window.location.href = ("/payments/stripe/")
          }
      }else{
        alert("內部錯誤！請稍後重試！")
        window.location.href = ("/payments/stripe/")
      }
  };
  xmlhttp.open("POST", reqUrl, true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(params);
}
```
請注意，你當然可以唔檢查個返回狀態出信息，不過如果出失敗嘅話可以期待client會操作多一次，其實未嘗唔係件好事。此外，要用post方式call記得setRequestHeader，唔係對面會認唔到而會error。此外params要用`URL.searchParams.toString()`
去convert返。
最後係onload度等佢完全load完先行個function就……完成啦！：
```javascript
document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    dlOnAsyncTask()
  });
```

大家鍾意嘅話可以嚟捐獻俾我架：
[https://blog.tto.moe/payments/stripe/](https://blog.tto.moe/payments/stripe/)

# REF:
- [WebTask.io Documents](https://webtask.io/docs/101)
- [Stripe Documents](https://stripe.com/docs)
