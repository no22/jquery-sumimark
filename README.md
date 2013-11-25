jQuery.sumimark
======================================================================

jQuery.sumimarkは画像の上に「済」の字をのせるだけの簡単なお仕事をこなすjQueryプラグインです

※「済」以外の文字や画像をかわりにのせることもできます。

[デモページ](http://htmlpreview.github.io/?https://github.com/no22/jquery-sumimark/blob/master/demo/index.html)

インストール
----------------------------------------------------------------------

jQueryの後に読み込んでください。

```html
<script src="/path/to/jquery.sumimark.js"></script>
```


使い方
----------------------------------------------------------------------

### デフォルト

```javascript
$('img').sumimark();
```

### オプション

```javascript
$('img').sumimark({
    'mark'        : '済',                           // のせる文字（漢字一文字）
//  'mark'        : $('<img src="sumi.png" />'),    // 画像をのせる場合
    'bgcolor'     : 'white',                        // 背景画像の背景色
    'opacity'     : 0.5,                            // 背景画像の透明度
    'rotate'      : 15,                             // のせる文字・画像の角度
    'border'      : true,                           // 枠を描画する場合 true
    'factor'      : 0.8,                            // 背景画像に対する枠の倍率
    'borderFactor': 0.05,                           // 背景画像に対する枠線の太さの倍率
    'sumiFactor'  : 1.2,                            // 枠に対する文字の倍率
    'markCss'     :
    {
        'border-color': '#ff7fbf',                  // 枠の色
        'color': '#ff7fbf'                          // のせる文字の色
    }
});
```


ライセンス
----------------------------------------------------------------------

Copyright (c) 2013 Hiroyuki OHARA Licensed under the MIT license.

