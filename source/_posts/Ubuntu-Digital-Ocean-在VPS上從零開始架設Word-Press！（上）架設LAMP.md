---
title: '[Ubuntu/Digital Ocean]在VPS上從零開始架設Word Press！（上）架設LAMP'
tags:
  - Linux Server
  - 電腦雜項
date: 2014-01-13 22:29:46
---

As we know, Internet is very common nowadays.So many people have their own blogs. Today I would like to type a tutorial to let you know how to build your own blog on VPS.

	&nbsp;

	&hellip;&hellip;不行，我英語渣編不下去了。Ok，這個教學大部分內容來自Digital Ocean官方的教學文&hellip;&hellip;我沒拿許可的說，應該不會告我吧（望天）

	首先簡單介紹一下Digital Ocean Inc. 。它乃是美國一家雲端運算服務提供之公司，提供[VPS（Virtual Private Servers）](https://zh.wikipedia.org/wiki/VPS)以及[DNS（Domain Name Servers）](https://zh.wikipedia.org/wiki/%E5%9F%9F%E5%90%8D%E7%B3%BB%E7%BB%9F) Hosting的服務，並主打廉價&hellip;&hellip;平均每月只需要5美金&hellip;&hellip;你沒看錯！是5美金！是5美金！心動不如行動，馬上登入 [https://www.digitalocean.com/](https://www.digitalocean.com/) 申請吧！

	而這過程需要安裝LAMP。LAMP即[Linux](https://zh.wikipedia.org/wiki/Linux)、[Apache](https://zh.wikipedia.org/wiki/Apache)、[MySQL](https://zh.wikipedia.org/wiki/Mysql)、[PHP](https://zh.wikipedia.org/wiki/Php)。

	自行點名字參閱更多嗯。

	PS：開新Droplet務必選擇Ubuntu12.04 LTS版本，本文章正是以1204爲準，如果有差異&hellip;&hellip;自行解決。

<span id="more-191"></span>

	&#8211;

	註冊過程跳過，這裏只簡單地從SSH登入開始。在你註冊並開好第一個Droplet之後你會收到一封載有Root密碼的信件。如果你是使用Linux 直接

> ssh root@your.droplet.ip

	your.droplet.ip是鍵入你的Droplet的IP，別傻傻地直接複製貼上。如果你使用Windows的話，可以下載 [Putty](http://www.putty.org/) 進行SSH登入。

	然後它會要你鍵入密碼，在此輸入你之前的Mail所載的Root密碼，並按下Enter。

	如果密碼無誤你應當登入成功，如果你嫌棄密碼太難記憶，鍵入

> passwd root

	隨後輸入兩遍新密碼即可成功修改。

	&#8211;

	首先第一步先更新一下Ubuntu，鍵入：

> sudo apt-get update &amp;&amp; sudo apt-get upgrade

	然後安裝架設網頁伺服器用的Apache2：

> sudo apt-get install apache2

	如果安裝成功，你用你自己電腦網絡的瀏覽器查看VPS的IP會看到大刺刺的&quot;It Works!&quot;一句。

	然後需要安裝MySQL，鍵入：

> sudo apt-get install mysql-server libapache2-mod-auth-mysql php5-mysql

	在安裝過程中它會叫你設置SQL的Root密碼，自己重複兩遍&hellip;&hellip;

	然後激活：

> sudo mysql_install_db

	再之後跑一下MySQL的set up程序：

> sudo /usr/bin/mysql_secure_installation

	全部打Y下去就好。

	接著來安裝PHP，鍵入：

> sudo apt-get install php5 libapache2-mod-php5 php5-mcrypt

	安裝完之後，編輯：

> sudo nano /etc/apache2/mods-enabled/dir.conf

	把index.php放到最前，像這樣：

> &lt;IfModule mod_dir.c&gt; DirectoryIndex index.php index.html index.cgi index.pl index.php index.xhtml index.htm &lt;/IfModule&gt;

	之後Ctrl+X，儲存，完成。

	&#8211;

	之後建立一個PAGE方便自己查看PHP資訊，鍵入：

	sudo nano /var/www/info.php

	然後填入內容：

	&lt;?php phpinfo(); ?&gt;

	儲存，完成。

	最後記得重啟apache2以儲存各種設定。

	sudo service apache2 restart

	&#8211;

	下半部分：[http://lenchan139.org/?p=194](http://lenchan139.org/?p=194)

	&#8211;

	參考資料<span style="color:#D3D3D3;"><strike>資料複製來源</strike></span>：

	&quot;How To Install Linux, Apache, MySQL, PHP (LAMP) stack on Ubuntu&quot; By Etel Sverdlov

	[https://www.digitalocean.com/community/articles/how-to-install-linux-apache-mysql-php-lamp-stack-on-ubuntu](https://www.digitalocean.com/community/articles/how-to-install-linux-apache-mysql-php-lamp-stack-on-ubuntu)

	&nbsp;