---
title: '[DO]Fix從Ubuntu1204 upgrade到1404後Apache2 Root dictionary空白的問題'
tags:
  - Linux Server
date: 2014-08-20 00:50:48
---

原因很簡單，預設的Root Dictionary被修改了

> nano /etc/apache2/sites-enabled/000-default.conf

	把當中的

> DocumentRoot /var/www/html

	改成

> DocumentRoot /var/www

	即可。

	&nbsp;