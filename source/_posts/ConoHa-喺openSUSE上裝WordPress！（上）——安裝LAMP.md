---
title: '[ConoHa] 喺openSUSE上裝WordPress！（上）——安裝LAMP'
tags:
  - Chakra/OpenSUSE/x86 Linux
  - Linux Server
date: 2016-06-12 15:01:22
---

As we know, Internet is very common nowadays.So many people have their own blogs. Today I would like to type a tutorial to let you know how to build your own blog on VPS.

	&nbsp;

	最近手痕搬咗呢個Blog去日本嘅[ConoHa](https://www.conoha.jp/referral/?token=S2IpwSFDYah_9mrovPIJ0Vc.2N7i0HxoInIS6jbarLBmZbCXV1s-J31)，跟住喺OpenSUSE裝Wordpress並搬過嚟&hellip;&hellip;

	介紹下，[ConoHa](https://www.conoha.jp/referral/?token=S2IpwSFDYah_9mrovPIJ0Vc.2N7i0HxoInIS6jbarLBmZbCXV1s-J31)喺日本嘅VPS服務供應商，提供全SSD嘅VPS服務。而收費方面最低只需900日元就有2-core, 1GB RAM同50GB SSD。有興趣可以參考下：[https://www.conoha.jp/](https://www.conoha.jp/referral/?token=S2IpwSFDYah_9mrovPIJ0Vc.2N7i0HxoInIS6jbarLBmZbCXV1s-J31)

	而這過程需要安裝LAMP。LAMP即[Linux](https://zh.wikipedia.org/wiki/Linux)、[Apache](https://zh.wikipedia.org/wiki/Apache)、[MySQL](https://zh.wikipedia.org/wiki/Mysql)、[PHP](https://zh.wikipedia.org/wiki/Php)。

	自行點個名睇更多嗯。

	PS：本文章正是以 OpenSUSE Leap 42.1 爲準，如果有差異&hellip;&hellip;自行解決。

	<span id="more-586"></span>

	&#8211;

	註冊過程跳過，這裏只簡單地從SSH登入開始。在你註冊並開好第一個Droplet之後你會收到一封載有Root密碼的信件。如果你是使用Linux 直接

> ssh root@your.droplet.ip

	your.droplet.ip是鍵入你的VPS嘅IP，唔好就咁複製貼上。如果你用Windows嘅話，可以下載 [Putty](http://www.putty.org/) 登入SSH。

	然後它會要你打密碼，喺度輸入你之前設定嘅Root密碼，並按下Enter。

	如果密碼無誤你應當登入成功，如果你嫌棄密碼太難記憶，鍵入

> passwd root

	隨後輸入兩遍新密碼即可成功修改。

	&#8211;

	首先第一步先更新一下Ubuntu，鍵入：

> zypper dup

	然後安裝架設網頁伺服器用的Apache2：

> zypper in apache2

	如果安裝成功，你用你自己電腦網絡的瀏覽器查看VPS的IP會看到大刺刺的&quot;It Works!&quot;一句。

	如果唔得可以人手啓動：

> systemctl start apache2

	開啓apache2服務：

> systemctl enable apache2

	然後需要安裝MySQL，鍵入：

> <span style="font-weight: bold;">zypper in mariadb mariadb-tools</span>

	在安裝過程中它會叫你設置SQL的Root密碼，自己重複兩遍&hellip;&hellip;

	然後開個服務：

> systemctl enable mysql

	唔得嘅人手啓動：

> systemctl start mysql

	再之後跑一下MySQL的set up程序：

> mysql_secure_installation

	一開始會叫你打密碼，酒咁Enter跟住照住改個密碼就瘋狂Enter。

	跟住來安裝PHP，鍵入：

> zypper in php5 php5-mysql apache2-mod_php5

	開啓php：

> a2enmod php5

	重開以啓用設定：

> systemctl restart apache2

	&#8211;

	之後建立一個PAGE方便自己查看PHP資訊，鍵入：

> nano /srv/www/htdocs/info.php

	然後填入內容：

	&lt;?php phpinfo(); ?&gt;

	儲存，完成。

	最後記得重啟apache2以儲存各種設定。

> systemctl restart apache2

	&#8211;

	下半部分：[https://blog.lenchan139.org/?p=588](http://blog.lenchan139.org/?p=588)

	&#8211;

	參考資料<span style="color:#D3D3D3;"><strike>資料複製來源</strike></span>：

	[https://en.opensuse.org/SDB:LAMP_setup#Installing_Apache2](https://en.opensuse.org/SDB:LAMP_setup#Installing_Apache2)

	&nbsp;

	&nbsp;

	&nbsp;