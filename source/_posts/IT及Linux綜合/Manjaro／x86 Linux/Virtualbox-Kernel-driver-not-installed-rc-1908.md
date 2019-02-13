---
uuid: a26c1467-2fbc-11e9-8b4d-05d549662b79
title: '[Virtualbox] Kernel driver not installed (rc=-1908)'
tags:
  - Linux
  - VirtualBox
  - kernel
  - driver
  - 驅動程式
  - 驅動
  - install
  - module
categories:
  - IT及Linux綜合
  - Manjaro／x86 Linux
date: 2016-11-21 19:13:02
---

如題，調查咗下，個問題係個dkms未update，鍵入：

>>
> `dkms autoinstall`

	`之後開啓個module：`

>>
> `modprobe vboxdrv4`>
>

	`Reference：`

	`[https://bbs.archlinux.org/viewtopic.php?id=111368](https://bbs.archlinux.org/viewtopic.php?id=111368)`
