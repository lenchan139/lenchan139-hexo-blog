---
title: '[沒有Null就沒有傷害]從Java到Kotlin：「?」、「!!」與「?:」——略談Null Safety。'
tags:
  - Kotlin
  - Java
  - 'Null'
  - Code
  - 教學
  - Null Safety
  - null
uuid: no-null-no-hurt
categories:
  - IT及Linux綜合
  - Android／Kotlin
thumbnail: '/img/[沒有Null就沒有傷害]從Java到Kotlin：「?」、「!!」與「?:」——略談Null Safety。/cover.png'
date: 2019-02-13 20:57:36
---
# 前言
最近有啲識Java嘅fd子都不約而同咁話入Kotlin嘅第一關就係唔係好搞得明Kotlin入面啲問號感歎號係點運作嘅。咁我就諗住寫篇文，比對Java與Kotlin，希望可以較易咁上手。
#Null@Java
## 乜嘢係Null？
Null其實就係各種程式入面作爲空值/或不指向任何對象嘅特殊值。而係Java等嘅語言入面如果嘗試使用Null嘅話：
```java
String str = null;
str.indexOf() // throw NullPointException();
```
就會拋出 NullPointException ，而如果唔catch呢個Exception，程式會崩潰並終止。此舉係爲咗提示並提供一個統一嘅值給予開發人員去檢查返回值是否有效嘅方法……之一。
所以一般嘅Java都會咁樣寫：
```java
UserProfile profile = getUserProfile(); //If cannot get profile, return null
if(profile == null){
  println("Fetch user profile failed. Please check network connections.");
}else{
  println("Fetch profile success!");
  println(String.format("Username: %s", profile.username));
}
```
……類似咁嘅感覺，予以判定資料嘅有效與否。
## 唔要Null得唔得啊？
得。Java入面，你可以指定一個值，甚至function嘅return值唔可以set做Null：
```java
@NonNull String str = "";
```
如果你要極端啲嘅，可以係Class或Function度設置令到整個block內部嘅都唔可以set Null：
```java
// Class
@NonNullByDefault String Class User(){
  String str = ""; // cannot set null
  UserProfile profile = new UserProfile(); // cannot set to null
}

// Function
@NonNullByDefault UserProfile getProfile(UserAuthInfo authInfo){
  UserProfile profile = new UserProfile(authInfo); // profile cannot set null
  return profile
}
```

*不過 「@NonNull」 同 「@Nullable」係annotation，有無用要視乎IDE嘅支援程度。*

# Null向Kotlin
## 咁係Kotlin又點Null法啊？
係Kotlin，會有「?」、「!!」嘅operator去處理Null相關嘅事宜。係Java當中，你會咁寫：
```java
String input = getInput();
if(input != null){
  input.process();
}
otherTask1();
otherTask2();
// ...
```
而係Kotlin入面則咁寫：
```kotlin
var input : String? = getInput() //getInput() may return null
input.process()
otherTask1()
otherTask2()
```
Done.
而Kotlin嘅咁：
```kotlin
var input : String? = null
```
其實即係Java嘅咁：
```java
@Nullable input = null;
```

## 咁我唔加問號會點啊？
而事實上，Kotlin本身就係default唔null嘅程式語言，所以一般嘅Kotlin Object會咁：
```kotlin
var str : String // default value is empty string => ""
```
即係Java嘅咁：
```java
@NonNull String str = "";
```

# Oh no! Java!
係Java嘅話，你大概會咁處理啲Null：
```java
// declearation
class User(BasicAuth basicAuth){
  public UserProfile getUserProfile(){
    UserProfile profile = new UserUtils.getUserProfile(basicAuth);
    return profile
  }
}
// real code
User user = new User(basicAuth);
String isJohn = user.getUserProfile()?
                    .username
                    .toLowerCase()
                    .contains("john");
```
……唔好啦掛。

# Null safety @ Kotlin
## 咁Kotlin嘅話，我要將null放入non-null，會點？
會過唔到Compiler，慳返嘅係時間同電費。咁如果你真係要null 落 non-null，其實Kotlin會有兩大類，總共三種玩法：
##### such Java
  1. Not-null Assertion Operator(!!)
##### Safe Navigation
 1. Safe Call Operator(?)
 2. Elvis Operator(?:)
首先定義咗個Class係咁先：
```kotlin
// declearation
class User(val basicAuth : BasicAuth){
  public fun getUserProfile() : UserProfile{
    var profile : UserProfile? = UserUtils().getUserProfile(basicAuth)
    return profile
  }
  public fun getUserName() : String? {
    return getUserProfile().username
  }
}
Class UserProfile(){
  var username = String?
}
```
### Safe Call Operator(?)
第一個係最普通嘅，上文亦示範過嘅：
```kotlin
var user : User = User(basicAuth)
var isJohn : String? = user.getUserName()?
                          .username
                          .toLowerCase()
                          .contains("john")
// other process here...
```
係呢個case入面，如果 `getUserProfile()` 拎唔到profile並return null，係safe call之下，後面嘅 `.username.toLowerCase().contains("john")` 全部唔會執行，而且isJohn會自動變成null並繼續其他。

### Not-null Assertion Operator(!!)
第二招係such Java 嘅方法，舉例：
```kotlin
var user : User = User(basicAuth)
var name : String = user.getUserName() // if null, Exception here
if(profile != null){
  var isJohn = name!!.
                .toLowerCase()
                .contains("john")
  // other process here...
}
```
簡單講，就係加上「!!」使其強制變成Non-Null嘅變數。如果cast當時係null嘅話，會類似Java咁彈出Exception，所以要加上if-statement去check null先call會安全啲。

### 銀河最強嘅Elvis Operator（Java都無嘅嘢，Yeah）
如果你覺得上面兩種都唔得，想自定義default value嘅話，仲可以咁：
```kotlin
var user : User = User(basicAuth)
var name : String = user.getUserName() ?:"" // if empty value, set to "" empty string
var isJohn = profile.
              .toLowerCase()
              .contains("john")
  // other process here...
```
係上文中，如果 `user.getUserName()` 係 null嘅話，就會唔return null而係 ?:後面嘅value。呢個例子中，username就會變成`""`(empty string)，之後繼續執行。

# 結尾
係咁多，如果有問題歡迎留言或者係[Mastodon](https://mstdn.jp/@lenchan139)上面問我或者電郵又或者其他你搵到我嘅方法啦。

# Ref
[Null Safely - Kotlin Docs](https://kotlinlang.org/docs/reference/null-safety.html)
