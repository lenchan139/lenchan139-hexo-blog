---
title: '[ConoHa] 喺openSUSE上裝WordPress！（下）——安裝WordPress'
tags:
  - Chakra/OpenSUSE/x86 Linux
  - Linux Server
date: 2016-06-12 15:05:49
---

> WordPress是一個以PHP和MySQL為平台的自由開源的部落格軟體和內容管理系統。WordPress具有外掛模組架構和模板系統。Alexa排行「前100萬」的網站中有超過16.7%的網站使用WordPress。到了2011年8月，約22%的新網站採用了WordPress。WordPress是目前網際網路上最流行的部落格系統。 2003年5月27日，WordPress從b2/cafelog分支，由馬特&middot;查爾斯&middot;穆倫維格（Matt Mullenweg）和Mike Little[8]開發。到了2011年12月，3.0版本已經被下載了超過6500萬次。

	&#8212; From [Wikipedia](https://zh.wikipedia.org/wiki/WordPress#.E7.89.B9.E6.80.A7)

	<span id="more-588"></span>

	為什麼選擇WordPress呢？好吧其實因為習慣&hellip;&hellip;我之前就是使用WordPress.com的服務，可惜限制太多，而付費又太貴，倒不如自己動手架設便宜，所以就有這篇教學文啦！

	承接上文，我們安裝並調教好LAMP之後，來安裝WordPress。

	首先先用SSH登入VPS，然後下載最新版本的WordPress。

> wget http://tw.wordpress.org/latest-zh_TW.tar.gz

	這裡下載的是正體中文版，如果你要下載英文版的話：

> wget http://wordpress.org/latest.tar.gz

	然後解壓縮：

> tar -xzvf latest-zh_TW.tar.gz

	如果下載的是英文版的話：

> tar -xzvf latest.tar.gz

	然後以Root權限登入MySQL：

> mysql -u root -p

	建立一個資料庫：

> CREATE DATABASE <span class="highlight">wordpress</span>;

	建立一個普通的SQL的用戶：

> CREATE USER <span class="highlight">wordpressuser</span>@localhost;

	然後設定用戶的密碼，請自己將紅字部分修改成你要的密碼：

> SET PASSWORD FOR <span class="highlight">wordpressuser</span>@localhost= PASSWORD(&quot;<span style="color:#FF0000;"><span class="highlight">password</span></span>&quot;);

	賦予該用戶存取開頭建立的Database的權限，紅字部分請再自行修改：

> GRANT ALL PRIVILEGES ON <span class="highlight">wordpress</span>.* TO <span class="highlight">wordpressuser</span>@localhost IDENTIFIED BY &#39;<span style="color:#FF0000;"><span class="highlight">password</span></span>&#39;;

	刷新MySQL：

> FLUSH PRIVILEGES;

	然後鍵入<span style="color:#FF0000;">** exit **</span>離開。

	接著我們複製並改了wordpress的設定檔的名字：

> cp ~/wordpress/wp-config-sample.php ~/wordpress/wp-config.php

	然後打開：

> sudo nano ~/wordpress/wp-config.php

	修改以下紅字的資訊：

> // ** MySQL 設定 &#8211; 您可以從主機服務提供商獲取相關資訊。 ** //
> 
> 		/** WordPress 的資料庫名稱，請更改 &quot;database_name_here&quot; */
> 
> 		define(&#39;DB_NAME&#39;, &#39;<span style="color:#FF0000;">database_name_here</span>&#39;);
> 
> 		/** MySQL 資料庫使用者名稱，請更改 &quot;username_here&quot; */
> 
> 		define(&#39;DB_USER&#39;, &#39;<span style="color:#FF0000;">username_here</span>&#39;);
> 
> 		/** MySQL 資料庫密碼，請更改 &quot;password_here&quot; */
> 
> 		define(&#39;DB_PASSWORD&#39;, &#39;<span style="color:#FF0000;">password_here</span>&#39;);

	結果應該如此：

> // ** MySQL 設定 &#8211; 您可以從主機服務提供商獲取相關資訊。 ** //
> 
> 		/** WordPress 的資料庫名稱，請更改 &quot;database_name_here&quot; */
> 
> 		define(&#39;DB_NAME&#39;, &#39;<span style="color:#FF0000;">wordpress</span>&#39;);
> 
> 		/** MySQL 資料庫使用者名稱，請更改 &quot;username_here&quot; */
> 
> 		define(&#39;DB_USER&#39;, &#39;<span style="color:#FF0000;">wordpressuser</span>&#39;);
> 
> 		/** MySQL 資料庫密碼，請更改 &quot;password_here&quot; */
> 
> 		define(&#39;DB_PASSWORD&#39;, &#39;<span style="color:#FF0000;">password</span>&#39;);

	儲存並離開。

	&#8211;

	然後複製所有資料到/var/www這個網頁伺服器路徑當中：

> sudo rsync -avP ~/wordpress/ /srv/www/htdocs/

	移動到該路徑：

> cd /srv/www/htdocs/

	給予用戶讀取apache資料夾的權限，Root應該能跳過：

> sudo chown -R wwwrun: /srv/www/htdocs

	<span class="highlight">最後安裝一個php的模組：</span>

> zypper in php5-curl php5-zlib

	最後於瀏覽器鍵入你的網站，應當有個set up guide，step by step填好之後就完成整個基本的設定了，Cheers ![🙂](https://s.w.org/images/core/emoji/2.4/72x72/1f642.png)

	TIPS：

	如果你偶然會發生建立資料庫連線錯誤，請試試登入Mysql

> mysql -u root -p

	然後

> SET PASSWORD FOR <span class="highlight">wordpressuser</span>@localhost= OLD_PASSWORD(&quot;<span style="color:#FF0000;"><span class="highlight">password</span></span>&quot;);

	同樣，自行修改紅字。

	&#8211;

	上半部分：[https://blog.lenchan139.org/?p=586](http://blog.lenchan139.org/?p=586)

	&#8211;

	參考資料<span style="color:#D3D3D3;"><strike>資料複製來源</strike></span>：

	How To Install WordPress on Ubuntu 12.04 By Etel Sverdlov

	[https://www.digitalocean.com/community/articles/how-to-install-wordpress-on-ubuntu-12-04](https://www.digitalocean.com/community/articles/how-to-install-wordpress-on-ubuntu-12-04)

	&nbsp;