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
function create() {

}
function update() {

}