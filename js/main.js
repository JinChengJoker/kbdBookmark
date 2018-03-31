var keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
]

var urls = JSON.parse(localStorage.getItem('urls')) || {
    q: 'www.tencent.com',
    w: 'www.weibo.com',
    e: 'www.ele.me',
    r: 'www.renren.com',
    t: 'www.tmall.com',
    y: 'www.youku.com',
    u: 'www.uber.com.cn',
    i: 'www.iqiyi.com',
    o: 'www.oppo.com',
    p: 'www.pixabay.com'
}

for(var i = 0; i < keys.length; i++) {
    var row = document.createElement('div')
    row.className = 'row'
    rows.appendChild(row)
    for(var k = 0; k < keys[i].length; k++) {
        var letter = keys[i][k]
        var kbd = document.createElement('kbd')
        var span = document.createElement('span')
        span.textContent = letter
        kbd.appendChild(span)
        row.appendChild(kbd)
        var btn = document.createElement('button')
        btn.id = letter
        btn.textContent = '编辑'
        kbd.appendChild(btn)
        btn.onclick = function(e) {
            var key = e.target.id
            var newUrl = prompt('请输入新的网址：')
            if(newUrl) {
                var img = e.target.nextSibling
                img.src = '//' + newUrl + '/favicon.ico'
                img.onerror = function(e) {
                    e.target.src = './images/ico_heart.png'
                }
                urls[key] = newUrl
                localStorage.setItem('urls', JSON.stringify(urls))
            }
        }
        var img = document.createElement('img')
        if(urls[letter]) {
            img.src = '//' + urls[letter] + '/favicon.ico'
            img.onerror = function(e) {
                e.target.src = './images/ico_heart.png'
            }
        } else {
            img.src = './images/ico_point.png'
        }
        kbd.appendChild(img)
    }
}

document.onkeypress = function(kbd) {
    var key = kbd.key
    var url = urls[key]
    if(url) {
        window.open('http://' + url, '_blank')
    } else {
        alert('未定义的书签')
    }
}