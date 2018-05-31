---
title: '[Firefox 29][Fcitx]Fix Fcitx 在 Firefox29 下輸入框無法正常地追隨'
tags:
  - Chakra/OpenSUSE/x86 Linux
date: 2014-05-08 13:05:47
---

如題

	這個問題只需要搞搞GTK IMMODULE 的cache即可

> <pre class="bz_comment_text" id="comment_text_1">
> sudo gtk-query-immodules-2.0 --update-cache</pre>

	特別感謝 Fcitx的作者 Xuetian 菊苣花了整晚+整個上午幫我排除故障&gt;&lt;

	（不過，這個問題似乎只有在Chakra Linux出現呢&hellip;&hellip;）

	&nbsp;