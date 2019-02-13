---
uuid: 06c02191-2fbd-11e9-89cb-3d3b7bb24e51
title: 喺Ubuntu Server 16.04上面部署Mastodon!
tags:
  - Linux Server
  - Linux
  - Server
  - Ubuntu
  - Mastodon
  - Docker
  - SNS
  - Twitter
categories:
  - IT及Linux綜合
  - Linux Server
date: 2017-04-23 20:40:55
---


For English Speaker who use Archlinux to deploy:[https://gist.github.com/xatier/60894616c88695d2e5b7c9ddcb64305c](https://gist.github.com/xatier/60894616c88695d2e5b7c9ddcb64305c)

前言

    如果你英文ok嘅話，呢度有更詳盡嘅介紹：[https://opensource.com/article/17/4/guide-to-mastodon
        (https://opensource.com/article/17/4/guide-to-mastodon)

或者直頭上佢嘅GitHub研究：[https://github.com/tootsuite/mastodon](https://github.com/tootsuite/mastodon)

        #

        其實宜家喺可以透過Scalingo/Heroku等現成嘅Platform一鍵Deploy。好處固然喺方便，但喺，其實咁一鍵Deploy亦會引發好多Bug，例如唔用得Gif同個Timeline唔識Auto-Refresh&mdash;&mdash;當然如果呢包容到嘅話，咁未嘗唔喺唔用得嘅。

        咁今次呢篇文章就喺直接喺乜柒都無，乾淨嘅Ubuntu Server 16.04上面透過Docker裝Mastodon。

        首先開始之前，你必須準備好：

        1.一部有Public IP嘅Ubuntu Server 16.04（當然唔喺Ubuntu都得，但喺唔保證步驟會否唔同，推介用Digital Ocean：[https://m.do.co/c/86456b880fed](https://m.do.co/c/86456b880fed)）

        2.SMTP 嘅賬戶（用來send activate mail，當然你一個人用咁可以慳返。下文最後會有點人手activate）

        3.一個自家Domain（無嘅可以喺度買返個：[https://www.name.com/referral/204a34](https://www.name.com/referral/204a34)）

        4.AMS S3帳號（如果你放喺個vps入面嘅話，可以跳過呢步）

        #

首先就梗係登入VPS，並更新系統（最好喺root啦）。

> apt-get update &amp;&amp; apt-get upgrade

跟住裝好一堆包

> apt-get install -y python3-pip unzip docker.io nginx git letsencrypt
>
>                 pip3 install docker-compose

製作swapfile（唔係會電腦大爆炸）

> fallocate -l 4G /swapfile chmod 600 /swapfile mkswap /swapfile swapon /swapfile echo &#39;/swapfile none swap sw 0 0&#39; | sudo tee -a /etc/fstab

下載個mastodon嘅source code並進入目錄

> git clone https://github.com/tootsuite/mastodon.git
>
>                 cd mastodon

用tag搵下最新版：

> git tag -l

跟住選擇最新版：

> git checkout &lt;tag_name&gt;

複製設定檔並編輯

> &nbsp;cp .env.production.sample .env.production
>
>                 &nbsp;nano .env.production

修改 Federation 部分

> # Federation LOCAL_DOMAIN=&lt;your.domain&gt; LOCAL_HTTPS=true

離開，跟住build：

> docker-compose build

跟住gen 三條Key，並儲存好先（行1次1條，所以要行3次）：

> docker-compose run &#8211;rm web rake secret

再打開設定檔：

> nano .env.production

將key填入下面三行：

> # Application secrets # Generate each with the `rake secret` task (`docker-compose run &#8211;rm web rake secret` if you use docker compose) PAPERCLIP_SECRET=&lt;key1&gt; SECRET_KEY_BASE=&lt;key2&gt; OTP_SECRET=&lt;key3&gt;
（可選）如果您需要，請填入SMTP部分，最簡單嘅你可以註冊一個Gmail帳號然後問Google：

> # E-mail configuration
>
> # Note: Mailgun and SparkPost (https://sparkpo.st/smtp) each have good free tiers
>
>                 SMTP_SERVER=&lt;smtp.domain.here&gt;
>
>                 SMTP_PORT=587 SMTP_LOGIN=&lt;login_id&gt;
>
>                 SMTP_PASSWORD=&lt;password&gt;
>
>                 SMTP_FROM_ADDRESS=&lt;FROM_ADDRESS&gt; #啫係顯示喺收件人度嘅來源電郵 #SMTP_DELIVERY_METHOD=smtp
>
> #SMTP_AUTH_METHOD=plain
>
> #SMTP_OPENSSL_VERIFY_MODE=peer
>
> #SMTP_ENABLE_STARTTLS_AUTO=true

（可選）跟住喺AMS S3 嘅設定，若果你肯定你嘅VPS空間足夠嘅，或者唔知發生咩事嘅都可以跳過（你可以到 [https://console.aws.amazon.com/iam/home?region=ap-northeast-1#/security_credential](https://console.aws.amazon.com/iam/home?region=ap-northeast-1#/security_credential) 生成Access Key）：

> # S3 (optional)
>
>                 S3_ENABLED=true
>
>                 S3_BUCKET=&lt;bucket name&gt;
>
>                 AWS_ACCESS_KEY_ID= &lt;ACCESS_KEY&gt;
>
>                 AWS_SECRET_ACCESS_KEY=&lt;ACCESS_KEY_SECRET&gt;
>
>                 S3_REGION=ap-northeast-1 #呢個喺日本東京，唔喺呢個嘅你要搵返係咩
>
>                 S3_PROTOCOL=https

跟住init個database：

> sudo docker-compose run &#8211;rm web rails db:migrate
>
>                 sudo docker-compose run &#8211;rm web rails assets:precompile&nbsp;

等佢行完之後推起個Mastodon：

> sudo docker-compose up -d

咁佢就會喺yourip:3000度行。

#

咁3000port就好肉酸嘅，之後我哋嚟設定nginx同SSL，畀個domain佢（你包容到HTTP嘅可以跳過嘅）：

打開設定檔一號：

> sudo nano /etc/nginx/sites-available/default

喺呢個function嘅內部：

> server {
>
>                 listen 80 default_server;
>
>                 listen [::]:80 default_server;
>
>                 }

鍵入：

> location ~ /.well-known { allow all; }

        &nbsp;

        測試有無錯：

> nginx -t

        重開：

> systemctl restart nginx

        之後開始set-up ssl：

> letsencrypt certonly -a webroot &#8211;webroot-path=/var/www/html -d your.domain -d sub.your.domain

        跟住做，ok之後可以檢查下有無成功出到letsencrypt嘅key：

> ls -l /etc/letsencrypt/live/your_domain_name

        出自己嘅ssl key：

> openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048

        跟住繼續改設定檔：

> nano /etc/nginx/snippets/ssl-your.domain.conf

        加入兩行：

> ssl_certificate /etc/letsencrypt/live/your.domain/fullchain.pem;
>
>                 ssl_certificate_key /etc/letsencrypt/live/your.domain/privkey.pem;

        再修改ssl 嘅 params conf：

> sudo nano /etc/nginx/snippets/ssl-params.conf

        內文（原則上應該冇嘢要改嘅）：
> # from https://cipherli.st/
>
>                 # and https://raymii.org/s/tutorials/Strong_SSL_Security_On_nginx.html
>
>                 ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
>
>                 ssl_prefer_server_ciphers on;
>
>                 ssl_ciphers &quot;EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH&quot;;
>
>                 ssl_ecdh_curve secp384r1;
>
>                 ssl_session_cache shared:SSL:10m;
>
>                 ssl_session_tickets off;
>
>                 ssl_stapling on;
>
>                 ssl_stapling_verify on;
>
>                 resolver 8.8.8.8 8.8.4.4 valid=300s;
>
>                 resolver_timeout 5s;
>
>                 # Disable preloading HSTS for now. &nbsp;You can use the commented out header line that includes
>
>                 # the &quot;preload&quot; directive if you understand the implications.
>
>                 #add_header Strict-Transport-Security &quot;max-age=63072000; includeSubdomains; preload&quot;;
>
>                 add_header Strict-Transport-Security &quot;max-age=63072000; includeSubdomains&quot;;
>
>                 add_header X-Frame-Options DENY;
>
>                 add_header X-Content-Type-Options nosniff;
>
>                 ssl_dhparam /etc/ssl/certs/dhparam.pem;

        之後開啓做port forwarding：

> nano /etc/nginx/sites-enabled/mastodon_nginx.conf

        內文：

> map $http_upgrade $connection_upgrade {
>
>                 &nbsp; default upgrade;
>
>                 &nbsp; &#39;&#39; &nbsp; &nbsp; &nbsp;close;
>
>                 }
>
>                 server {
>
>                 &nbsp; listen 80;
>
>                 &nbsp; listen [::]:80;
>
>                 &nbsp; server_name your.domain;
>
>                 &nbsp; # Useful for Let&#39;s Encrypt
>
>                 &nbsp; location /.well-known/acme-challenge/ { allow all; }
>
>                 &nbsp; location / { return 301 https://$host$request_uri; }
>
>                 }
>
>                 server {
>
>                 &nbsp; listen 443 ssl;
>
>                 &nbsp; listen [::]:443 ssl;
>
>                 &nbsp; server_name your.domain;
>
>                 &nbsp; ssl_protocols TLSv1.2;
>
>                 &nbsp; ssl_ciphers EECDH+AESGCM:EECDH+AES;
>
>                 &nbsp; ssl_ecdh_curve prime256v1;
>
>                 &nbsp; ssl_prefer_server_ciphers on;
>
>                 &nbsp; ssl_session_cache shared:SSL:10m;
>
>                 &nbsp; ssl_certificate &nbsp; &nbsp; /etc/letsencrypt/live/example.com/fullchain.pem;
>
>                 &nbsp; ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
>
>                 &nbsp; ssl_dhparam &nbsp; &nbsp; &nbsp; &nbsp; /etc/ssl/certs/dhparam.pem;
>
>                 &nbsp; keepalive_timeout &nbsp; &nbsp;70;
>
>                 &nbsp; sendfile &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; on;
>
>                 &nbsp; client_max_body_size 0;
>
>                 &nbsp; root /home/mastodon/live/public;
>
>                 &nbsp; gzip on;
>
>                 &nbsp; gzip_disable &quot;msie6&quot;;
>
>                 &nbsp; gzip_vary on;
>
>                 &nbsp; gzip_proxied any;
>
>                 &nbsp; gzip_comp_level 6;
>
>                 &nbsp; gzip_buffers 16 8k;
>
>                 &nbsp; gzip_http_version 1.1;
>
>                 &nbsp; gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
>
>                 &nbsp; add_header Strict-Transport-Security &quot;max-age=31536000&quot;;
>
>                 &nbsp; location / {
>
>                 &nbsp; &nbsp; try_files $uri @proxy;
>
>                 &nbsp; }
>
>                 &nbsp; location @proxy {
>
>                 &nbsp; &nbsp; proxy_set_header Host $host;
>
>                 &nbsp; &nbsp; proxy_set_header X-Real-IP $remote_addr;
>
>                 &nbsp; &nbsp; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
>
>                 &nbsp; &nbsp; proxy_set_header X-Forwarded-Proto https;
>
>                 &nbsp; &nbsp; proxy_set_header Proxy &quot;&quot;;
>
>                 &nbsp; &nbsp; proxy_pass_header Server;
>
>                 &nbsp; &nbsp; proxy_pass http://127.0.0.1:3000;
>
>                 &nbsp; &nbsp; proxy_buffering off;
>
>                 &nbsp; &nbsp; proxy_redirect off;
>
>                 &nbsp; &nbsp; proxy_http_version 1.1;
>
>                 &nbsp; &nbsp; proxy_set_header Upgrade $http_upgrade;
>
>                 &nbsp; &nbsp; proxy_set_header Connection $connection_upgrade;
>
>                 &nbsp; &nbsp; tcp_nodelay on;
>
>                 &nbsp; }
>
>                 &nbsp; location /api/v1/streaming {
>
>                 &nbsp; &nbsp; proxy_set_header Host $host;
>
>                 &nbsp; &nbsp; proxy_set_header X-Real-IP $remote_addr;
>
>                 &nbsp; &nbsp; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
>
>                 &nbsp; &nbsp; proxy_set_header X-Forwarded-Proto https;
>
>                 &nbsp; &nbsp; proxy_set_header Proxy &quot;&quot;;
>
>                 &nbsp; &nbsp; proxy_pass http://localhost:4000;
>
>                 &nbsp; &nbsp; proxy_buffering off;
>
>                 &nbsp; &nbsp; proxy_redirect off;
>
>                 &nbsp; &nbsp; proxy_http_version 1.1;
>
>                 &nbsp; &nbsp; proxy_set_header Upgrade $http_upgrade;
>
>                 &nbsp; &nbsp; proxy_set_header Connection $connection_upgrade;
>
>                 &nbsp; &nbsp; tcp_nodelay on;
>
>                 &nbsp; }
>
>                 &nbsp; error_page 500 501 502 503 504 /500.html;
>
>                 }

        記得set好你啲DNS record，跟住重開：

> systemctl restart nginx

        就應該得架啦。

        之後打開網頁，註冊。

        &nbsp;如果你要人手驗證嘅話鍵入：

> docker-compose run &#8211;rm web rails mastodon:confirm_email USER_EMAIL=&lt;[user@domain.mail](mailto:user@domain.mail)&gt;

        要變人做管理員鍵入：

> sudo docker-compose run &#8211;rm web rails mastodon:make_admin USERNAME=&lt;username&gt;

        完，多謝收睇，以下喺常用Command嘅時間。

        #

        #下載最新嘅source code

> git clone [https://github.com/tootsuite/mastodon.git](https://github.com/tootsuite/mastodon.git) cd mastodon

        #del咗隻app

> docker-compose down

        #重新部署隻app

> docker-compose build

        #更新database

> docker-compose run &#8211;rm web rails db:migrate docker-compose run &#8211;rm web rails assets:precompile

        #行隻app as deamon services

> docker-compose up -d

        #開個docker app同時睇log（ctrl+C會熄咗隻app）

> docker-compose up

        #將某人變做管理員

> docker-compose run &#8211;rm web rails mastodon:make_admin USERNAME=&lt;username&gt;

        #人手驗證：

> docker-compose run &#8211;rm web rails mastodon:confirm_email USER_EMAIL=&lt;[user@domain.mail](mailto:user@domain.mail)&gt;

        #

        Ref：

        [AWSのEC2で最小限の努力でmastodonを構築する &#8211;&nbsp;tsuitta_dayo@Qiita](http://qiita.com/tsuitta_dayo/items/dfd659ec68435653d16a)

        [DockerでMastodonをローカルで動かしてみた！ ので、その方法をご紹介。 &#8211;&nbsp;AKITA SOLUTION MAGAZINE](https://ai-create.net/magazine/2017/04/15/mastodonをdockerでローカルに構築してみた！-ので、その方/)

        [Deploying Mastodon on Digital&nbsp;Ocean &#8211;&nbsp;Ray Alez@Hackermoon](https://hackernoon.com/deploying-mastodon-on-digital-ocean-f54b94c7f5b8)

        [How To Secure Nginx with Let&#39;s Encrypt on Ubuntu 16.04 &#8211; Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04)

        [Production Guide &#8211; Mastodon Docs](https://github.com/tootsuite/documentation/blob/master/Running-Mastodon/Production-guide.md)

        [xatier/Mastodon on GCE.md](https://gist.github.com/xatier/60894616c88695d2e5b7c9ddcb64305c)

        <your.domain><smtp.domain.here><user@domain.mail><user@domain.mail></user@domain.mail></user@domain.mail></smtp.domain.here></your.domain>
