---
title: '[Ubuntu]解決Youtube部分影片無法使用HTML5播放器播放的問題'
tags:
  - Linux
  - YouTube
  - HTML5
  - 播放器
  - 網頁
  - ffmpeg
  - chromium
  - SocREC
categories:
  - IT及Linux綜合
  - Manjaro／x86 Linux
date: 2012-12-20 07:41:00
---

我想隨着HTML5的推出，不少人都喜歡使用HTML5播放器播放Youtube影片，我也是，主要原因就是因爲HTML5的右鍵選單裏面的功能以及對Flash的厭惡。（Linux下的Flash真不是人用的……各種意義上）而跑到去Youtube播放影片的時候發現某些H.264的影片無法播放，後來經過一番搗鼓就發現了問題所在——就是預設的chromium ffmpeg套件包太渣渣以及Chromium不夠新的問題。



![螢幕擷圖存為 2012-12-19 23:40:05](https://lenchan139.files.wordpress.com/2012/12/e89ea2e5b995e693b7e59c96e5ad98e782ba-2012-12-19-234005.png)

那麼本教程就是教導大家搞定這個問題。

首先加入新的PPA源，按 Ctrl+Alt+T 打開終端機鍵入：

sudo add-apt-repository ppa:a-v-shkop/chromium

更新套件包來源列表：

sudo apt-get update

安裝Chromium：

sudo apt-get install chromium-browser

然後再安裝別的chromium ffmpeg取替：

sudo apt-get install chromium-codecs-ffmpeg-extra

然後就完成啦！打開Chromium，應該就能播放有關影片啦！

PS：人家纔不是置入性行銷，幫SocREC打廣告呢！

![螢幕擷圖存為 2012-12-19 23:48:31](https://lenchan139.files.wordpress.com/2012/12/e89ea2e5b995e693b7e59c96e5ad98e782ba-2012-12-19-234831.png)
