var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE, // Redimensiona automaticamente as imagens
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var orca, oceano, logoInteli, planta;

function preload() {
    // Carregamento das imagens
    this.load.image('orca', '../assets/orca.png');
    this.load.image('inteli', '../assets/logo-inteli_azul.png');
    this.load.image('oceano', '../assets/bg_azul-escuro.png');
    this.load.image('planta', '../assets/planta.png');
}

function create() {
    // Criando fundo do oceano
    oceano = this.add.image(0, 0, 'oceano').setOrigin(0, 0);
    oceano.setDisplaySize(this.scale.width, this.scale.height);

    // Criando logo do Inteli no topo
    logoInteli = this.add.image(this.scale.width / 2, 50, 'inteli').setScale(0.5);

    // Criando a orca
    orca = this.add.image(200, 150, 'orca').setOrigin(0.5, 0.5).setFlip(true, false);

    // Criando a planta no canto inferior direito
    planta = this.add.image(this.scale.width - 50, this.scale.height - 50, 'planta')
        .setOrigin(0.5, 1) //  Define a origem na base da imagem
        .setScale(0.5); //  Reduz o tamanho da planta

    // Evento que ajusta os elementos ao redimensionar
    this.scale.on('resize', resizeGame, this);
}

function update() {
    orca.x = this.input.x;
    orca.y = this.input.y;

    // Condição para o peixe virar para direita ou esquerda
    if (orca.x > (this.scale.width / 2)) {
        orca.setFlip(true, false);
    } else {
        orca.setFlip(false, false);
    }
}

// Ajuste correto ao mudar o tamanho da tela
function resizeGame(gameSize) {
    var width = gameSize.width;
    var height = gameSize.height;

    // Ajusta o fundo para sempre cobrir toda a tela
    oceano.setDisplaySize(width, height);

    // Ajusta a planta para continuar no canto inferior direito
    if (planta) planta.setPosition(width - 140, height - (-30));

    // Mantém a logo centralizada no topo
    logoInteli.setPosition(width / 2, 50);

    // Mantém a orca dentro dos limites da tela
    if (orca) {
        orca.x = Math.min(orca.x, width - 50);
        orca.y = Math.min(orca.y, height - 50);
    }
}
