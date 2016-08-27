/**
 *
 *
 */
$(document).ready(function() {
    // jquery.ready 已经封装，不需要再写
    // $(window).on("load", function() {
    // 加载瀑布流设置函数
    setTimeout(1000);
    imgLocation();
    $(window).resize(function() {
        imgLocation();
    });


    // 模拟数据源
    var dataImg = { "data": [{ "src": "1.jpeg" }, { "src": "2.jpeg" }, { "src": "3.jpeg" }, { "src": "4.jpeg" }, { "src": "5.jpeg" }, { "src": "6.jpeg" }] };
    // 
    window.onscroll = function() {
        if (scrollside()) {
            $.each(dataImg.data, function(index, value) {
                // 为container 添加box
                var box = $("<div>").addClass("box").appendTo($("#container"));
                // 为box 添加content
                var content = $("<div>").addClass("content").appendTo(box);

                // console.log("./images/" + $(value).attr("src"));
                // 将img  添加给content
                $("<img>").attr("src", "./images/" + $(value).attr("src")).appendTo(content);

            });
            // 将加载的图片从新布局
            imgLocation();
        }
    };
    // });
});



/**
 *
 *
 * 滚动到边沿进行图片加载
 */
function scrollside() {
    var box = $(".box");
    var lastBoxHeight = box.last().get(0).offsetTop + Math.floor(box.last().height() / 2);
    // 获取文档的高度  用 window.height()()!!!!
    var documentHeight = $(window).height();
    var scrollHeight = $(window).scrollTop();
    return lastBoxHeight < documentHeight + scrollHeight;
};

/**
 *
 *瀑布流设置
 */

function imgLocation() {
    // 获取box对象
    var box = $(".box");
    // 获取首个box的宽度
    var boxWidth = box.eq(0).width();
    // var boxHH = box.eq(1).height();
    // console.log(boxHH);

    // $(window).resize(function() {
    // });

    // 计算一个屏幕宽度可以容纳几个box
    var num = Math.floor($(window).width() / boxWidth);

    var boxArr = [];

    box.each(function(index, value) {
        // console.log(index+"--"+value);
        // 获取每个盒子的高度
        var boxHeight = box.eq(index).height();

        // console.log(boxHeight);
        // 将每个盒子高度值存储在数组中
        console.log(index, index % num, num);
        if (index < num) {
            boxArr[index] = boxHeight;
            // 解决放大后重排问题
            $(value).css({
                "position": "absolute",
                "top": 0,
                "left": (boxWidth * index) + 'px',
            });

            // console.log(boxArr);
        } else {
            // 设置如何摆放
            // 获取高度最小的高度值
            var minBoxHeight = Math.min.apply(null, boxArr);
            // console.log(minBoxHeight);

            // 获取第一排最小高度值得索引位置
            var minBoxIndex = $.inArray(minBoxHeight, boxArr);
            // console.log(minBoxIndex);
            // 摆放图片到最小高度值处
            $(value).css({
                "position": "absolute",
                "top": minBoxHeight,
                "left": box.eq(minBoxIndex).position().left,
            });
            // console.log("index --", index);
            // 重新计算累加后的高度值
            boxArr[minBoxIndex] += box.eq(index).height();
        };
    });

};
