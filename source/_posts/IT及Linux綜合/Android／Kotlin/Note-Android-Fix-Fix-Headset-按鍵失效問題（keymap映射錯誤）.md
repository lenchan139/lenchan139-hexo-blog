---
title: '[Note/Android][Fix] Fix Headset 按鍵失效問題（keymap映射錯誤）'
tags:
  - Android
  - keymap映射
  - Headset
  - 耳機
categories:
  - IT及Linux綜合
  - Android／Kotlin
date: 2013-10-29 16:59:00
---

前略，天國的那啥……
簡單來說在XDA那終於有人 搞了個 [CM10.2 for Xperia SP(HUASHAN)](http://forum.xda-developers.com/showpost.php?p=46893265&#038;postcount=253) 然而卻發現媽媽玩沒多久就發現Headset的按鈕不能用。
於是馬上找來Keycode Displayer（[Google Play下載](https://play.google.com/store/apps/details?id=jp.ne.neko.freewing.KeyCodeDisp)）看看是否映射錯誤……

`188,00008,000000,59200, 'BUTTON_1'`

果然耳機被映射到** BUTTON_1**上面了……
好吧使用CM File Manager（或者其他有ROOT權限的File Manager也可，例如 [這個](https://play.google.com/store/apps/details?id=com.jrummy.root.browserfree) ），並切換到ROOT MODE然後進入** /system/usr/keylayout/ **目錄並找到 **generic.kl** 這個文件編輯……然後依順序找到第一行有 **BUTTON_1** 的……
於是我找到的是

`key 256 BUTTON_1`

把它修改為

`key 256 MEDIA_PLAY_PAUSE`

重啟！一切正常！Cheer ![🙂](https://s.w.org/images/core/emoji/2.4/72x72/1f642.png)
