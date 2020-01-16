---
uuid: a26b5110-2fbc-11e9-8b4d-05d549662b79
title: '[Ubuntu Server1204]建立Self-Sign的SSL Cert並用以自身的VPS'
tags:
  - Linux Server
  - Linux
  - Server
  - Ubuntu
  - Self-sign
  - SSL
  - SSL cert
  - cert
  - VPS
  - update
  - apache
categories:
  - IT及Linux綜合
  - Linux Server／Common
date: 2014-06-11 19:17:22
---

如題&hellip;&hellip;今天終於提起心情來搞這個了&hellip;&hellip;（趴）

	&#8211;

	先來一個update list：

> sudo apt-get update

	如果沒有apache請務必安裝：

> sudo apt-get install apache2

	啓用ssl mod：

> sudo a2enmod ssl

	重啓apache：

> sudo service apache2 restart

	建立儲存SSL Cert的folder：

> sudo mkdir /etc/apache2/ssl

	建立自簽證書：

> sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/apache2/ssl/apache.key -out /etc/apache2/ssl/apache.crt

	PS：想知道各選項意思請自行查看原文。

	Enter之後會要你填入各種資訊：

> Country Name (2 letter code) [AU]:HK
>
> 		State or Province Name (full name) [Some-State]:Hong Kong
>
> 		Locality Name (eg, city) []:Hong Kong
>
> 		Organization Name (eg, company) [Internet Widgits Pty Ltd]:3rd Organ
>
> 		Organizational Unit Name (eg, section) []:Lilith Cert
>
> 		Common Name (e.g. server FQDN or YOUR name) []:blog.lenchan139.org
>
> 		Email Address []:webadmin@lenchan139.org

	之後修改SSL設定：

> sudo nano /etc/apache2/sites-available/default-ssl

	把下列的紅字部分自行修改掉：

> &lt;IfModule mod_ssl.c&gt;
>
> 		&nbsp;&nbsp;&nbsp; &lt;VirtualHost _default_:443&gt;
>
> 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ServerAdmin admin@example.com
>
> 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ServerName your_domain.com
>
> 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ServerAlias www.your_domain.com
>
> 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; DocumentRoot /var/www/html
>
> 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ErrorLog ${APACHE_LOG_DIR}/error.log
>
> 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; CustomLog ${APACHE_LOG_DIR}/access.log combined
>
> 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SSLEngine on
>
> 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SSLCertificateFile /etc/apache2/ssl/apache.crt
>
> 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SSLCertificateKeyFile /etc/apache2/ssl/apache.key
>
> 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;FilesMatch &quot;.(cgi|shtml|phtml|php)$&quot;&gt;
>
> 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SSLOptions +StdEnvVars
>
> 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/FilesMatch&gt;
>
> 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;Directory /usr/lib/cgi-bin&gt;
>
> 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SSLOptions +StdEnvVars
>
> 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/Directory&gt;
>
> 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; BrowserMatch &quot;MSIE [2-6]&quot;
>
> 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; nokeepalive ssl-unclean-shutdown
>
> 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; downgrade-1.0 force-response-1.0
>
> 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; BrowserMatch &quot;MSIE [17-9]&quot; ssl-unclean-shutdown
>
> 		&nbsp;&nbsp;&nbsp; &lt;/VirtualHost&gt;
>
> 		&lt;/IfModule&gt;
> &nbsp;

	啓用新上面的VirtualHost：

> sudo a2ensite default-ssl

	重啓apache：

> sudo service apache2 restart

	&nbsp;

	參考文章：

	How To Create a SSL Certificate on Apache for Ubuntu 14.04

	[https://www.digitalocean.com/community/tutorials/how-to-create-a-ssl-certificate-on-apache-for-ubuntu-14-04](https://www.digitalocean.com/community/tutorials/how-to-create-a-ssl-certificate-on-apache-for-ubuntu-14-04)
