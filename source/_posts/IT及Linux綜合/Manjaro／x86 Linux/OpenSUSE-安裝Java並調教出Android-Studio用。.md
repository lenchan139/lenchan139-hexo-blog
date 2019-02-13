---
uuid: a26c1461-2fbc-11e9-8b4d-05d549662b79
title: '[OpenSUSE]安裝Java並調教出Android Studio用。'
tags:
  - Linux
  - Java
  - Android
  - Android Studio
  - OpenSUSE
  - OpenJDK
  - JDK
  - Terminal
  - 系統
  - Oracle
categories:
  - IT及Linux綜合
  - Manjaro／x86 Linux
date: 2016-03-05 16:25:50
---

如題，由於大人嘅原因，OpenSUSE本身只提供OpenJDK，所以要使用官方版本嘅JDK。（[我備份嘅8u73](https://mega.nz/#!7N1TDD6Z!2KZ0zXBh7caSYtso_VnyUzx1uhMbW0cYDT7QGqpt_-w)/[官方最新版](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)）

	打開Terminal，鍵入：


sudo rpm -i jdk-8u73-linux-x64.rpm

	之後設定安裝的Java爲系統預設Java（如果唔係8u73請自行將jdk1.8.0_73修改爲適合嘅名稱）：

	update-alternatives &#8211;install /usr/bin/java java /usr/java/jdk1.8.0_73/bin/java 1551

	update-alternatives &#8211;install /usr/bin/javadoc javadoc /usr/java/jdk1.8.0_73/bin/javadoc 1551

	update-alternatives &#8211;install /usr/bin/jar jar /usr/java/jdk1.8.0_73/bin/jar 1551

	update-alternatives &#8211;install /usr/bin/javap javap /usr/java/jdk1.8.0_73/bin/javap 1551

	update-alternatives &#8211;install /usr/bin/javac javac /usr/java/jdk1.8.0_73/bin/javac 1551

	update-alternatives &#8211;install /usr/bin/javaws javaws /usr/java/jdk1.8.0_73/bin/javaws 1551

	update-alternatives &#8211;install /usr/bin/javah javah /usr/java/jdk1.8.0_73/bin/javah 1551

	update-alternatives &#8211;install /usr/bin/jarsigner jarsigner /usr/java/jdk1.8.0_73/bin/jarsigner 1551

	修改JAVA_HOME：

	nano .bashrc

	加入：


export JAVA_HOME=/usr/java/latest

	儲存離開。

	&#8211;

	之後從Android Studio官網下載[最新版本Android Studio](https://developer.android.com/sdk/index.html#Other)之後解壓縮並執行入面bin/studio.sh就可以執行Android Studio了。

	Reference：[Install Oracle JDK on OpenSUSE](http://www.paskov.biz/blog/install-oracle-jdk-on-opensuse/)
