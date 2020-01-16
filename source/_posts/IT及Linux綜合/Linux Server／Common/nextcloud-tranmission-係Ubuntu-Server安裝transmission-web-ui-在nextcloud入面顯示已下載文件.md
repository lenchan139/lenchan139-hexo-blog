---
uuid: a26b5112-2fbc-11e9-8b4d-05d549662b79
title: >-
  [nextcloud+tranmission]係Ubuntu Server安裝transmission web ui +
  在nextcloud入面顯示已下載文件
tags:
  - Linux Server
  - Linux
  - Server
  - transmission
  - Web UI
  - Nextcloud
  - 下載
  - apache
  - 權限
  - admin
categories:
  - IT及Linux綜合
  - Linux Server／Common
date: 2017-03-02 15:39:16
---

RT

	安裝transmission

> apt-get install transmission-cli transmission-common transmission-daemon

	首先把apache user加入group

> usermod -a -G debian-transmission www-data

	之後開個folder

> mkdir&nbsp;/home/debian-transmission

	設定權限

> chown debian-transmission /home/debian-transmission
>
> 		chgrp debian-transmission /home/debian-transmission
>
> 		chmod 2774 -R /home/debian-transmission

	暫停個daemon嚟做設定先

> service transmission-daemon stop

	打開設定檔

> nano&nbsp;/etc/transmission-daemon/settings.json

	修改數行嘅設定

> **&quot;download-dir&quot;****:**** &quot;/home/debian-transmission/&quot;****,**&nbsp;
>
> 		**&quot;download-dir&quot;****:**** &quot;/home/debian-transmission/&quot;****,**&nbsp;
>
> 		**&quot;rpc-authentication-required&quot;****:** true**,**&nbsp;
>
> 		**&quot;rpc-enabled&quot;****:** true**,**&nbsp;
>
> 		**&quot;rpc-password&quot;****:**** &quot;your new password****&quot;****,**&nbsp;
>
> 		**&quot;rpc-username&quot;****:**** &quot;username&quot;****,**&nbsp;
>
> 		**&quot;rpc-whitelist-enabled&quot;****:** false**,**&nbsp;

	儲存。之後開返daemon

> service transmission-daemon start

	鍵入網址

> your.ip:9091

	[![](https://lenchan139.org/blog/wp-content/uploads/2017/03/Screen-Shot-2017-03-02-at-3.35.51-PM-255x300.png)](https://lenchan139.org/blog/wp-content/uploads/2017/03/Screen-Shot-2017-03-02-at-3.35.51-PM.png)

	之後打開nextcloud，開啓external storage support

	[![](https://lenchan139.org/blog/wp-content/uploads/2017/03/Screen-Shot-2017-03-02-at-3.37.45-PM-300x263.png)](https://lenchan139.org/blog/wp-content/uploads/2017/03/Screen-Shot-2017-03-02-at-3.37.45-PM.png)

	前往admin-&gt;External Storages，鍵入適當的資料就完成啦。

	[![](https://lenchan139.org/blog/wp-content/uploads/2017/03/Screen-Shot-2017-03-02-at-3.38.20-PM-300x39.png)](https://lenchan139.org/blog/wp-content/uploads/2017/03/Screen-Shot-2017-03-02-at-3.38.20-PM.png)
