window.onload = function () {

    // 需求1：鼠标经过大盒子，展示左右的按钮
    var container = document.querySelector('.container');
    var leftBox = document.querySelector('.arrow a:first-child');
    var rightBox = document.querySelector('.arrow a:last-child');
    container.onmouseenter = function () {
        leftBox.style.display = 'block';
        rightBox.style.display = 'block';
    }
    container.onmouseleave = function () {
        leftBox.style.display = 'none';
        rightBox.style.display = 'none';
    }

    // 需求2：点击下标小圆点，滑动图片
    var olLis = document.querySelectorAll('ol li');
    var ulBox = document.querySelector('ul');
    var ulLis = document.querySelectorAll('ul li');
    // 单张图片的宽度
    var imgWidth = ulBox.children[0].offsetWidth;
    olLis.forEach(function (el, index) {
        el.onclick = function () {
            move(index);
            count = index;
        }
    })

    var lastDom = ulLis[0];
    function move(n, width) {
        for (var i = 0; i < ulLis.length; i++) {
            ulLis[i].removeAttribute('style');
        }
        lastDom.style.zIndex = 10;

        ulLis[n].style.transition = 'none';
        ulLis[n].style.transform = 'translateX(' + width + 'px)';
        // 设置过渡，缓缓移动到0的位置
        setTimeout(function () {
            ulLis[n].style.transition = 'transform 0.35s ease-in-out';
            ulLis[n].style.transform = 'translateX(0)';
            ulLis[n].style.zIndex = 20;
            lastDom = ulLis[n];
        }, 0)

        // 小圆点的排他
        olLis.forEach(function (item) {
            item.removeAttribute('class');
        })
        olLis[n].className = 'current';
    }


    // 需求3：左右按钮触发滑动
    var count = 0;
    var flag = true;
    rightBox.onclick = function () {
        if (flag) {
            flag = false;
            count++;
            if (count > ulBox.children.length - 1) count = 0;
            move(count, imgWidth);
        }
    }
    leftBox.onclick = function () {
        if (flag) {
            flag = false;
            count--;
            if (count < 0) count = ulBox.children.length - 1;
            move(count, -imgWidth);
        }
    }

    // 监听最后一张结束和第一张跳转
    ulBox.ontransitionend = function () {
        flag = true;
    }


    // 需求4:  自动轮播
}