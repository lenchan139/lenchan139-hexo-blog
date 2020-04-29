---
title: 貢獻金錢 To Me
date: 2018-06-03 19:40:08
---

如果你覺得雪娘好善良，想貢獻資金俾雪娘可以使用下面嘅連結經PayPal以信用卡嚟貢獻資金。
[https://paypal.me/lenchan139](https://paypal.me/lenchan139)
<br/>

<!--
<script>
let publishableKey = "pk_live_tAkakNKRE9sWdKReWoW8aiFd"
function onValueChangeCallback(){
  let valueHolder = document.getElementById('stripeValueInput')
  renderStripePayButton(valueHolder.value)
}
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
document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    onValueChangeCallback()
  });
</script>
金額(HKD)：
<div>
  <form action="loading.html">
  <input name="price" id="stripeValueInput" value=10 min="10" type="number" onchange="onValueChangeCallback()"/>
  <div style="padding-left: 8px; padding-top: 8px;" id="payButtonHolder" style="height:300px;"></div>
  </form>
</div>
-->