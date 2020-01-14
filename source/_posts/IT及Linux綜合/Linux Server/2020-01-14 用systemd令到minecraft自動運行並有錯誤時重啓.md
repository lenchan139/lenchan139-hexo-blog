---
uuid: minecraft-server-with-systemd-20200114
title: '用systemd建立service使得Minecraft Server會自動啓動並有錯誤時重開'
tags:
  - Minecraft Server
  - systemd
  - Rubuntu
  - 教學
  - 自架
  - 唔好死
categories:
  - IT及Linux綜合
  - Linux Server

thumbnail: /img/2020-01-14 用systemd令到minecraft自動運行並有錯誤時重啓/cover.png
thumbnailStyles:
  - 'background-position: 0% 64%'
date: 2020-01-14 23:21:08
---
*前言ok長，自己可以跳到重點*

大家好，新年快樂，係光復香港時代革命嘅同時，歷史嘅齒輪往前推進了一年，當以爲世界和平，國家強大，地球統一嘅時候，偉大善良嘅黨不幸出了個打着紅旗反紅旗嘅地方首長，不但使得地方陷入無止境嘅混亂同戰爭(?)當中，更使得準備已久嘅統一計劃被粉碎了仲要因爲面子唔可以將始作俑者送去勞改，真替國家感到悲傷。

期間，我去咗轉日本去C97影囡囡……啊唔係，係去日本學習先進經驗，爲建設社會主義作出貢獻，所以得意搭中國航空往返日本。雖然要北京轉機，不過不愧是國家，蔗渣嘅價錢（聖誕後竟然可以2k港紙來回，黐線仔）做出之士奶蓋巧克力香草烏龍甘蔗綠茶嘅質素，不愧是擅長cut cost的國家呢……講真食物質素真係唔差，啲空姐亦叫做好服務，唯一可惜係往返北京嗰程真係好多人而且好多小朋友係咁嘈係咁嘈……好彩我包容力好（睇在錢嘅份上），帶起索尼嘅究極降噪耳機WH-1000-XM3，哇，世界緘默正。

從天國般嘅日本遊回來後，除了我要面對慘露死態嘅銀包君之外，亦再關心國家對付極少數別有用心嘅反動分子嘅最新現況。——當然國家還沒有輸的。爲了平亂，國家派了很多間諜混入這羣反動分子其中，不久後國家見反動分子開始捉鬼了，國家便撤出大部分間諜，只留下少量地方警察的。而這羣個別的反動分子也很好地開始內戰，不停互相指責對方係鬼。帶耳機的係鬼，大隻佬係鬼，無鬧黑警嘅係鬼，有臂帶識別係鬼，一樣顏色嘅裝備係鬼，準備過份充足嘅係鬼，掟汽油彈嘅又係鬼。總之，他們只求畫面美，破壞的都是鬼鬼鬼。

國家滿意了，國家笑了，把該換的人換一換，該改的改一改，又可以安心割韭菜了，於是世界恢復了和平，故事也到了尾聲，和平真好。

什麼？區議會沒有了？臺灣不要一國兩制了？哈哈，讓該輸的人輸一輸，讓該淘汰的淘汰了，新陳代謝過後，只要未死，事情總會向好的方向前進的。

只有仍然活着，而且活得更好，纔是對仇人最大的報復。


# 正文
話說最近有朋友走去想自己host個Minecraft Server，設定好了但係唔想下下人手開，因爲係Debian上面，搵我諗住用systemd寫個service等佢識自己開+有error自動重啓。作爲善良健全嘅Good Cute Girl嘅我，當然義不容辭，爲未來老細（之一）服務。

而折騰了半天之後，整個service file在此，首先新增/修改minecraft.service：
```bash 
nano /etc/systemd/system/minecraft.service
```
文件內容：
```service
[Unit]
Description=Minecraft server
#Wants=network.target
#After=local-fs.target network.target


[Service]
# 執行Server嘅User，請改成合適的用戶。
User=minecraft

#當有錯誤時自動重開該Service
Restart=on-failure
RestartSec=20 5

# 記得修改WorkingDirectory 到你的Minecraft Server 所在處。
WorkingDirectory=/var/minecraft-server

# 係ExecStart 嘅jar都改返個Minecraft Server 嘅 .jar file.
ExecStart=/bin/java -jar server-runner.jar --nogui

[Install]
WantedBy=multi-user.target
```