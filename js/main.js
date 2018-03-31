// 1、初始化数据 
var keyData = initData()
var keys = keyData.keys
var urls = keyData.urls

// 2、生成键盘
createKeyboard()

// 3、监听按键打开对应网页
document.onkeypress = function(kbd) {
    var key = kbd.key
    openUrl(key)
}

// 工具函数
function initData() {
    var keys = [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm']
    ]
    var urls = JSON.parse(localStorage.getItem('urls')) || {
        q: 'www.tencent.com',
        w: 'www.weibo.com',
        e: 'www.ele.me',
        t: 'www.tmall.com',
        u: 'www.uber.com.cn',
        i: 'www.iqiyi.com',
        o: 'www.oppo.com',
        p: 'www.pixabay.com'
    }
    return {
        keys, urls
    }
}

function createKeyboard() {
    for(var i = 0; i < keys.length; i++) {
        var row = tag('div', {
            className: 'row'
        })
        rows.appendChild(row)
        for(var k = 0; k < keys[i].length; k++) {
            var letter = keys[i][k]
            var kbd = createOneKey(letter)
            var span = tag('span', {
                textContent: letter
            })
            var btn = createEditButton(letter)
            var ico = createWebsiteIco(letter)
            kbd.appendChild(span)
            kbd.appendChild(btn)
            kbd.appendChild(ico)
            row.appendChild(kbd)
        }
    }
}

function tag(tagName, attributes) {
    var tag = document.createElement(tagName)
    for(var key in attributes) {
        tag[key] = attributes[key]
    }
    return tag
}

function createOneKey(letter) {
    var kbd = tag('kbd', {
        id: letter
    })
    kbd.onclick = function(e) {
        var key = e.target.id
        openUrl(key)
    }
    return kbd
}

function createEditButton() {
    var btn = tag('button', {
        textContent: '编辑'
    })
    btn.onclick = function(e) {
        var key = e.target.parentNode.id
        var newUrl = prompt('请输入新的网址：')
        if(newUrl) {
            var img = e.target.nextSibling
            setImgSrc(img, newUrl)
            urls[key] = newUrl
            localStorage.setItem('urls', JSON.stringify(urls))
        }
        e.stopPropagation()
    }
    return btn
}

function createWebsiteIco(letter) {
    var ico = tag('img')
    if(urls[letter]) {
        setImgSrc(ico, urls[letter])
    } else {
        ico.src = './images/ico_point.png'
    }
    return ico
}

function setImgSrc(img, url) {
    img.src = '//' + url + '/favicon.ico'
    img.onerror = function(e) {
        e.target.src = './images/ico_heart.png'
    }
}

function openUrl(key) {
    var url = urls[key]
    if(url) {
        window.open('http://' + url, '_blank')
    } else {
        return alert('未定义的书签')
    }
}