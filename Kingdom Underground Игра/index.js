const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')


const levelElem = document.getElementById('level'); // YASIN ПЕРЕНЕСТИ НАДО 
const gameElem = document.getElementById('game');  // YASIN ПЕРЕНЕСТИ НАДО 
const boss = document.getElementById('boss')  // YASIN ПЕРЕНЕСТИ НАДО 
let scoreElem = document.getElementById('score')
let add;



canvas.width = 64 * 16 // 1024
canvas.height = 64 * 9 // 576

let parsedCollisions
let collisionBlocks
let background
let doors
const player = new Player({
  position:{
    x: 200,
    y: 200
  },
  velocity:{
    x: 0,
    y: 0
  },
  offset:{
    x: 100,
    y: 50
  },
  imageSrc: './img/king/idle.png',
  frameRate: 11,
  animations: {
    idleRight: {
      frameRate: 11,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/king/idle.png',
    },
    idleLeft: {
      frameRate: 11,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/king/idleLeft.png',
    },
    runRight: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/king/runRight.png',
    },
    runLeft: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/king/runLeft.png',
    },
    enterDoor: {
      frameRate: 8,
      frameBuffer: 4,
      loop: false,
      imageSrc: './img/king/enterDoor.png',
      onComplete: () => {
        console.log('completed animation')
        gsap.to(overlay, {
          opacity: 1,
          onComplete: () => {
            level++

            if (level === 4 && scoreElem === 999);
            levels[level].init()
            if(level === 1 || level === 2){
              player.switchSprite('idleRight');
            } else player.switchSprite('idleLeft');
            player.preventInput = false
            gsap.to(overlay, {
              opacity: 0,
            })
          },
        })
      },
    },
    attack:{
      frameRate: 3,
      frameBuffer: 4,
      loop: false,
      imageSrc: './img/king/attack.png',
    },
    attackLeft:{
      frameRate: 3,
      frameBuffer: 4,
      loop: false,
      imageSrc: './img/king/attackLeft.png',
    },
    hit:{
      frameRate: 2,
      frameBuffer: 4,
      loop: false,
      imageSrc: './img/king/hit.png',
    },
    hitLeft:{
      frameRate: 2,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/king/hitLeft.png',
    },
    dead:{
      frameRate: 4,
      frameBuffer: 2,
      loop: false,
      imageSrc: './img/king/dead.png',
    }
  },
});

const enemy1__1 = new Enemy({
  position:{
    x: 650,
    y: 200,
    startX: 650
  },
  velocity:{
    x: 0,
    y: 0
  },
  offset:{
    x: 9,
    y: 20
  },
  step: 150,
  imageSrc: './img/pig/Idle (34x28).png',
  frameRate: 11,
  animations: {
    idleRight: {
      frameRate: 11,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/pig/Idle (34x28).png',
    },
    idleLeft: {
      frameRate: 11,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/pig/IdleLeft (34x28).png',
    },
    runRight: {
      frameRate: 6,
      frameBuffer: 6,
      loop: true,
      imageSrc: './img/pig/Run (34x28).png',
    },
    runLeft: {
      frameRate: 6,
      frameBuffer: 6,
      loop: true,
      imageSrc: './img/pig/RunLeft (34x28).png',
    },
    attack: {
      frameRate: 5,
      frameBuffer: 4,
      loop: false,
      imageSrc: './img/pig/Attack (34x28).png',
    },
    attackLeft: {
      frameRate: 5,
      frameBuffer: 4,
      loop: false,
      imageSrc: './img/pig/AttackLeft (34x28).png',
    },
    hit:{
      frameRate: 2,
      frameBuffer: 6,
      loop: false,
      imageSrc: './img/pig/Hit (34x28).png',
    },
    hitLeft:{
      frameRate: 2,
      frameBuffer: 6,
      loop: false,
      imageSrc: './img/pig/HitLeft (34x28).png',
    },
    dead:{
      frameRate: 4,
      frameBuffer: 4,
      loop: false,
      imageSrc: './img/pig/Dead (34x28).png',
    }
  },
});

const enemy2__1 = new Enemy({
  position:{
    x: 200,
    y: 420,
    startX: 200
  },
  velocity:{
    x: 0,
    y: 0
  },
  offset:{
    x: 9,
    y: 20
  },
  step: 70,
  imageSrc: './img/pig/Idle (34x28).png',
  frameRate: 11,
  animations: {
    idleRight: {
      frameRate: 11,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/pig/Idle (34x28).png',
    },
    idleLeft: {
      frameRate: 11,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/pig/IdleLeft (34x28).png',
    },
    runRight: {
      frameRate: 6,
      frameBuffer: 6,
      loop: true,
      imageSrc: './img/pig/Run (34x28).png',
    },
    runLeft: {
      frameRate: 6,
      frameBuffer: 6,
      loop: true,
      imageSrc: './img/pig/RunLeft (34x28).png',
    },
    attack: {
      frameRate: 5,
      frameBuffer: 4,
      loop: false,
      imageSrc: './img/pig/Attack (34x28).png',
    },
    attackLeft: {
      frameRate: 5,
      frameBuffer: 4,
      loop: false,
      imageSrc: './img/pig/AttackLeft (34x28).png',
    },
    hit:{
      frameRate: 2,
      frameBuffer: 6,
      loop: false,
      imageSrc: './img/pig/Hit (34x28).png',
    },
    hitLeft:{
      frameRate: 2,
      frameBuffer: 6,
      loop: false,
      imageSrc: './img/pig/HitLeft (34x28).png',
    },
    dead:{
      frameRate: 4,
      frameBuffer: 4,
      loop: false,
      imageSrc: './img/pig/Dead (34x28).png',
    }
  },
});

const enemy2__2 = new Enemy({
  position:{
    x: 450,
    y: 420,
    startX: 450
  },
  velocity:{
    x: 0,
    y: 0
  },
  offset:{
    x: 9,
    y: 20
  },
  step: 70,
  imageSrc: './img/pig/Idle (34x28).png',
  frameRate: 11,
  animations: {
    idleRight: {
      frameRate: 11,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/pig/Idle (34x28).png',
    },
    idleLeft: {
      frameRate: 11,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/pig/IdleLeft (34x28).png',
    },
    runRight: {
      frameRate: 6,
      frameBuffer: 6,
      loop: true,
      imageSrc: './img/pig/Run (34x28).png',
    },
    runLeft: {
      frameRate: 6,
      frameBuffer: 6,
      loop: true,
      imageSrc: './img/pig/RunLeft (34x28).png',
    },
    attack: {
      frameRate: 5,
      frameBuffer: 4,
      loop: false,
      imageSrc: './img/pig/Attack (34x28).png',
    },
    attackLeft: {
      frameRate: 5,
      frameBuffer: 4,
      loop: false,
      imageSrc: './img/pig/AttackLeft (34x28).png',
    },
    hit:{
      frameRate: 2,
      frameBuffer: 6,
      loop: false,
      imageSrc: './img/pig/Hit (34x28).png',
    },
    hitLeft:{
      frameRate: 2,
      frameBuffer: 6,
      loop: false,
      imageSrc: './img/pig/HitLeft (34x28).png',
    },
    dead:{
      frameRate: 4,
      frameBuffer: 4,
      loop: false,
      imageSrc: './img/pig/Dead (34x28).png',
    }
  },
});

const enemy2__3 = new Enemy({
  position:{
    x: 720,
    y: 420,
    startX: 720
  },
  velocity:{
    x: 0,
    y: 0
  },
  offset:{
    x: 9,
    y: 20
  },
  step: 30,
  imageSrc: './img/pig/Idle (34x28).png',
  frameRate: 11,
  animations: {
    idleRight: {
      frameRate: 11,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/pig/Idle (34x28).png',
    },
    idleLeft: {
      frameRate: 11,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/pig/IdleLeft (34x28).png',
    },
    runRight: {
      frameRate: 6,
      frameBuffer: 6,
      loop: true,
      imageSrc: './img/pig/Run (34x28).png',
    },
    runLeft: {
      frameRate: 6,
      frameBuffer: 6,
      loop: true,
      imageSrc: './img/pig/RunLeft (34x28).png',
    },
    attack: {
      frameRate: 5,
      frameBuffer: 4,
      loop: false,
      imageSrc: './img/pig/Attack (34x28).png',
    },
    attackLeft: {
      frameRate: 5,
      frameBuffer: 4,
      loop: false,
      imageSrc: './img/pig/AttackLeft (34x28).png',
    },
    hit:{
      frameRate: 2,
      frameBuffer: 6,
      loop: false,
      imageSrc: './img/pig/Hit (34x28).png',
    },
    hitLeft:{
      frameRate: 2,
      frameBuffer: 6,
      loop: false,
      imageSrc: './img/pig/HitLeft (34x28).png',
    },
    dead:{
      frameRate: 4,
      frameBuffer: 4,
      loop: false,
      imageSrc: './img/pig/Dead (34x28).png',
    }
  },
});

const enemy3__1 = new Enemy({
  position:{
    x: 660,
    y: 420,
    startX: 660
  },
  velocity:{
    x: 0,
    y: 0
  },
  offset:{
    x: 9,
    y: 20
  },
  step: 50,
  imageSrc: './img/pig/Idle (34x28).png',
  frameRate: 11,
  animations: {
    idleRight: {
      frameRate: 11,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/pig/Idle (34x28).png',
    },
    idleLeft: {
      frameRate: 11,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/pig/IdleLeft (34x28).png',
    },
    runRight: {
      frameRate: 6,
      frameBuffer: 6,
      loop: true,
      imageSrc: './img/pig/Run (34x28).png',
    },
    runLeft: {
      frameRate: 6,
      frameBuffer: 6,
      loop: true,
      imageSrc: './img/pig/RunLeft (34x28).png',
    },
    attack: {
      frameRate: 5,
      frameBuffer: 4,
      loop: false,
      imageSrc: './img/pig/Attack (34x28).png',
    },
    attackLeft: {
      frameRate: 5,
      frameBuffer: 6,
      loop: false,
      imageSrc: './img/pig/AttackLeft (34x28).png',
    },
    hit:{
      frameRate: 2,
      frameBuffer: 6,
      loop: false,
      imageSrc: './img/pig/Hit (34x28).png',
    },
    hitLeft:{
      frameRate: 2,
      frameBuffer: 6,
      loop: false,
      imageSrc: './img/pig/HitLeft (34x28).png',
    },
    dead:{
      frameRate: 4,
      frameBuffer: 4,
      loop: false,
      imageSrc: './img/pig/Dead (34x28).png',
    }
  },
});

const enemy3__2 = new Enemy({
  position:{
    x: 690,
    y: 420,
    startX: 690
  },
  velocity:{
    x: 0,
    y: 0
  },
  offset:{
    x: 9,
    y: 20
  },
  step: 150,
  imageSrc: './img/pig/Idle (34x28).png',
  frameRate: 11,
  animations: {
    idleRight: {
      frameRate: 11,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/pig/Idle (34x28).png',
    },
    idleLeft: {
      frameRate: 11,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/pig/IdleLeft (34x28).png',
    },
    runRight: {
      frameRate: 6,
      frameBuffer: 6,
      loop: true,
      imageSrc: './img/pig/Run (34x28).png',
    },
    runLeft: {
      frameRate: 6,
      frameBuffer: 6,
      loop: true,
      imageSrc: './img/pig/RunLeft (34x28).png',
    },
    attack: {
      frameRate: 5,
      frameBuffer: 4,
      loop: false,
      imageSrc: './img/pig/Attack (34x28).png',
    },
    attackLeft: {
      frameRate: 5,
      frameBuffer: 4,
      loop: false,
      imageSrc: './img/pig/AttackLeft (34x28).png',
    },
    hit:{
      frameRate: 2,
      frameBuffer: 6,
      loop: false,
      imageSrc: './img/pig/Hit (34x28).png',
    },
    hitLeft:{
      frameRate: 2,
      frameBuffer: 6,
      loop: false,
      imageSrc: './img/pig/HitLeft (34x28).png',
    },
    dead:{
      frameRate: 4,
      frameBuffer: 4,
      loop: false,
      imageSrc: './img/pig/Dead (34x28).png',
    }
  },
});

const bigPig = new BigPig({
  position:{
    x: 300,
    y: 420,
    startX: 300
  },
  velocity:{
    x: 0,
    y: 0
  },
  offset:{
    x: 0,
    y: 60
  },
  step: 50,
  imageSrc: './img/pigKing/Idle (38x28).png',
  frameRate: 12,
  animations: {
    idleRight: {
      frameRate: 12,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/pigKing/Idle (38x28).png',
    },
    idleLeft: {
      frameRate: 12,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/pigKing/IdleLeft (38x28).png',
    },
    attack: {
      frameRate: 5,
      frameBuffer: 4,
      loop: false,
      imageSrc: './img/pigKing/Attack (38x28).png',
    },
    attackLeft: {
      frameRate: 5,
      frameBuffer: 4,
      loop: false,
      imageSrc: './img/pigKing/AttackLeft (38x28).png',
    },
    hit:{
      frameRate: 2,
      frameBuffer: 6,
      loop: false,
      imageSrc: './img/pigKing/Hit (38x28).png',
    },
    hitLeft:{
      frameRate: 2,
      frameBuffer: 6,
      loop: false,
      imageSrc: './img/pigKing/HitLeft (38x28).png',
    },
    dead:{
      frameRate: 4,
      frameBuffer: 4,
      loop: false,
      imageSrc: './img/pigKing/DeadLeft (38x28).png',
    }
  },
})

let cntEnemys = 0;
let bigPigOn = false;

let bigPigHealthBar = document.querySelector('#par__enemyBigPigHealth');

let level = 1
let levels = {
  1: {
    init: () => {
      parsedCollisions = collisionsLevel1.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()

      cntEnemys = 1;
      levelElem.innerHTML = level;  // YASIN ПЕРЕНЕСТИ НАДО 

      bigPigOn = false;

      player.collisionBlocks = collisionBlocks
      if (player.currentAnimation) player.currentAnimation.isActive = false

      enemy1__1.collisionBlocks = collisionBlocks
      if (enemy1__1.currentAnimation) enemy1__1.currentAnimation.isActive = false


      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: './img/backgroundLevel1.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 767,
            y: 270,
          },
          imageSrc: './img/doorOpen.png',
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ]
    },
  },
  2: {
    init: () => {
      parsedCollisions = collisionsLevel2.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()

      cntEnemys = 3;
      levelElem.innerHTML = level;    // YASIN ПЕРЕНЕСТИ НАДО 
      gameElem.style.left = '990px'  // YASIN ПЕРЕНЕСТИ НАДО 
      gameElem.style.top = '300px'  // YASIN ПЕРЕНЕСТИ НАДО 

      bigPigOn = false;

      player.collisionBlocks = collisionBlocks
      player.position.x = 96
      player.position.y = 140
  
      enemy2__1.collisionBlocks = collisionBlocks
      enemy2__1.position.x = 200
      enemy2__1.position.y = 420
      enemy2__1.position.startX = 200

      enemy2__2.collisionBlocks = collisionBlocks
      enemy2__2.position.x = 450
      enemy2__2.position.y = 420
      enemy2__2.position.startX = 450

      enemy2__3.collisionBlocks = collisionBlocks
      enemy2__3.position.x = 720
      enemy2__3.position.y = 420
      enemy2__3.position.startX = 720

      enemy2__1.switchSprite('idleLeft');

      if (player.currentAnimation) player.currentAnimation.isActive = false
      
      if (enemy2__1.currentAnimation) enemy2__1.currentAnimation.isActive = false
      
      if (enemy2__2.currentAnimation) enemy2__2.currentAnimation.isActive = false
      
      if (enemy2__3.currentAnimation) enemy2__3.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: './img/backgroundLevel2.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 772.0,
            y: 336,
          },
          imageSrc: './img/doorOpen.png',
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ]
    },
  },
  3: {
    init: () => {
      parsedCollisions = collisionsLevel3.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()

      cntEnemys = 2;
      levelElem.innerHTML = level;  // YASIN ПЕРЕНЕСТИ НАДО 
      gameElem.style.left = '350px'  // YASIN ПЕРЕНЕСТИ НАДО 
      gameElem.style.top = '620px'  // YASIN ПЕРЕНЕСТИ НАДО 

      boss.innerHTML = 'BOSS'  // YASIN ПЕРЕНЕСТИ НАДО 
      bigPigOn = true;
      
      player.collisionBlocks = collisionBlocks
      player.position.x = 780
      player.position.y = 230

      enemy3__1.collisionBlocks = collisionBlocks
      enemy3__1.position.x = 660
      enemy3__1.position.y = 230
      enemy3__1.position.startX = 660
      
      enemy3__2.collisionBlocks = collisionBlocks
      enemy3__2.position.x = 699
      enemy3__2.position.y = 420
      enemy3__2.position.startX = 699
      
      bigPig.collisionBlocks = collisionBlocks
      bigPig.position.x = 300
      bigPig.position.y = 420
      bigPig.position.startX = 300

      enemy3__1.switchSprite('idleLeft')

      bigPigHealthBar.style.display = 'flex';

      if (player.currentAnimation) player.currentAnimation.isActive = false
      
      if (enemy3__1.currentAnimation) enemy3__1.currentAnimation.isActive = false
      
      if (enemy3__2.currentAnimation) enemy3__2.currentAnimation.isActive = false

      if (bigPig.currentAnimation) bigPig.currentAnimation.isActive = false



      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: './img/backgroundLevel3.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 176.0,
            y: 335,
          },
          imageSrc: './img/doorOpen.png',
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ]
    },
  },
  4:{
    init: () => {
      const timerElement = document.getElementById('time');
      timerElement.style.color = '#adff2f '; // Изменить цвет цифр на красный
      timerElement.style.border = '4px solid #adff2f '; // Изменить цвет рамки на красный
      timerElement.style.top = '560px';
      timerElement.style.left = '985px';
      Swal.fire({
        title: 'Вы выиграли!',
        text: 'Позвольте рассказать историю о твоем героическом путешествии через мир нашей захватывающей игры. Сражаясь со свиньями и преодолевая все трудности, ты наконец достигаешь финала. Ты прошел все комнаты, одну за другой, смело сражаясь с врагами и использовая свои навыки.\n Наконец, ты достигаешь последней комнаты, где встречаешь свинью-босса. Твое сердце бьется быстрее, а руки готовы к последней схватке. \nВ итоговом битве ты используешь все свои навыки и смекалку, чтобы победить свинью-босса. Последний удар поражает свинью-босса, и она падает безвольной перед твоими ногами.',
        icon: 'success',
        confirmButtonText: 'Меню',
        customClass: {
          container: 'custom-modal-container',
          title: 'custom-modal-title',
          text: 'custom-modal-text',
          confirmButton: 'custom-modal-button'
        },
        allowOutsideClick: false, // Запретить закрытие модального окна при щелчке за его пределами
      }).then((result) => {
        if (result.isConfirmed) {
          // Обработка нажатия на кнопку "Меню"
          location.reload(); // Перезагрузить страницу
        }
      });
    }
    
  }
}


const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
}

const overlay = {
  opacity: 0,
}

function rectangularCollisionLvl1({rectangle1, rectangle1__1}){
  return(
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle1__1.hitbox.position.x && 
    rectangle1.attackBox.position.x <= rectangle1__1.hitbox.position.x + rectangle1__1.hitbox.width && 
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle1__1.hitbox.position.y && 
    rectangle1.attackBox.position.y <= rectangle1__1.hitbox.position.y + rectangle1__1.hitbox.height
  ) 
}

function rectangularCollisionLvl1_enemy({rectangle1, rectangle2}){
  return(
    rectangle2.attackBox.position.x + rectangle2.attackBox.width >= rectangle1.hitbox.position.x && 
    rectangle2.attackBox.position.x <= rectangle1.hitbox.position.x + rectangle1.hitbox.width && 
    rectangle2.attackBox.position.y + rectangle2.attackBox.height >= rectangle1.hitbox.position.y && 
    rectangle2.attackBox.position.y <= rectangle1.hitbox.position.y + rectangle1.hitbox.height
  ) 
}



function animate() {
  window.requestAnimationFrame(animate)

  background.draw()
  // collisionBlocks.forEach((collisionBlock) => {
  //   collisionBlock.draw()
  // })

  doors.forEach((door) => {
    door.draw()
  })

  if(!player.dead){
    if(player.lastDirection === 'left' && rectangularCollisionLvl1_enemy({rectangle1: player, rectangle2: enemy1__1}) && !enemy1__1.dead){
      enemy1__1.switchSprite('attackLeft')
      enemy1__1.attack()
    } else if(player.lastDirection === 'right' && rectangularCollisionLvl1_enemy({rectangle1: player, rectangle2: enemy1__1}) && !enemy1__1.dead){
      enemy1__1.switchSprite('attack')
      enemy1__1.attack()
    }
  }

  if(!player.dead){
    if(player.lastDirection === 'left' && rectangularCollisionLvl1_enemy({rectangle1: player, rectangle2: enemy2__1}) && !enemy2__1.dead){
      enemy2__1.switchSprite('attackLeft')
      enemy2__1.attack()
    } else if(player.lastDirection === 'right' && rectangularCollisionLvl1_enemy({rectangle1: player, rectangle2: enemy2__1}) && !enemy2__1.dead){
      enemy1__1.switchSprite('attack')
      enemy1__1.attack()
    }
    if(player.lastDirection === 'left' && rectangularCollisionLvl1_enemy({rectangle1: player, rectangle2: enemy2__2}) && !enemy2__2.dead){
      enemy2__2.switchSprite('attackLeft')
      enemy2__2.attack()
    } else if(player.lastDirection === 'right' && rectangularCollisionLvl1_enemy({rectangle1: player, rectangle2: enemy2__2}) && !enemy2__2.dead){
      enemy2__2.switchSprite('attack')
      enemy2__2.attack()
    }
    if(player.lastDirection === 'left' && rectangularCollisionLvl1_enemy({rectangle1: player, rectangle2: enemy2__3}) && !enemy2__3.dead){
      enemy2__3.switchSprite('attackLeft')
      enemy2__3.attack()
    } else if(player.lastDirection === 'right' && rectangularCollisionLvl1_enemy({rectangle1: player, rectangle2: enemy2__3}) && !enemy2__3.dead){
      enemy2__3.switchSprite('attack')
      enemy2__3.attack()
    }
  }

  if(!player.dead){
    if(player.lastDirection === 'left' && rectangularCollisionLvl1_enemy({rectangle1: player, rectangle2: enemy3__1}) && !enemy3__1.dead){
      enemy3__1.switchSprite('attackLeft')
      enemy3__1.attack()
    } else if(player.lastDirection === 'right' && rectangularCollisionLvl1_enemy({rectangle1: player, rectangle2: enemy3__1}) && !enemy3__1.dead){
      enemy3__1.switchSprite('attack')
      enemy3__1.attack()
    }
    if(player.lastDirection === 'left' && rectangularCollisionLvl1_enemy({rectangle1: player, rectangle2: enemy3__2}) && !enemy3__2.dead){
      enemy3__2.switchSprite('attackLeft')
      enemy3__2.attack()
    } else if(player.lastDirection === 'right' && rectangularCollisionLvl1_enemy({rectangle1: player, rectangle2: enemy3__2}) && !enemy3__2.dead){
      enemy3__2.switchSprite('attack')
      enemy3__2.attack()
    }
  }

  if(!player.dead){
    if(player.lastDirection === 'left' && rectangularCollisionLvl1_enemy({rectangle1: player, rectangle2: bigPig}) && !bigPig.dead){
      bigPig.switchSprite('attackLeft')
      bigPig.attack()
    } else if(player.lastDirection === 'right' && rectangularCollisionLvl1_enemy({rectangle1: player, rectangle2: bigPig}) && !bigPig.dead){
      bigPig.switchSprite('attack')
      bigPig.attack()
    }
  }
  document.addEventListener("DOMContentLoaded", function() {
    var menu = document.getElementById("menu");
    var startButton = document.getElementById("start-button");
    var gameCanvas = document.getElementById("canvas");
    var buttons = document.getElementsByTagName("button");
    var startTime;
    var timerInterval;

    playerNameInput.addEventListener('input', function() {
      startButton.disabled = playerNameInput.value.trim() === '';
    });
    startButton.addEventListener("click", function() {
      if (playerNameInput.value.trim() !== '') {
        startTime = Date.now();
        timerInterval = setInterval(updateTime, 1000);
        // Действие, выполняемое при нажатии кнопки "Начать"
        console.log('Игра начата!');
      
      const playerName = playerNameInput.value;
      playerText__2.textContent = playerName;  
      menu.classList.add("hide"); // Добавляем класс "hide" для скрытия меню
      gameCanvas.style.display = "block"; // Показываем игровое поле
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
      }
      var element = document.getElementById("time");
      element.style.display = "block";
      // Здесь вызывайте функцию или методы, которые запускают вашу игру
      // animate();
    }
    else {
      Swal.fire({
        icon: 'warning',
        title: 'Ошибка',
        text: 'Введите имя персонажа',
        confirmButtonText: 'OK',
      });
    }
    });
    function updateTime() {
      var currentTime = Date.now();
      var elapsedTime = Math.floor((currentTime - startTime) / 1000); // Calculate elapsed time in seconds
    
      var minutes = Math.floor(elapsedTime / 60);
      var seconds = elapsedTime % 60;
    
      // Format the time with leading zeros if necessary
      var formattedTime = minutes.toString() + ":" + seconds.toString().padStart(2, "0");
    
      // Update the "time" element
      var timeElement = document.getElementById("time");
      timeElement.textContent = formattedTime;
      if (level === 4 ) {
        clearInterval(timerInterval); // Остановка счетчика времени при достижении четвертого уровня

      }
      if ( player.health <= 0 ) {
        const timerElement = document.getElementById('time');
        timerElement.style.color = '#ff0000 '; // Изменить цвет цифр на красный
        timerElement.style.border = '4px solid #ff0000 '; // Изменить цвет рамки на красный
        timerElement.style.top = '560px';
        timerElement.style.left = '985px';
        clearInterval(timerInterval); // Остановка счетчика времени при достижении четвертого уровня

      }
      
      
    }
  
    const helpButton = document.getElementById('help-button');
    const helpPopup = document.getElementById('help-popup');
    const closeButton = document.getElementById('close-button');
  
    helpButton.addEventListener("click", function() {
      setTimeout(function() {
        helpPopup.style.display = "flex";
        helpPopup.classList.add("show");
      }, 10);
    });
  
    closeButton.addEventListener("click", function() {
      helpPopup.classList.remove("show");
      setTimeout(function() {
        helpPopup.style.display = "none";
      }, 500);
    });
    var exButton = document.getElementById("ex-button");
  
    exButton.addEventListener("click", function() {
      window.close(); // Закрываем окно браузера
    });
  });
  const playerNameInput = document.getElementById('player-name');
  const playerName = playerNameInput.value;
  playerText__2.textContent = playerName;
  playerText__2.style.top = (player.position.y - 13) + 'px'; // Расположение текста выше полоски жизни
  playerText__2.style.left = (player.position.x + 28) + 'px'; // Горизонтальное расположение текста на игроке

  playerText.textContent = playerName;
  playerText.style.top = (player.position.y - 15) + 'px'; // Расположение текста выше полоски жизни
  playerText.style.left = (player.position.x + 29) + 'px'; // Горизонтальное расположение текста на игроке

  player.handleInput(keys)
  player.draw()
  player.update()
  
  if(cntEnemys === 1){
    enemy1__1.draw()
    enemy1__1.update()


    if(
      rectangularCollisionLvl1({
        rectangle1: player,
        rectangle1__1: enemy1__1
      }) && 
      player.isAttacking
    ){
      player.isAttacking = false
      enemy1__1.takeHit()
      document.querySelector('#enemy1__1Health').style.width = enemy1__1.health + '%'
    }


    if(
      rectangularCollisionLvl1_enemy({
        rectangle1: player,
        rectangle2: enemy1__1
      }) && 
      enemy1__1.isAttacking
    ){
      enemy1__1.isAttacking = false
      enemy1__1.stop = true
      player.takeHit()
    } 
    else {
      enemy1__1.stop = false
    }
  
  } else if(cntEnemys === 3){
    enemy2__1.draw()
    enemy2__1.update()

    enemy2__2.draw()
    enemy2__2.update()

    enemy2__3.draw()
    enemy2__3.update()


    if(
      rectangularCollisionLvl1({
        rectangle1: player,
        rectangle1__1: enemy2__1
      }) && 
      player.isAttacking
    ){
      player.isAttacking = false
      enemy2__1.takeHit()
      document.querySelector('#enemy2__1Health').style.width = enemy2__1.health + '%'
    }

    if(
      rectangularCollisionLvl1({
        rectangle1: player,
        rectangle1__1: enemy2__2
      }) && 
      player.isAttacking
    ){
      player.isAttacking = false
      enemy2__2.takeHit()
      document.querySelector('#enemy2__2Health').style.width = enemy2__2.health + '%'
    }

    if(
      rectangularCollisionLvl1({
        rectangle1: player,
        rectangle1__1: enemy2__3
      }) && 
      player.isAttacking
    ){
      player.isAttacking = false
      enemy2__3.takeHit()
      document.querySelector('#enemy2__3Health').style.width = enemy2__3.health + '%'
    }

    if(
      rectangularCollisionLvl1_enemy({
        rectangle1: player,
        rectangle2: enemy2__1
      }) && 
      enemy2__1.isAttacking 
    ){
      enemy2__1.isAttacking = false
      enemy2__1.stop = true
      player.takeHit()
    } 
    else {
      enemy2__1.stop = false
    }

    if(
      rectangularCollisionLvl1_enemy({
        rectangle1: player,
        rectangle2: enemy2__2
      }) && 
      enemy2__2.isAttacking 
    ){
      enemy2__2.isAttacking = false
      enemy2__2.stop = true
      player.takeHit()
    } 
    else {
      enemy2__2.stop = false
    }

    if(
      rectangularCollisionLvl1_enemy({
        rectangle1: player,
        rectangle2: enemy2__3
      }) && 
      enemy2__3.isAttacking 
    ){
      enemy2__3.isAttacking = false
      enemy2__3.stop = true
      player.takeHit()
    } 
    else {
      enemy2__3.stop = false
    }

  } else if(cntEnemys === 2){
    enemy3__1.draw()
    enemy3__1.update()

    enemy3__2.draw()
    enemy3__2.update()


    if(
      rectangularCollisionLvl1({
        rectangle1: player,
        rectangle1__1: enemy3__1
      }) && 
      player.isAttacking
    ){
      player.isAttacking = false
      enemy3__1.takeHit()
      document.querySelector('#enemy3__1Health').style.width = enemy3__1.health + '%'
    }
    
    if(
      rectangularCollisionLvl1({
        rectangle1: player,
        rectangle1__1: enemy3__2
      }) && 
      player.isAttacking
    ){
      player.isAttacking = false
      enemy3__2.takeHit()
      document.querySelector('#enemy3__2Health').style.width = enemy3__2.health + '%'
    }

    if(
      rectangularCollisionLvl1_enemy({
        rectangle1: player,
        rectangle2: enemy3__1
      }) && 
      enemy3__1.isAttacking 
    ){
      enemy3__1.isAttacking = false
      enemy3__1.stop = true
      player.takeHit()
    } 
    else {
      enemy3__1.stop = false
    }

    if(
      rectangularCollisionLvl1_enemy({
        rectangle1: player,
        rectangle2: enemy3__2
      }) && 
      enemy3__2.isAttacking 
    ){
      enemy3__2.isAttacking = false
      enemy3__2.stop = true
      player.takeHit()
    } 
    else {
      enemy3__2.stop = false
    }
  }

  if(bigPigOn){
    bigPig.draw();
    bigPig.update();

    if(
      rectangularCollisionLvl1({
        rectangle1: player,
        rectangle1__1: bigPig
      }) && 
      player.isAttacking
    ){
      player.isAttacking = false
      bigPig.takeHit()
      document.querySelector('#enemyBigPigHealth').style.width = bigPig.health + '%'
    }


    if(
      rectangularCollisionLvl1_enemy({
        rectangle1: player,
        rectangle2: bigPig
      }) && 
      bigPig.isAttacking
    ){
      bigPig.isAttacking = false
      bigPig.stop = true
      player.takeHit()
    }
    else {
      bigPig.stop = false
    }
  }

  c.save()
  c.globalAlpha = overlay.opacity
  c.fillStyle = '#3f3851'
  c.fillRect(0, 0, canvas.width, canvas.height)
  c.restore()

  scoreElem.innerHTML = enemy1__1.score + enemy2__1.score + enemy2__2.score + enemy2__3.score + enemy3__1.score + enemy3__2.score + bigPig.score
  add = enemy1__1.score + enemy2__1.score + enemy2__2.score + enemy2__3.score + enemy3__1.score + enemy3__2.score + bigPig.score
}



levels[level].init()
animate()