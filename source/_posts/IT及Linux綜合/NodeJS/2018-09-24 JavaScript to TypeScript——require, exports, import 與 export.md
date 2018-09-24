---
title: '2018-09-24 JavaScript to TypeScript——require, exports, import 與 export'
tags:
  - NodeJS
  - JavaScript
  - ES6
  - TypeScript
  - node modules
  - import
  - require
  - export
categories:
  - IT及Linux綜合
  - NodeJS
thumbnail: /img/2018-09-24 javascript to typescript/cover.png
date: 2018-09-24 10:12:50
---
一圖流：
![code](/img/2018-09-24 javascript to typescript/cover.png)

### 前言
最近終於將公司嘅nodeJS project upgrade上TypeScript，而當中發覺好多project都會用ES6嘅import 而非require，所以稍爲摸索一下之後寫低個分別。
而無論require定import時候，個path主要會有兩種：
```js
var foo = require('foo') //require node_modules
var foo = require('./foo') //require 特定js file as module
```

而require js file 嘅時候，最好唔好用相對路徑而係絕對路徑。
而js當中，有兩個var可以得知當前文件嘅路徑：
```js
__filename // 文件嘅完整路徑，例如 '/root/dev/files/noejs_project/module.js'
__dirname // 當然文件嘅所在路徑，例如 '/root/dev/files/noejs_project'
```

然後咁會較爲安全：
```js
var foo = require(__dirname + './foo')
```

### Require && exports
而事實上，require係只係直接鏈結object 去js file as module, 所以可以係任何部分插入，甚至require本身可以當object咁用：
```js
var obj = require('foo')(para)
```

或者：
```js
var foo = require('foo').foo
```

都無問題。
或者只係創建而之後先用：
```js
var module = require('module')
var mod = module(para)
var foo = mod.foo
```

而如果要export俾require用可以咁：
```js
var foo = {} // 任何object，function都可以
exports = object
```

### import && export
而係ES6中，制定咗 import 同 export。而ts多數會採用import&export而非require&exports，因爲大家都咁新潮嘛（誤）。
而事實上，import&export 可以令ts更加接近oop，以oop嘅方式辦事。而且import一定要寫係頂部，能夠避免咗require到最後唔記得邊度require咗嘅悲劇發生。而且import 有唯一檢查，唔可以重複import,避免複合import最後唔知改邊個好嘅情況。
最緊要係咩？ts有得定義data type啊！
import同require一樣可以從node_modules入面require：
```js
import Foo from 'foo'
```

亦可以從本地文件中引入
```js
import Foo from (__dirname + "./foo")
```

可以同時import多個class：
```js
import {Foo, Loo, Module} from './class'
```

當然你亦可以幫佢改個靚名：
```js
import Foo as Module from (_dirname + './foo')
```
使用(object)：
```js
import Foo as Module from (_dirname + './foo')
let module = new Module
console.log(module.object)
```

使用(function)：
```js
import Foo as Module from (__dirname + './foo')
let module = new Module(para)
console.log(module)
```

而export俾import用亦很簡單，例如你有個咁嘅function：
```js
function FooFunc(){
  return foo
}
```

就咁一嘢插入：
```js
export function FooFunc(){
  return foo
}
```

就可以咁 import:
```js
import FooFunc from (__dirname + './foo')
```

object亦到一樣：
```js
export let Foo = "foo"
```

使用：
```js
import Foo from (__dirname + './foo')
```

### import require module
如果你寫咗，或者有node_moduels 唔support import，你可以寫個wrapper.js
```js
export let Foo = require('foo')
```

之後import：
```js
import let Foo from ('foo')
```


完！

Ref:
[Getting started with Node.js modules: require, exports, imports and beyond](https://adrianmejia.com/blog/2016/08/12/getting-started-with-node-js-modules-require-exports-imports-npm-and-beyond/)
[Native ES Modules in NodeJS: Status And Future Directions, Part I](https://medium.com/@giltayar/native-es-modules-in-nodejs-status-and-future-directions-part-i-ee5ea3001f71)
