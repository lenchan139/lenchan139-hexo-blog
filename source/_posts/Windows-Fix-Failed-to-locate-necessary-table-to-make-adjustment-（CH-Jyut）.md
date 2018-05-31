---
title: '[Windows]Fix Failed to locate necessary table to make adjustment.（CH-Jyut）'
tags:
  - 電腦雜項
date: 2015-09-21 20:31:45
---

今日重裝Win7，重開每次遇到該錯誤：

> FaTAL ERROR: Failed to locate necessary table to make adjustment.
> 
> 		Press anykey to continue booting.

	經過Google及少許驗證確定係Windows分區清理唔完全，有殘渣所致，咁就解決好簡單。

	首先重開禁F8入修復mode。如果禁唔到入可以拎返cd入修復mode。

	之後係修復mode click入command prompt

	鍵入：

> bootrec.exe /fixboot

	之後再執行：

> bootrec.exe /rebuildbcd

	之後重啓便可。