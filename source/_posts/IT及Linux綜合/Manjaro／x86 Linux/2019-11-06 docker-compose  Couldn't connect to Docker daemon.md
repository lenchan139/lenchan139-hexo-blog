---
uuid: docker-compose-Couldn't connect to Docker daemon
title: >-
  [Docker-Compose]修復 「ERROR: Couldn't connect to Docker daemon at
  http+docker://localhost - is it running?」
tags:
  - docker
  - Manjaro Linux
  - docker-compose
  - null
categories:
  - IT及Linux綜合
  - Manjaro／x86 Linux
date: 2019-11-06 14:32:06
---
最近接咗個project係docker image嚟，方便deploy。係Manjaro安裝只需透過pacman：
```bash 
sudo pacman -Syu docker-compose
```

跟住前往個docker-compose.yml個folder，執行：
```bash
docker-compose up
```

跟住就出Error：
```bash
ERROR: Couldn't connect to Docker daemon at http+docker://localhost - is it running?

If it's at a non-standard location, specify the URL with the DOCKER_HOST environment variable.
```

呢個原因多如銀河星星，最簡單就係加sudo：
```bash 
sudo docker-compose up
```

或者係docker serivce無開：
```bash
systemctl start docker
```

跟住試下重開：
```bash 
systemctl restart docker
```

唔得嘅話呢，另一個可能係個user唔係docker呢個usergroup入面，加入之並重新開機：
```bash
sudo usermod -aG docker $USER
reboot
```

我ok啦。