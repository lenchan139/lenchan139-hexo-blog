---
uuid: a26b5111-2fbc-11e9-8b4d-05d549662b79
title: '[WordPress/VPS]  解決「欲執行此動作，WordPress 需要訪問你的網頁伺服器」之問題'
tags:
  - Linux Server
  - Linux
  - Server
  - WordPress
  - VPS
  - 權限
categories:
  - IT及Linux綜合
  - Linux Server／Common
date: 2014-04-17 15:54:49
---

如題。

	這個問題原因主要是因爲網頁的path權限錯誤，導致WordPress無法正常讀寫 /wp-content 這個path。

	要解決這個問題，首先找出Apache所用User。

	在網頁Server下建立一個PHP

> nano /var/www/p.php

	而Script如下：

> &nbsp;&lt;?php echo(exec(&quot;whoami&quot;)); ?&gt;

	PS：預設之下， Apache 的 Path 應當是 /var/www ，如果不是，自行變通！

	之後用Browser直接開啓該網頁。

	e.g.： 如你存爲 p.php，則用Browser打開 http://your.domain/p.php 這樣。

	當中只有一行字，此乃apache 之 user。

> www-data

	之後給予該User完整存取權：

> sudo chown -R www-data: /var/www

	END.

	參考資料 原文：

	Amanon EC2 上 WordPress 安裝 Plugin 的問題 [http://40era.com/1597/ ](http://40era.com/1597/)
