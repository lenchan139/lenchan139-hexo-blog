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

<div class="code-embed-wrapper">

    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash`</pre> <div class="code-embed-infos"> </div> </div>

    or你鍾意wget多啲嘅話：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash`</pre> <div class="code-embed-infos"> </div> </div>

    mac嘅話可以透過homebrew 安裝：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`brew install nvm`</pre> <div class="code-embed-infos"> </div> </div>

    之後edit bash profile。

    Linux：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`nano ~/.bashrc`</pre> <div class="code-embed-infos"> </div> </div>

    Mac：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`nano ~/.bash_profileb`</pre> <div class="code-embed-infos"> </div> </div>

    加入：

    <div class="code-embed-wrapper"> <pre class="language-javascript code-embed-pre"  data-start="1" data-line-offset="0">`export NVM_DIR=&quot;$HOME/.nvm&quot;
    [ -s &quot;$NVM_DIR/nvm.sh&quot; ] &amp;&amp; . &quot;$NVM_DIR/nvm.sh&quot; # This loads nvm`</pre> <div class="code-embed-infos"> </div> </div>

    重新載入設定。

    Linux：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`source  ~/.bashrc`</pre> <div class="code-embed-infos"> </div> </div>

    Mac：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`source ~/.bash_profile`</pre> <div class="code-embed-infos"> </div> </div>

    搜尋可使用版本：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`nvm ls-remote`</pre> <div class="code-embed-infos"> </div> </div>

    安裝自定版本，以v9.0.0爲例：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`nvm install v9.0.0`</pre> <div class="code-embed-infos"> </div> </div>

    確定真的安裝好了：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`nvm ls`</pre> <div class="code-embed-infos"> </div> </div>

    首先init個project：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`cd &lt;your project path&gt;`</pre> <div class="code-embed-infos"> </div> </div>

    init個project（會有指示，跟住做就係）：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`npm init`</pre> <div class="code-embed-infos"> </div> </div>

    總之寫啲code後然後執行嘅話：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`node index.js`</pre> <div class="code-embed-infos"> </div> </div>

    要長期執行嘅話可以透過pm2做deamon執行，安裝：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`npm install pm2 -g`</pre> <div class="code-embed-infos"> </div> </div>

    令pm2會自動執行：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`pm2 startup ubuntu`</pre> <div class="code-embed-infos"> </div> </div>

    host 個 app：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`pm2 start index.js`</pre> <div class="code-embed-infos"> </div> </div>

    查看host咗嘅app嘅狀態：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`pm status`</pre> <div class="code-embed-infos"> </div> </div>

    停個app：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`pm stop index`</pre> <div class="code-embed-infos"> </div> </div>

    移除個app：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`pm delete index
 <div class="code-embed-infos"> </div> </div>

&nbsp;

Ref:

如何在 Mac OSX Lion 上設定 node.js 的開發環境 | DreamersLab

[http://dreamerslab.com/blog/tw/how-to-setup-a-node-js-development-environment-on-mac-osx-lion/](http://dreamerslab.com/blog/tw/how-to-setup-a-node-js-development-environment-on-mac-osx-lion/)

Telegram Bot 開發起手式 &#8211; Peng Jie&#8217;s Blog

[https://neighborhood999.github.io/2016/07/19/Develop-telegram-bot/](https://neighborhood999.github.io/2016/07/19/Develop-telegram-bot/)

creationix/nvm: Node Version Manager -GitHub

[https://github.com/creationix/nvm](https://github.com/creationix/nvm)

How To Set Up a Node.js Application for Production on Ubuntu 14.04 | DigitalOcean [https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-14-04](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-14-04)
