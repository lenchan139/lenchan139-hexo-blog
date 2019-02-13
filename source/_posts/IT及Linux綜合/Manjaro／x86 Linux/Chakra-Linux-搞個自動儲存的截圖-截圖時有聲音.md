---
uuid: a26b7824-2fbc-11e9-8b4d-05d549662b79
title: '[Chakra/Linux]搞個自動儲存的截圖+截圖時有聲音'
tags:
  - Chakra Linux
  - KDE
  - Unity
  - Kazam
  - Shell script
  - Shell
  - mpg123
  - screenshot
  - tools
  - 小工具
  - 截圖
  - null
categories:
  - IT及Linux綜合
  - Manjaro／x86 Linux
date: 2013-10-06 15:47:00
---

 嗯，你問我最近怎麼那麼高產？衆所周知，我最近跑到了Chakra玩KDE了。衆所周知，Ksnapshot最反人類的地方是截圖不能自動儲存，超級不方便的……（人家Unity好歹也頂多按多個 Ctrl+S而已……）然後Kazam編譯不能，然後shutter並不存在……
於是我就在並非閒着蛋疼的情況下我做了個 透過mkdir、cd、scrot、Mpg123的結合，搞出一個自動拍照並儲存在特定目錄（我預設是家目錄下的Screenshot、沒有會自動創建）的小小小小小小小小小小小小小小小Shell Script。
首先，我已經將其打包了……嘛，文末有整個Shell Script內容就是。
[Mega下載](https://mega.co.nz/#!hwRTGbxB!Jy85fAaiIVUIeldNwhGHv2ftrTVg7G8QLjY90NixPl8)  [Google Drive下載](https://doc-0k-bk-docs.googleusercontent.com/docs/securesc/ha0ro937gcuc7l7deffksulhg5h7mbp1/mohpvh9qjgbq0imu6fjn3bc0g49kei25/1383235200000/16882641365391249858/*/0BzBSRKGjEaNkNlhYU2pEeEhRZlE?h=16653014193614665626&#038;e=download)

於是首先，Chakra本身並沒有scrot和播放音效用的mpg123，先來裝一把：
`ccr scrot``sudo pacman -S mpg123`

然後把解壓縮到的扔家目錄，打開konsole，把screenshot.sh改成可執行：
`chmod +x ~/.Screenshotter/screenshot.sh`

然後跑到KDE設定下自定義手勢和捷徑那修改或者新增一個Prc Sn按鈕的組合鍵盤，動作那就填入：
`~/.Screenshotter/screenshot.sh`

然後就完成了
然後以下是screenshot.sh的代碼。

` #!/bin/sh
 # ( ﾟ▽ﾟ)/The public domain Shell Script.
 #這麼簡單的Script不是共有領域一定是有病吧!(ﾟ▽ﾟ )
 #不要問我爲何註解比正文還長……(/･_･\)
 #Editor:LEN CHAN
 #If you change path , plz change path.
 #改路徑的你給我自己看着辦！

  mkdir ~/Screenshot
  cd ~/Screenshot/
  scrot
  cd ~/.Screenshotter/
  mpg123 shutter.mp3`
