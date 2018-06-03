---
title: '[Chakra/Linux]切換VLC的語言'
tags:
  - Chakra Linux
  - Linux
  - vlc
  - konsole
  - bash
  - languge
  - 語言
categories:
  - IT及Linux綜合
  - Manjaro／x86 Linux
date: 2013-12-11 21:40:15
---

如題……

首先打開Konsole，鍵入：

> sudo dolphin /usr/bin

然後找到vlc並改名，總之長一點就ok了，我這裏就改成了 vlc-j90adojaksopof1

[](http://blog.lenchan139.com/wp-content/uploads/2013/12/2013-12-11-201208_1366x768_scrot.png)

建立一個新的文字文件並改名爲vlc，之後右鍵，把他設置爲可執行檔案。

如果要用指令設定的話就

> chmod -x /usr/bin/vlc

[](http://blog.lenchan139.com/wp-content/uploads/2013/12/2013-12-11-201321_1366x768_scrot.png)

之後用kate/nano/vim之類的編輯新建的「vlc」檔案

在裏面填入這段代碼：

> #!/bin/sh
>
> LANGUAGE=zh_TW vlc-j90adojaksopof1

[](http://blog.lenchan139.com/wp-content/uploads/2013/12/2013-12-11-213947_1366x768_scrot.png)

之後完成了:)

&nbsp;
