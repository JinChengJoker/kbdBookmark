var keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
]
var urls = JSON.parse(localStorage.getItem('urls')) || {
    q: 'www.qq.com',
    w: 'www.weibo.com',
    e: 'www.ele.me',
    r: 'www.renren.com',
    t: 'www.tamil.com',
    y: 'www.youku.com',
    u: 'www.uber.com',
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
                urls[key] = newUrl
                localStorage.setItem('urls', JSON.stringify(urls))
            }
        }
    }
}
document.onkeypress = function(kbd) {
    var key = kbd.key
    var url = urls[key]
    window.open('http://' + url, '_blank')
}