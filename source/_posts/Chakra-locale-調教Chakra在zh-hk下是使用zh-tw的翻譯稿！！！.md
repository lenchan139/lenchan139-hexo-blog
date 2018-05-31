---
title: '[Chakra][locale]調教Chakra在zh-hk下是使用zh-tw的翻譯稿！！！'
tags:
  - Chakra/OpenSUSE/x86 Linux
date: 2014-05-08 18:00:54
---

承上：[[Chakra/Linux]調教VLC在zh-hk下是英文而非中文的錯誤](http://lenchan139.org/?p=239)

	我終於忍受不了了=。=所以這次便透過建立軟連結方式將zh_HK的所有翻譯轉向使用zh_TW翻譯文稿！！！

	首先，進入locale文件所在：

> cd /usr/share/locale/
> 其次，姑且備份zh_HK把，zh_HK改名：
> 
> 		sudo mv zh_HK zh_HK_Backup
> 最後建立軟連結
> 
> 		sudo ln -f -s zh_TW/ zh_HK

	&nbsp;

	完。

	===English===

	Enter the locale file path:

> cd /usr/share/locale/

	Then, backup &quot;zh_HK&quot; folder:

> sudo mv zh_HK zh_HK_Backup

	Last, create the soft link:

> sudo ln -f -s zh_TW/ zh_HK

	END.