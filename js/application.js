var game = new Phaser.Game(
        800,
        600,
        Phaser.AUTO,
        '#game',
        {
            preload: preload,
            create: create,
            update: update
        }
    );


function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48); 
}

var platforms;
function create() {      //  Мы будем использовать физику, для этого добвам в наш мир
    //  аркадную физику
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //  Установим небо в качесте фона
    game.add.sprite(0, 0, 'sky');
    // Создаем группу для выступов на которые мы будем прыгать
    platforms = game.add.group();
    //  Добавляем физику для всех объектов группы
    platforms.enableBody = true;
    // Создаем пол
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    //  Подгоняем размер пола по размерам игры (оригинальный спрайт размером 400x32)
    ground.scale.setTo(2, 2);
    //  Предотвращаем "перемещение" пола
    ground.body.immovable = true;
    //  Создаем два выступа и предотвращаем их "перемещение"
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(-150, 450, 'ground');
    ledge.body.immovable = true;


    // Персонаж и настройки для него
    player = game.add.sprite(32, game.world.height - 150, 'dude');
    // Добавляем физику для персонажа
    game.physics.arcade.enable(player);
    //  Настройки. Добавим небольшой отскок при приземлении.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 700;
    player.body.collideWorldBounds = true;

    //  Добавим две анимации для движения влево и вправо
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    stars = game.add.group();
    stars.enableBody = true;

    //  Создаем 12 звезд с отступами между ними
    for (var i = 0; i < 12; i++)
    {
        //  Создаем звезду и добавляем его в группу "stars"
        var star = stars.create(i * 70, 0, 'star');

        //  Добавляем гравитацию
        star.body.gravity.y = 600;

        // Для каждой звезды указываем свою амплитуду отскока
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    var score = 0;
    var scoreText;
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
}
function update() {

    game.physics.arcade.collide(stars, platforms);
     //  Проверка на столкновение игрока с полом
    game.physics.arcade.collide(player, platforms);
    cursors = game.input.keyboard.createCursorKeys();
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
     //  Обнулим скорость перемещения персонажа в пространстве
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Движение влево
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Движение вправо
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Состояние покоя
        player.animations.stop();

        player.frame = 4;
    }

    //  Высота прыжка
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }
}

function collectStar (player, star) {

    // Removes the star from the screen
    star.kill();

}