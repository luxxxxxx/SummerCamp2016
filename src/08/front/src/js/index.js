$(window).on('scroll.elasticity', function (e){
    e.preventDefault();
}).on('touchmove.elasticity', function(e){
    e.preventDefault();
});
/**
 *  禁止滑动 让 webview 固定住
 */

$(document).ready(() => {

    /**
     * [pub 是用来放一些全局都需要访问的东西]
     * @type {Object}
     *       playgroundHeight 根据浏览器高度动态设置 canvas 的高度
     *       timer 计时器 Interval
     *       run 游戏的舞台 (stage) 是否跑起来了
     *       isStart 游戏是否开始
     */
    const pub = {
        canvas: document.querySelector("#canvas"),
        context: document.querySelector("#canvas").getContext("2d"),
        playgroundHeight: window.innerHeight,
        timer: null,
        run: false,
        isStart: false,
        stopTimer () {
            window.clearInterval(this.timer);
        }
    };


    if (window.innerHeight > 568) {
        document.querySelector("#canvas").height = window.innerHeight;
    }
    /**
     *  动态设置 canvas 高度
     */

    /**
     *  [Stage 构造函数（首字大写）创建一个游戏运行的舞台]
     *      refresh 清空整个舞台（画布）
     *      run 游戏跑起来
     */
    class Stage {
        constructor () {
            this.context = pub.context;
            this.startX = 0;
            this.startY = 0;
            this.width = 320;
            this.height = document.querySelector("#canvas").height;
        }

        refresh () {
            this.context.clearRect(this.startX, this.startY, this.width, this.height);
        }


        run () {
            pub.timer = window.setInterval(() => {
                stage.refresh();
                circle.rotate();
                block.collision(circle.testPoint.down.y, circle.testPoint.down.status);
                block.collision(circle.testPoint.up.y, circle.testPoint.up.status);
                block.fall();
            }, 1000/60);
            /**
             *  定时刷新画布，并执行游戏 运动 || 碰撞检测 函数
             *  先刷新 再绘制 绘制的顺序注意有坑 
             *  同一个后绘制的会覆盖先绘制的 元素多了注意下
             */

            $(document).on('touchstart', function () {
                block.jump();
            });
            /**
             *  游戏跑起来了就给 document 绑个事件
             */
        }
    }

    /**
     *  [Block 构造函数（首字大写）运动的小方块]
     *      collision(Y 坐标，是否可以碰撞) 因为在这里方块只在 Y 方向运动
     *      getPos 返回方块的 中心 的坐标
     */
    class Block {
        constructor (context, width, height, top, left, img) {
            this.context = context;
            this.width = width;
            this.height = height;
            this.top = top;
            this.left = left;
            this.img = img;

            this.gap = .1;
            // gap 是每次移动的距离，可以看做速度
        }

        paint () {
            this.context.drawImage(this.img, this.left, this.top);
        }

        jump () {
            this.gap = -5;
        }

        fall () {
            this.top += this.gap;
            this.gap += .2;
            /**
             *  每次加 0.2 为了模拟匀加速运动 
             *  类似相同时间间隔，物体运动的距离 1 3 5 7...
             *  这样掉下来的时候看起来就比较自然
             */
            this.paint();
        }

        collision (posY, status) {
            let selfY = this.getPos()[1];
            if (Math.abs(posY - selfY) < 10 && status) {
                console.log("collision");
                console.log("game over");
                pub.stopTimer();
            }
        }

        getPos () {
            return [this.left + this.width / 2, this.top + this.height / 2];
        }
    }

    /**
     *  [Circle 构造函数（首字大写）创建一个游戏运行的舞台]
     */
    class Circle {
        constructor (ctx, x, y, width, height, img, rotateDegree, zoneUp, zoneDown) {
            this.context = ctx;
            this.start = {
                x,
                y
            };
            this.width = width;
            this.height = height;
            this.img = img;
            this.rotateDeg = rotateDegree;
            this.initDegree = rotateDegree;
            this.testPoint = {
                up: {
                    y: this.start.y,
                    zone: zoneUp,
                    status: true
                },
                down: {
                    y: this.start.y + this.height,
                    zone: zoneDown,
                    status: true
                }
            }
            /**
             *  x y 都是表示开始绘制的位置，也就是图片的左上角
             *  rotateDeg 保存当前转动的角度
             *  initDeg 保存初始绘制时旋转的角度
             *  testPoint 圆环上下会有两个挡在小方块路上的点，存这两个点坐标
             *      以及这两个点哪时候可以穿过（空的）和不可以（会撞上去）
             *      zone 保存的就是允许通过时，圆环已经转动的角度（单位：弧度）
             */
        }

        paint () {
            this.context.save();
            this.context.translate(this.start.x + .5 * this.width, this.start.y + .5 * this.height);
            this.context.rotate(this.rotateDeg);
            this.context.drawImage(this.img, -.5 * this.width, -.5 * this.height);
            this.context.restore();
        }
        /**
         *  圆环旋转绘图
         */

        rotate () {
            this.context.save();
            this.context.translate(this.start.x + .5 * this.width, this.start.y + .5 * this.height);
            this.context.rotate(this.rotateDeg);
            this.context.clearRect(-.5 * this.width, -.5 *this.height, this.width, this.height);
            this.context.restore();
            /**
             *  这上面段不写也可以
             *  当时写 demo 为了避免重影，就先清空这段区域，再绘制
             */

            this.rotateDeg += .02;

            if(this.rotateDeg >= 2 * Math.PI + this.initDegree) {
                this.rotateDeg = this.initDegree;
            }

            let upCount = 0;
            let downCount = 0;

            this.testPoint.up.zone.map(item => upCount += (this.rotateDeg >= item[0] && this.rotateDeg <= item[1]));
            this.testPoint.down.zone.map(item => downCount += (this.rotateDeg >= item[0] && this.rotateDeg <= item[1]));

            this.testPoint.up.status = !(upCount > 0);
            this.testPoint.down.status = !(downCount > 0);

            this.paint();
        }

    }

    const imgBlock = document.querySelector("#img-block");
    const imgCircle = document.querySelector("#img-circle");

    let stage = new Stage();
    let block = new Block(pub.context, 30, 30, window.innerHeight - 150, 145, imgBlock);
    let circle = new Circle(pub.context, 60, 50, 200, 200, imgCircle, 0, [[3.5, 4.9]], [[.3, 1.8]]);

    window.setTimeout(function () {
        stage.refresh();
        block.paint();
        circle.paint();
    }, 200);

    $("body").on("touchstart", function () {
        if (pub.run === false) {
            stage.run();
            pub.run = true;
            pub.isStart = true;
        }
    });

});