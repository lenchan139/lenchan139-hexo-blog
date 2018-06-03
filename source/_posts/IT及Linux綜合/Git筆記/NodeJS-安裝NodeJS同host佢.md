---
title: '[NodeJS]安裝NodeJS同host佢'
tags:
  - GitHub
  - Linux Server
  - MacOS
  - NodeJS
  - telegram
  - bot
  - telegram bot
  - Linux
  - wget
  - curl
categories:
  - IT及Linux綜合
  - Git筆記
date: 2017-11-04 00:29:52
---

無聊又搞個telegram bot，因爲用nodejs寫所以姑且幾低啲嘢：（

首先喺安裝，Linux系列請：



    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash`   

    or你鍾意wget多啲嘅話：

     `wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash`   

    mac嘅話可以透過homebrew 安裝：

     `brew install nvm`   

    之後edit bash profile。

    Linux：

     `nano ~/.bashrc`   

    Mac：

     `nano ~/.bash_profileb`   

    加入：

     `export NVM_DIR=&quot;$HOME/.nvm&quot;
    [ -s &quot;$NVM_DIR/nvm.sh&quot; ] &amp;&amp; . &quot;$NVM_DIR/nvm.sh&quot; # This loads nvm`   

    重新載入設定。

    Linux：

     `source  ~/.bashrc`   

    Mac：

     `source ~/.bash_profile`   

    搜尋可使用版本：

     `nvm ls-remote`   

    安裝自定版本，以v9.0.0爲例：

     `nvm install v9.0.0`   

    確定真的安裝好了：

     `nvm ls`   

    首先init個project：

     `cd &lt;your project path&gt;`   

    init個project（會有指示，跟住做就係）：

     `npm init`   

    總之寫啲code後然後執行嘅話：

     `node index.js`   

    要長期執行嘅話可以透過pm2做deamon執行，安裝：

     `npm install pm2 -g`   

    令pm2會自動執行：

     `pm2 startup ubuntu`   

    host 個 app：

     `pm2 start index.js`   

    查看host咗嘅app嘅狀態：

     `pm status`   

    停個app：

     `pm stop index`   

    移除個app：

     `pm delete index


&nbsp;

Ref:

如何在 Mac OSX Lion 上設定 node.js 的開發環境 | DreamersLab

[http://dreamerslab.com/blog/tw/how-to-setup-a-node-js-development-environment-on-mac-osx-lion/](http://dreamerslab.com/blog/tw/how-to-setup-a-node-js-development-environment-on-mac-osx-lion/)

Telegram Bot 開發起手式 &#8211; Peng Jie&#8217;s Blog

[https://neighborhood999.github.io/2016/07/19/Develop-telegram-bot/](https://neighborhood999.github.io/2016/07/19/Develop-telegram-bot/)

creationix/nvm: Node Version Manager -GitHub

[https://github.com/creationix/nvm](https://github.com/creationix/nvm)

How To Set Up a Node.js Application for Production on Ubuntu 14.04 | DigitalOcean [https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-14-04](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-14-04)
