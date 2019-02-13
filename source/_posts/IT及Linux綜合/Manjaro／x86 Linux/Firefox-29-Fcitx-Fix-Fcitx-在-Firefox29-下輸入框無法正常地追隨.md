---
uuid: a26b782a-2fbc-11e9-8b4d-05d549662b79
title: '[Firefox 29][Fcitx]Fix Fcitx 在 Firefox29 下輸入框無法正常地追隨'
tags:
  - Chakra Linux
  - Firefox
  - fcitx
  - rime
  - mozc
  - GTK
  - module
categories:
  - IT及Linux綜合
  - Manjaro／x86 Linux
date: 2014-05-08 13:05:47
---

如題

	這個問題只需要搞搞GTK IMMODULE 的cache即可

>
> sudo gtk-query-immodules-2.0 --update-cache

	特別感謝 Fcitx的作者 Xuetian 菊苣花了整晚+整個上午幫我排除故障&gt;&lt;

	（不過，這個問題似乎只有在Chakra Linux出現呢&hellip;&hellip;）

	&nbsp;
