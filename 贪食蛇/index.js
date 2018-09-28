// 食物部分功能
(function () {
    function Food ({width, height, bgcolor, map}) {
        this.width = width || 20;
        this.height = height || 20;
        this.bgcolor = bgcolor || 'green';
        this.map = map;
    }
    // 设置初始化位置的方法
    Food.prototype.init = function() {
        // --- 为避免页面上出现多个盒子, 
        //所以在每次创建新盒子的时候, 需要将旧的盒子删除
        // 需要 this.div这个属性存在的时候在删除 
        if(this.div) {
            this.map.removeChild(this.div)
        }
        let div = document.createElement('div');
        this.div = div;
        div.style.width = this.width + 'px';
        div.style.height = this.height + 'px';
        div.style.backgroundColor = this.bgcolor;
        this.map.appendChild(div);
        // 因为每次创建完成食物盒子的是后之后都需要随机的位置
        // 所以直接将随机位置的方法在这里调用
        this.randomPos()
    }
    // 设置随机位置的方法
    Food.prototype.randomPos = function() {
        // 首先盒子不能是完全随机的,横纵坐标要要间隔一个盒子的位置
        // 先计算盒子的坐标值, 再根据坐标值计算出盒子的 top和left
        this.x = Math.floor(Math.random() * this.map.offsetWidth / this.width);
        this.y = Math.floor(Math.random() * this.map.offsetHeight / this.height);
        // 根据随机的坐标值, 计算出对应的top left 并设置个 食物盒子
        this.div.style.top = this.y * this.width + 'px';
        this.div.style.left = this.x * this.height + 'px';  
    }
    window.Food = Food;
})();

// 小蛇部分功能
(function () {
    // 小蛇需要的属性 宽, 高, 坐标, 颜色, 放置的位置
    function Snake({width, height, bodyAry, map}) {
        this.width = width || 20;
        this.height = height || 20;
        this.bodyAry = bodyAry || [
            {x: 1,y: 1,bgColor: 'orange'},
            {x: 2,y: 1,bgColor: 'orange'},
            {x: 3,y: 1,bgColor: 'red'}
        ]
        this.map = map;
        this.div = [];
    }
    // 设置小蛇初始化的位置
    Snake.prototype.init = function () {
        for (let k of this.div) {
            this.map.removeChild(k);
        }
        this.div = [];
        for (let k in this.bodyAry) {
            let div =document.createElement('div');
            this.div.push(div);
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.left = this.bodyAry[k].x * this.width + 'px';
            div.style.top = this.bodyAry[k].y * this.height + 'px';
            div.style.backgroundColor = this.bodyAry[k].bgColor;
            this.map.appendChild(div);
        }
        // this.move();    
    }
    // 设置小蛇运动功能
    Snake.prototype.move = function () {
        let body = this.bodyAry;
        for (var i = 0; i < body.length - 1; i++) {
            body[i].x = body[i + 1].x;
            body[i].y = body[i + 1].y;
        }
        //设置蛇头 
        body[body.length - 1].x++;
    } 
    window.Snake = Snake;
})();

// 游戏控制部分的功能
(function() {
// 需要的内容  食物 小蛇 地图
    function Game(map) {
        this.food = new Food({map: map});
        this.snake = new Snake({map: map});
        this.map = map;
    }
    // 绘制食物和小蛇 并让小蛇运动
    Game.prototype.Start = function() {
        // 绘制食物
        this.food.init();
        // 绘制小蛇
        this.snake.init();
        // 小蛇运动
        this.snakeRun();
        // 设置按钮操作， 控制小蛇的运动方向
        this.changeDir();
    }
    Game.prototype.snakeRun = function () {
        var This = this.snake;
        setInterval(function () {
            This.move();
            This.init();
        }, 200)
    }
    
    window.Game = Game;
})();
const box = document.getElementById('box');
// 实例化food 构造函数
var  fd = new Game(box)
fd.Start()




