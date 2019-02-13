---
uuid: a26c1465-2fbc-11e9-8b4d-05d549662b79
title: '[Ubuntu]爲Chromium添加Chrome中的PDF Reader'
tags:
  - Linux
  - Ubuntu
  - Chromium
  - PDF
  - PDF Reader
categories:
  - IT及Linux綜合
  - Manjaro／x86 Linux
date: 2012-12-20 08:46:00
---

在Chrome裏面，預裝了不少便利的功能，例如說Flash以及PDF Reader等等。但到了Chromoium，由於有關功能的包有授權上的問題，所以無法整合到Ubuntu或Chromium裏面去，所以要用到PDF Reader，只能自己動手豐衣足食啦。



首先在 [https://chrome.google.com](https://chrome.google.com/) 下載最新版本的Deb包，然後不要直接安裝，首先先解壓縮。

然後應該得出一個文件夾。

![螢幕擷圖存為 2012-12-20 00:17:08](https://lenchan139.files.wordpress.com/2012/12/e89ea2e5b995e693b7e59c96e5ad98e782ba-2012-12-20-001708.png)

打開文件夾，在 google-chrome-stable_current_i386/opt/google/chrome/ 下找到了 libpdf.so 這個文件。

![螢幕擷圖存為 2012-12-20 00:19:30](https://lenchan139.files.wordpress.com/2012/12/e89ea2e5b995e693b7e59c96e5ad98e782ba-2012-12-20-001930.png)

複製這個檔案，然後打開 終端機 執行：

sudo nautilus

然後進入 /usr/lib/chromium-browser/ ，
並將 libpdf.so 放進該處。
![螢幕擷圖存為 2012-12-20 00:41:07](https://lenchan139.files.wordpress.com/2012/12/e89ea2e5b995e693b7e59c96e5ad98e782ba-2012-12-20-004107.png)

之後打開一個pdf檔案看看：

![螢幕擷圖存為 2012-12-20 00:43:45](https://lenchan139.files.wordpress.com/2012/12/e89ea2e5b995e693b7e59c96e5ad98e782ba-2012-12-20-004345.png)

嗯！一切安好，完成。
