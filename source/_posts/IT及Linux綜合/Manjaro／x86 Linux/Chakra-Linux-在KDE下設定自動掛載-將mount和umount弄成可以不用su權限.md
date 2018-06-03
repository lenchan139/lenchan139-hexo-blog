---
title: '[Chakra/Linux]在KDE下設定自動掛載&將mount和umount弄成可以不用su權限'
tags:
  - Chakra Linux
  - Linux
  - KDE
  - mount
  - umount
  - sudo
  - su
  - superuser
  - kate
  - GTK
  - Qt
  - automount
categories:
  - IT及Linux綜合
  - Manjaro／x86 Linux
date: 2013-10-13 12:57:00
---

大家好，我是 <strike>勞模</strike> 雪娘……今天我們要搞的就乳題（捧讀）。爲什麼我會想這樣搞呢，是因爲KDE下我還是避免不了用GTK+的軟件，然後KDE下不論有沒有掛載都顯示相關記憶體，但是GTK+則掛載纔有（捧讀），因此，我就查了各種文件後搞出這個（捧讀）

首先我們來搞自動掛載，先直接鍵入：
`sudo kate /etc/udev/rules.d/11-media-by-label-auto-mount.rules`
然後扔進一下內容並儲存：

`KERNEL!="sd[a-z][0-9]", GOTO="media_by_label_auto_mount_end"

 # Import FS infos

IMPORT{program}="/sbin/blkid -o udev -p %N"

 # Get a label if present, otherwise specify one

ENV{ID_FS_LABEL}!="", ENV{dir_name}="%E{ID_FS_LABEL}"

ENV{ID_FS_LABEL}=="", ENV{dir_name}="usbhd-%k"

 # Global mount options

ACTION=="add", ENV{mount_options}="relatime"

# Filesystem-specific mount options

ACTION=="add", ENV{ID_FS_TYPE}=="vfat|ntfs", ENV{mount_options}="$env{mount_options},utf8,gid=100,umask=002"

 # Mount the device

ACTION=="add", RUN+="/bin/mkdir -p /media/%E{dir_name}", RUN+="/bin/mount -o $env{mount_options} /dev/%k /media/%E{dir_name}"

 # Clean up after removal

ACTION=="remove", ENV{dir_name}!="", RUN+="/bin/umount -l /media/%E{dir_name}", RUN+="/bin/rmdir /media/%E{dir_name}"

 # Exit

LABEL="media_by_label_auto_mount_end"

`
然後再來修改，讓mount/umount不用su權限：
`sudo kate /usr/share/polkit-1/actions/org.freedesktop.udisks2.policy`
搜尋所有：
`<allow_active>auth_admin_keep</allow_active>` 並取代爲：
`<allow_active>Yes</allow_active>`

完成！
