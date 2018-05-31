---
title: '[Docker/Ubuntu]喺Ubuntu Server 16.04上面部署Mastodon！'
tags:
  - Linux Server
date: 2017-04-23 20:40:55
---

For English Speaker who use Archlinux to deploy:&nbsp;[https://gist.github.com/xatier/60894616c88695d2e5b7c9ddcb64305c](https://gist.github.com/xatier/60894616c88695d2e5b7c9ddcb64305c)

	#

	<font face="Arial Unicode MS"><font size="2">前言：</font></font>

	<font face="Arial Unicode MS"><font size="2">今次要搞嘅喺</font></font>Mastodon<font face="Arial Unicode MS"><font size="2">，一個去中央化嘅類</font></font>Twitter<font face="Arial Unicode MS"><font size="2">社交平臺。首先同</font></font>Twitter<font face="Arial Unicode MS"><font size="2">一樣喺可以</font></font>Hide NSFW<font face="Arial Unicode MS"><font size="2">嘅圖片，其次</font></font>Post<font face="Arial Unicode MS"><font size="2">嘅結構喺同</font></font>Twitter<font face="Arial Unicode MS"><font size="2">一樣，每個</font></font>post<font face="Arial Unicode MS"><font size="2">喺獨立個體（最多</font></font>refer<font face="Arial Unicode MS"><font size="2">返上層係咩）。而同</font></font>Twitter<font face="Arial Unicode MS"><font size="2">最大分別第一梗係無廣告、條</font></font>Timeline<font face="Arial Unicode MS"><font size="2">終於喺照時間排。字數限制放寬到</font></font>500<font face="Arial Unicode MS"><font size="2">字，甚至可以</font></font>set<font face="Arial Unicode MS"><font size="2">類似以前</font></font>blog<font face="Arial Unicode MS"><font size="2">嘅 「閱讀更多」嘅功能。</font></font>

	<font face="Arial Unicode MS"><font size="2">如果你英文</font></font>ok<font face="Arial Unicode MS"><font size="2">嘅話，呢度有更詳盡嘅介紹：</font></font>[https://opensource.com/article/17/4/guide-to-mastodon](https://opensource.com/article/17/4/guide-to-mastodon)

	<font face="Arial Unicode MS"><font size="2">或者直頭上佢嘅</font></font>GitHub<font face="Arial Unicode MS"><font size="2">研究：</font></font>[https://github.com/tootsuite/mastodon](https://github.com/tootsuite/mastodon)

	#

	<font face="Arial Unicode MS"><font size="2">其實宜家喺可以透過</font></font>Scalingo/Heroku<font face="Arial Unicode MS"><font size="2">等現成嘅</font></font>Platform<font face="Arial Unicode MS"><font size="2">一鍵</font></font>Deploy<font face="Arial Unicode MS"><font size="2">。好處固然喺方便，但喺，其實咁一鍵</font></font>Deploy<font face="Arial Unicode MS"><font size="2">亦會引發好多</font></font>Bug<font face="Arial Unicode MS"><font size="2">，例如唔用得</font></font>Gif<font face="Arial Unicode MS"><font size="2">同個</font></font>Timeline<font face="Arial Unicode MS"><font size="2">唔識</font></font>Auto-Refresh&mdash;&mdash;<font face="Arial Unicode MS"><font size="2">當然如果呢包容到嘅話，咁未嘗唔喺唔用得嘅。</font></font>

	<font face="Arial Unicode MS"><font size="2">咁今次呢篇文章就喺直接喺乜柒都無，乾淨嘅</font></font>Ubuntu Server 16.04<font face="Arial Unicode MS"><font size="2">上面透過</font></font>Docker<font face="Arial Unicode MS"><font size="2">裝</font></font>Mastodon<font face="Arial Unicode MS"><font size="2">。</font></font>

	<font face="Arial Unicode MS"><font size="2">首先開始之前，你必須準備好：</font></font>

	1.<font face="Arial Unicode MS"><font size="2">一部有</font></font>Public IP<font face="Arial Unicode MS"><font size="2">嘅</font></font>Ubuntu Server 16.04<font face="Arial Unicode MS"><font size="2">（當然唔喺</font></font>Ubuntu<font face="Arial Unicode MS"><font size="2">都得，但喺唔保證步驟會否唔同，推介用</font></font>Digital Ocean<font face="Arial Unicode MS"><font size="2">：</font></font>[https://m.do.co/c/86456b880fed](https://m.do.co/c/86456b880fed)<font face="Arial Unicode MS"><font size="2">）</font></font>

	2.SMTP <font face="Arial Unicode MS"><font size="2">嘅賬戶（用來</font></font>send activate mail<font face="Arial Unicode MS"><font size="2">，當然你一個人用咁可以慳返。下文最後會有點人手</font></font>activate<font face="Arial Unicode MS"><font size="2">）</font></font>

	3.<font face="Arial Unicode MS"><font size="2">一個自家</font></font>Domain<font face="Arial Unicode MS"><font size="2">（無嘅可以喺度買返個：</font></font>[https://www.name.com/referral/204a34](https://www.name.com/referral/204a34)<font face="Arial Unicode MS"><font size="2">）</font></font>

	4.AMS S3<font face="Arial Unicode MS"><font size="2">帳號（如果你放喺個</font></font>vps<font face="Arial Unicode MS"><font size="2">入面嘅話，可以跳過呢步）</font></font>

	#

	<font face="Arial Unicode MS"><font size="2">首先就梗係登入</font></font>VPS<font face="Arial Unicode MS"><font size="2">，並更新系統（最好喺root啦）。</font></font>

> apt-get update &amp;&amp; apt-get upgrade

	<font face="Arial Unicode MS"><font size="2">跟住裝好一堆包</font></font>

> apt-get install -y python3-pip unzip docker.io nginx git letsencrypt
> 
> 		pip3 install docker-compose

	<font face="Arial Unicode MS"><font size="2">製作</font></font>swapfile<font face="Arial Unicode MS"><font size="2">（唔係會電腦大爆炸）</font></font>

> fallocate -l 4G /swapfile chmod 600 /swapfile mkswap /swapfile swapon /swapfile echo &#39;/swapfile none swap sw 0 0&#39; | sudo tee -a /etc/fstab

	<font face="Arial Unicode MS"><font size="2">下載個</font></font>mastodon<font face="Arial Unicode MS"><font size="2">嘅</font></font>source code<font face="Arial Unicode MS"><font size="2">並進入目錄</font></font>

> git clone https://github.com/tootsuite/mastodon.git
> 
> 		cd mastodon

	用tag搵下最新版：

> git tag -l

	跟住選擇最新版：

> git checkout &lt;tag_name&gt;

	<font face="Arial Unicode MS"><font size="2">複製設定檔並編輯</font></font>

> &nbsp;cp .env.production.sample .env.production
> 
> 		&nbsp;nano .env.production

	<font face="Arial Unicode MS"><font size="2">修改 </font></font>Federation <font face="Arial Unicode MS"><font size="2">部分</font></font>

> # Federation LOCAL_DOMAIN=&lt;your.domain&gt; LOCAL_HTTPS=true

	<font face="Arial Unicode MS"><font size="2">離開，跟住</font></font>build<font face="Arial Unicode MS"><font size="2">：</font></font>

> docker-compose build

	<font face="Arial Unicode MS"><font size="2">跟住</font></font>gen <font face="Arial Unicode MS"><font size="2">三條</font></font>Key<font face="Arial Unicode MS"><font size="2">，並儲存好先（行</font></font>1<font face="Arial Unicode MS"><font size="2">次</font></font>1<font face="Arial Unicode MS"><font size="2">條，所以要行</font></font>3<font face="Arial Unicode MS"><font size="2">次）：</font></font>

> docker-compose run &#8211;rm web rake secret

	<font face="Arial Unicode MS"><font size="2">再打開設定檔：</font></font>

> nano .env.production

	<font face="Arial Unicode MS"><font size="2">張</font></font>key<font face="Arial Unicode MS"><font size="2">填入下面三行：</font></font>

> # Application secrets # Generate each with the `rake secret` task (`docker-compose run &#8211;rm web rake secret` if you use docker compose) PAPERCLIP_SECRET=&lt;key1&gt; SECRET_KEY_BASE=&lt;key2&gt; OTP_SECRET=&lt;key3&gt;

	（可選）如果您需要，請填入SMTP部分，最簡單嘅你可以註冊一個Gmail帳號然後問Google：

> # E-mail configuration
> 
> 		# Note: Mailgun and SparkPost (https://sparkpo.st/smtp) each have good free tiers
> 
> 		SMTP_SERVER=&lt;smtp.domain.here&gt;
> 
> 		SMTP_PORT=587 SMTP_LOGIN=&lt;login_id&gt;
> 
> 		SMTP_PASSWORD=&lt;password&gt;
> 
> 		SMTP_FROM_ADDRESS=&lt;FROM_ADDRESS&gt; #啫係顯示喺收件人度嘅來源電郵 #SMTP_DELIVERY_METHOD=smtp
> 
> 		#SMTP_AUTH_METHOD=plain
> 
> 		#SMTP_OPENSSL_VERIFY_MODE=peer
> 
> 		#SMTP_ENABLE_STARTTLS_AUTO=true

	<font face="Arial Unicode MS"><font size="2">（可選）跟住喺</font></font>AMS S3 <font face="Arial Unicode MS"><font size="2">嘅設定，若果你肯定你嘅</font></font>VPS<font face="Arial Unicode MS"><font size="2">空間足夠嘅，或者唔知發生咩事嘅都可以跳過（你可以到 </font></font>[https://console.aws.amazon.com/iam/home?region=ap-northeast-1#/security_credential](https://console.aws.amazon.com/iam/home?region=ap-northeast-1#/security_credential) <font face="Arial Unicode MS"><font size="2">生成</font></font>Access Key<font face="Arial Unicode MS"><font size="2">）：</font></font>

> # S3 (optional)
> 
> 		S3_ENABLED=true
> 
> 		S3_BUCKET=&lt;bucket name&gt;
> 
> 		AWS_ACCESS_KEY_ID= &lt;ACCESS_KEY&gt;
> 
> 		AWS_SECRET_ACCESS_KEY=&lt;ACCESS_KEY_SECRET&gt;
> 
> 		S3_REGION=ap-northeast-1 #<font face="Arial Unicode MS"><font size="2">呢個喺日本東京，唔喺呢個嘅你要搵返係咩</font></font>
> 
> 		S3_PROTOCOL=https

	<font face="Arial Unicode MS"><font size="2">跟住</font></font>init<font face="Arial Unicode MS"><font size="2">個</font></font>database<font face="Arial Unicode MS"><font size="2">：</font></font>

> sudo docker-compose run &#8211;rm web rails db:migrate
> 
> 		sudo docker-compose run &#8211;rm web rails assets:precompile&nbsp;

	<font face="Arial Unicode MS"><font size="2">等佢行完之後推起個</font></font>Mastodon<font face="Arial Unicode MS"><font size="2">：</font></font>

> sudo docker-compose up -d

	<font face="Arial Unicode MS"><font size="2">咁佢就會喺</font></font>yourip:3000<font face="Arial Unicode MS"><font size="2">度行。</font></font>

	#

	<font face="Arial Unicode MS"><font size="2">咁</font></font>3000port<font face="Arial Unicode MS"><font size="2">就好肉酸嘅，之後我哋嚟設定</font></font>nginx<font face="Arial Unicode MS"><font size="2">同</font></font>SSL<font face="Arial Unicode MS"><font size="2">，畀個</font></font>domain<font face="Arial Unicode MS"><font size="2">佢（你包容到</font></font>HTTP<font face="Arial Unicode MS"><font size="2">嘅可以跳過嘅）：</font></font>

	<font face="Arial Unicode MS"><font size="2">打開設定檔一號：</font></font>

> sudo nano /etc/nginx/sites-available/default

	<font face="Arial Unicode MS"><font size="2">喺呢個</font></font>function<font face="Arial Unicode MS"><font size="2">嘅內部：</font></font>

> server {
> 
> 		listen 80 default_server;
> 
> 		listen [::]:80 default_server;
> 
> 		}

	<font face="Arial Unicode MS"><font size="2">鍵入：</font></font>

> location ~ /.well-known { allow all; }

	&nbsp;

	<font face="Arial Unicode MS"><font size="2">測試有無錯：</font></font>

> nginx -t

	<font face="Arial Unicode MS"><font size="2">重開：</font></font>

> systemctl restart nginx

	<font face="Arial Unicode MS"><font size="2">之後開始</font></font>set-up ssl<font face="Arial Unicode MS"><font size="2">：</font></font>

> letsencrypt certonly -a webroot &#8211;webroot-path=/var/www/html -d your.domain -d sub.your.domain

	<font face="Arial Unicode MS"><font size="2">跟住做，</font></font>ok<font face="Arial Unicode MS"><font size="2">之後可以檢查下有無成功出到</font></font>letsencrypt<font face="Arial Unicode MS"><font size="2">嘅</font></font>key<font face="Arial Unicode MS"><font size="2">：</font></font>

> ls -l /etc/letsencrypt/live/your_domain_name

	<font face="Arial Unicode MS"><font size="2">出自己嘅</font></font>ssl key<font face="Arial Unicode MS"><font size="2">：</font></font>

> openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048

	<font face="Arial Unicode MS"><font size="2">跟住繼續改設定檔：</font></font>

> nano /etc/nginx/snippets/ssl-your.domain.conf

	<font face="Arial Unicode MS"><font size="2">加入兩行：</font></font>

> ssl_certificate /etc/letsencrypt/live/your.domain/fullchain.pem;
> 
> 		ssl_certificate_key /etc/letsencrypt/live/your.domain/privkey.pem;

	<font face="Arial Unicode MS"><font size="2">再修改</font></font>ssl <font face="Arial Unicode MS"><font size="2">嘅 </font></font>params conf<font face="Arial Unicode MS"><font size="2">：</font></font>

> sudo nano /etc/nginx/snippets/ssl-params.conf

	<font face="Arial Unicode MS"><font size="2">內文（原則上應該冇嘢要改嘅）：</font></font>

> # from https://cipherli.st/
> 
> 		# and https://raymii.org/s/tutorials/Strong_SSL_Security_On_nginx.html
> 
> 		ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
> 
> 		ssl_prefer_server_ciphers on;
> 
> 		ssl_ciphers &quot;EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH&quot;;
> 
> 		ssl_ecdh_curve secp384r1;
> 
> 		ssl_session_cache shared:SSL:10m;
> 
> 		ssl_session_tickets off;
> 
> 		ssl_stapling on;
> 
> 		ssl_stapling_verify on;
> 
> 		resolver 8.8.8.8 8.8.4.4 valid=300s;
> 
> 		resolver_timeout 5s;
> 
> 		# Disable preloading HSTS for now. &nbsp;You can use the commented out header line that includes
> 
> 		# the &quot;preload&quot; directive if you understand the implications.
> 
> 		#add_header Strict-Transport-Security &quot;max-age=63072000; includeSubdomains; preload&quot;;
> 
> 		add_header Strict-Transport-Security &quot;max-age=63072000; includeSubdomains&quot;;
> 
> 		add_header X-Frame-Options DENY;
> 
> 		add_header X-Content-Type-Options nosniff;
> 
> 		ssl_dhparam /etc/ssl/certs/dhparam.pem;

	<font face="Arial Unicode MS"><font size="2">之後開啓</font></font><font face="Arial Unicode MS"><font size="2">做</font></font>port forwarding<font face="Arial Unicode MS"><font size="2">：</font></font>

> nano /etc/nginx/sites-enabled/mastodon_nginx.conf

	<font face="Arial Unicode MS"><font size="2">內文：</font></font>

> map $http_upgrade $connection_upgrade {
> 
> 		&nbsp; default upgrade;
> 
> 		&nbsp; &#39;&#39; &nbsp; &nbsp; &nbsp;close;
> 
> 		}
> 
> 		server {
> 
> 		&nbsp; listen 80;
> 
> 		&nbsp; listen [::]:80;
> 
> 		&nbsp; server_name your.domain;
> 
> 		&nbsp; # Useful for Let&#39;s Encrypt
> 
> 		&nbsp; location /.well-known/acme-challenge/ { allow all; }
> 
> 		&nbsp; location / { return 301 https://$host$request_uri; }
> 
> 		}
> 
> 		server {
> 
> 		&nbsp; listen 443 ssl;
> 
> 		&nbsp; listen [::]:443 ssl;
> 
> 		&nbsp; server_name your.domain;
> 
> 		&nbsp; ssl_protocols TLSv1.2;
> 
> 		&nbsp; ssl_ciphers EECDH+AESGCM:EECDH+AES;
> 
> 		&nbsp; ssl_ecdh_curve prime256v1;
> 
> 		&nbsp; ssl_prefer_server_ciphers on;
> 
> 		&nbsp; ssl_session_cache shared:SSL:10m;
> 
> 		&nbsp; ssl_certificate &nbsp; &nbsp; /etc/letsencrypt/live/example.com/fullchain.pem;
> 
> 		&nbsp; ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
> 
> 		&nbsp; ssl_dhparam &nbsp; &nbsp; &nbsp; &nbsp; /etc/ssl/certs/dhparam.pem;
> 
> 		&nbsp; keepalive_timeout &nbsp; &nbsp;70;
> 
> 		&nbsp; sendfile &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; on;
> 
> 		&nbsp; client_max_body_size 0;
> 
> 		&nbsp; root /home/mastodon/live/public;
> 
> 		&nbsp; gzip on;
> 
> 		&nbsp; gzip_disable &quot;msie6&quot;;
> 
> 		&nbsp; gzip_vary on;
> 
> 		&nbsp; gzip_proxied any;
> 
> 		&nbsp; gzip_comp_level 6;
> 
> 		&nbsp; gzip_buffers 16 8k;
> 
> 		&nbsp; gzip_http_version 1.1;
> 
> 		&nbsp; gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
> 
> 		&nbsp; add_header Strict-Transport-Security &quot;max-age=31536000&quot;;
> 
> 		&nbsp; location / {
> 
> 		&nbsp; &nbsp; try_files $uri @proxy;
> 
> 		&nbsp; }
> 
> 		&nbsp; location @proxy {
> 
> 		&nbsp; &nbsp; proxy_set_header Host $host;
> 
> 		&nbsp; &nbsp; proxy_set_header X-Real-IP $remote_addr;
> 
> 		&nbsp; &nbsp; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
> 
> 		&nbsp; &nbsp; proxy_set_header X-Forwarded-Proto https;
> 
> 		&nbsp; &nbsp; proxy_set_header Proxy &quot;&quot;;
> 
> 		&nbsp; &nbsp; proxy_pass_header Server;
> 
> 		&nbsp; &nbsp; proxy_pass http://127.0.0.1:3000;
> 
> 		&nbsp; &nbsp; proxy_buffering off;
> 
> 		&nbsp; &nbsp; proxy_redirect off;
> 
> 		&nbsp; &nbsp; proxy_http_version 1.1;
> 
> 		&nbsp; &nbsp; proxy_set_header Upgrade $http_upgrade;
> 
> 		&nbsp; &nbsp; proxy_set_header Connection $connection_upgrade;
> 
> 		&nbsp; &nbsp; tcp_nodelay on;
> 
> 		&nbsp; }
> 
> 		&nbsp; location /api/v1/streaming {
> 
> 		&nbsp; &nbsp; proxy_set_header Host $host;
> 
> 		&nbsp; &nbsp; proxy_set_header X-Real-IP $remote_addr;
> 
> 		&nbsp; &nbsp; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
> 
> 		&nbsp; &nbsp; proxy_set_header X-Forwarded-Proto https;
> 
> 		&nbsp; &nbsp; proxy_set_header Proxy &quot;&quot;;
> 
> 		&nbsp; &nbsp; proxy_pass http://localhost:4000;
> 
> 		&nbsp; &nbsp; proxy_buffering off;
> 
> 		&nbsp; &nbsp; proxy_redirect off;
> 
> 		&nbsp; &nbsp; proxy_http_version 1.1;
> 
> 		&nbsp; &nbsp; proxy_set_header Upgrade $http_upgrade;
> 
> 		&nbsp; &nbsp; proxy_set_header Connection $connection_upgrade;
> 
> 		&nbsp; &nbsp; tcp_nodelay on;
> 
> 		&nbsp; }
> 
> 		&nbsp; error_page 500 501 502 503 504 /500.html;
> 
> 		}

	<font face="Arial Unicode MS"><font size="2">記得</font></font>set<font face="Arial Unicode MS"><font size="2">好你啲</font></font>DNS record<font face="Arial Unicode MS"><font size="2">，跟住重開：</font></font>

> systemctl restart nginx

	<font face="Arial Unicode MS"><font size="2">就應該得架啦。</font></font>

	<font face="Arial Unicode MS"><font size="2">之後打開網頁，註冊。</font></font>

	&nbsp;<font face="Arial Unicode MS"><font size="2">如果你要人手驗證嘅話鍵入：</font></font>

> docker-compose run &#8211;rm web rails mastodon:confirm_email USER_EMAIL=&lt;[user@domain.mail](mailto:user@domain.mail)&gt;

	<font face="Arial Unicode MS"><font size="2">要變人做管理員鍵入：</font></font>

> sudo docker-compose run &#8211;rm web rails mastodon:make_admin USERNAME=&lt;username&gt;

	<font face="Arial Unicode MS"><font size="2">完，多謝收睇，以下喺常用</font></font>Command<font face="Arial Unicode MS"><font size="2">嘅時間。</font></font>

	#

	#<font face="Arial Unicode MS"><font size="2">下載最新嘅</font></font>source code

> <a name="2303"></a>git clone [https://github.com/tootsuite/mastodon.git](https://github.com/tootsuite/mastodon.git) cd mastodon

	#del<font face="Arial Unicode MS"><font size="2">咗隻</font></font>app

> docker-compose down

	#<font face="Arial Unicode MS"><font size="2">重新部署隻</font></font>app

> docker-compose build

	#<font face="Arial Unicode MS"><font size="2">更新</font></font>database

> docker-compose run &#8211;rm web rails db:migrate docker-compose run &#8211;rm web rails assets:precompile

	#<font face="Arial Unicode MS"><font size="2">行隻</font></font>app as deamon services

> docker-compose up -d

	#<font face="Arial Unicode MS"><font size="2">開個</font></font>docker app<font face="Arial Unicode MS"><font size="2">同時睇</font></font>log<font face="Arial Unicode MS"><font size="2">（</font></font>ctrl+C<font face="Arial Unicode MS"><font size="2">會熄咗隻</font></font>app<font face="Arial Unicode MS"><font size="2">）</font></font>

> docker-compose up

	#<font face="Arial Unicode MS"><font size="2">將某人變做管理員</font></font>

> docker-compose run &#8211;rm web rails mastodon:make_admin USERNAME=&lt;username&gt;

	#<font face="Arial Unicode MS"><font size="2">人手驗證：</font></font>

> docker-compose run &#8211;rm web rails mastodon:confirm_email USER_EMAIL=&lt;[user@domain.mail](mailto:user@domain.mail)&gt;

	#

	Ref：

	[AWSのEC2で最小限の努力でmastodonを構築する &#8211;&nbsp;tsuitta_dayo@Qiita](http://qiita.com/tsuitta_dayo/items/dfd659ec68435653d16a)

	[DockerでMastodonをローカルで動かしてみた！ ので、その方法をご紹介。 &#8211;&nbsp;AKITA SOLUTION MAGAZINE](https://ai-create.net/magazine/2017/04/15/mastodonをdockerでローカルに構築してみた！-ので、その方/)

	[Deploying Mastodon on Digital&nbsp;Ocean &#8211;&nbsp;Ray Alez@Hackermoon](https://hackernoon.com/deploying-mastodon-on-digital-ocean-f54b94c7f5b8)

	[How To Secure Nginx with Let&#39;s Encrypt on Ubuntu 16.04 &#8211; Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04)

	[Production Guide &#8211; Mastodon Docs](https://github.com/tootsuite/documentation/blob/master/Running-Mastodon/Production-guide.md)

	[xatier/Mastodon on GCE.md](https://gist.github.com/xatier/60894616c88695d2e5b7c9ddcb64305c)

	<your.domain><key1><key2><key3><smtp.domain.here><login_id><password><from_address><access_key><access_key_secret><user@domain.mail><username><username><user@domain.mail></user@domain.mail></username></username></user@domain.mail></access_key_secret></access_key></from_address></password></login_id></smtp.domain.here></key3></key2></key1></your.domain>