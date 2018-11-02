---
title: 貢獻金錢 To Me
date: 2018-06-03 19:40:08
---
付款正在處理中……請稍侯片刻，坐和放寬……
<br/>
<script>
var reqUrl = "https://wt-a52bbe6edaf5ee2fbfec51fb72f536d3-0.sandbox.auth0-extend.com/tto-moe-stripe-checker"
var url = new URL(window.location.href);
var price = url.searchParams.get("price");
var token = url.searchParams.get("stripeToken")
var type = url.searchParams.get("stripeTokenType")
var email = url.searchParams.get("stripeEmail")
var params = url.searchParams.toString()
var data = new FormData();
data.append('stripeToken', token);
data.append('stripeTokenType', type);
data.append('stripeEmail', email);
data.append('price', price);

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    dlOnAsyncTask()
  });
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
        //console.log(this.responseText)
      }
  };
  xmlhttp.open("POST", reqUrl, true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(params);
}
</script>
