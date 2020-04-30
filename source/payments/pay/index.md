---
title: 貢獻金錢 To Me
date: 2018-06-03 19:40:08
---

如果你覺得雪娘好善良，想貢獻資金俾雪娘可以透過Crypto Currency貢獻金錢 to me。
# Crypto Currency
BTC: 3JaC6TmqgEMXAr7jbgcyZF45LTP4SpyDBY
MCO: 0x9205579963ff4aE88D51d61Ef2488Ca880170Db2
ETH: 0x9205579963ff4aE88D51d61Ef2488Ca880170Db2
LTC: MKjJpqo5MbZgikzjkHDxg1EcYCZvxX1ZRJ
XRP ADDRESS: rKV8HEL3vLc6q9waTiJcewdRdSFyx67QFb
XRP TAG: 1947269684
TRUE USD: 0x9205579963ff4aE88D51d61Ef2488Ca880170Db2

# Paypal Checkout 
亦可以使用下面嘅連結經PayPal以信用卡嚟貢獻資金。
<br/>
<div>
金額(HKD)：
  <input name="price" id="stripeValueInput" value=10 min="10" type="number" onchange="onValueChangeCallback()"/>
</div>

<div id="paypal-button-container"></div>
<script src="https://www.paypal.com/sdk/js?client-id=AQVBg7wA6Cdc-v6XV36kgF6MXD19QA9I9p6Zn7jGGmOcEB93Z5Bzz7tGI-QusYHxu8XPGZDnnW-CxwOG&currency=HKD" data-sdk-integration-source="button-factory"></script>
<script>
document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    onValueChangeCallback()
  });
function onValueChangeCallback(){
  let valueHolder = document.getElementById('stripeValueInput')
  let p = valueHolder.value
  console.log(p)
  if(p <10){
    valueHolder.value = 10;
    alert('基於PayPal的手續費及避免濫用，最少金額爲$10HKD，敬請見諒。');
  }else{
  renderPaymentButton(valueHolder.value)
  }
}
function renderPaymentButton(price){
  var d = document.getElementById('paypal-button-container')
  if(d){
    try{d.innerHTML = ''}catch(e){}
  }
  paypal.Buttons({
      style: {
          shape: 'pill',
          color: 'black',
          layout: 'horizontal',
          label: 'pay',
          
      },
      createOrder: function(data, actions) {
          return actions.order.create({
              purchase_units: [{
                  amount: {
                      value: price
                  }
              }]
          });
      },
      onApprove: function(data, actions) {
          return actions.order.capture().then(function(details) {
              alert('Transaction completed by ' + details.payer.name.given_name + '!');
              location.replace('/payments/pay')
          });
      }
  }).render('#paypal-button-container');
  }
</script>

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