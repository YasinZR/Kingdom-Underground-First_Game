class Player extends Sprite {
  constructor({ collisionBlocks = [], imageSrc, frameRate, animations, loop, position, velocity, offset }) {
    super({ imageSrc, frameRate, animations, loop })
    this.position = position

    this.velocity = velocity

    this.sides = {
      bottom: this.position.y + this.height,
    }
    this.gravity = 1

    this.collisionBlocks = collisionBlocks;

    this.attackBox = {
      position:{
        x: this.position.x,
        y: this.position.y
      },
      offset,
      width: 50,
      height: 25,
    }

    this.isAttacking
    this.dead = false

    this.maxHealth = 100; // Максимальное значение здоровья игрока
    this.health = this.maxHealth; // Здоровье игрока (изначально равно максимальному значению)
    this.healthBarWidth = 100; // Ширина полоски здоровья
    this.healthBarHeight = 10; // Высота полоски здоровья
  }

  update() {
    // this is the blue box
    // c.fillStyle = 'rgba(0, 0, 255, 0.5)'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)

    if(!this.dead) this.updateFrames()

    this.position.x += this.velocity.x

    this.updateHitbox()

    this.checkForHorizontalCollisions()
    this.applyGravity()

    this.updateHitbox()

    // c.fillRect(
    //   this.hitbox.position.x,
    //   this.hitbox.position.y,
    //   this.hitbox.width,
    //   this.hitbox.height
    // )
    this.checkForVerticalCollisions()

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y 

    // if(this.isAttacking){
    //   c.fillStyle = 'rgba(255, 0, 0, 0.5)'
    //   c.fillRect(
    //     this.attackBox.position.x, 
    //     this.attackBox.position.y, 
    //     this.attackBox.width, 
    //     this.attackBox.height
    //   )
    // }

    const healthBarX = this.position.x + 29;
    const healthBarY = this.position.y + 10; // Полоска здоровья над игроком
    const healthPercentage = (this.health / this.maxHealth) * 100; // Расчет процента здоровья

    c.fillStyle = '#fbce9b'
    c.fillRect(healthBarX - 2, healthBarY - 2, this.healthBarWidth + 4, this.healthBarHeight + 4)

    c.fillStyle = '#f07860';
    c.fillRect(healthBarX, healthBarY, this.healthBarWidth, this.healthBarHeight);

    c.fillStyle = '#8ca9b5';
    const currentHealthWidth = (this.healthBarWidth * healthPercentage) / 100;
    if(this.health >= 0)    
      c.fillRect(healthBarX, healthBarY, currentHealthWidth, this.healthBarHeight);
  }

  attack(){
    if(this.lastDirection === 'left'){
        this.attackBox.offset.x = 10;
        this.switchSprite('attackLeft')
        this.isAttacking = true
        setTimeout(() => {
          this.isAttacking = false
        }, 100)
    } else {
      this.switchSprite('attack')
      this.attackBox.offset.x = 100;
        this.isAttacking = true
        setTimeout(() => {
          this.isAttacking = false
        }, 100)
    }
  }

  takeHit(){
      this.health -= 1

      if(this.health === 0){
        this.switchSprite('dead')
        Swal.fire({
          title: 'Вас убили!',
          text: 'Неизвестные обстоятельства привели тебя к мрачному падению перед мощью свиней.\n Величественно ты сражался, преодолевая все трудности и воплощая смысл храбрости. Однако, несмотря на все усилия, угасла твоя светлая звезда, и ты пребываешь в пучине победы свиней.\n Покойся с миром, великий воин, и да будут твои подвиги запечатлены в памяти истории.',
          icon: 'error',
          confirmButtonText: 'Начать заново',
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
      else {
        if(this.lastDirection === 'left'){
          this.switchSprite('hitLeft')
          this.position.x += 10
        } else {
          this.switchSprite('hit')
          this.position.x += -10
        } 
        this.velocity.y = -5
      }
  }

  jump(){
    if (this.velocity.y === 0) 
      this.velocity.y = -15
  }

  handleInput(keys) {
    if (this.preventInput) return
    this.velocity.x = 0
    if (keys.d.pressed) {
      this.switchSprite('runRight')
      this.velocity.x = 5
      this.lastDirection = 'right'
    } else if (keys.a.pressed) {
      this.switchSprite('runLeft')
      this.velocity.x = -5
      this.lastDirection = 'left'
    } else {
      if (this.lastDirection === 'left') this.switchSprite('idleLeft')
      else this.switchSprite('idleRight')
    }
  }

  switchSprite(name) {
    if(this.image === this.animations['dead'].image){
      if(this.currentFrame === this.animations['dead'].frameBuffer)
        this.dead = true
      return
    }

    if(this.image === this.animations['attack'].image && (this.currentFrame + 1) < this.animations['attack'].frameBuffer - 1) return
    if(this.image === this.animations['attackLeft'].image && (this.currentFrame + 1) < this.animations['attackLeft'].frameBuffer - 1) return

    if(this.image === this.animations['hit'].image && (this.currentFrame + 3) < this.animations['hit'].frameBuffer) return
    if(this.image === this.animations['hitLeft'].image && (this.currentFrame + 3) < this.animations['hitLeft'].frameBuffer) return

    if (this.image === this.animations[name].image) return
    this.currentFrame = 0
    this.image = this.animations[name].image
    this.frameRate = this.animations[name].frameRate
    this.frameBuffer = this.animations[name].frameBuffer
    this.loop = this.animations[name].loop
    this.currentAnimation = this.animations[name]

    if (name === 'dead') {
      this.loop = false; // Отключаем повторение анимации смерти
    }
  }

  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 58,
        y: this.position.y + 34,
      },
      width: 50,
      height: 53,
    }
  }

  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i]

      // if a collision exists
      if (
        this.hitbox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >=
          collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >=
          collisionBlock.position.y &&
        this.hitbox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        // collision on x axis going to the left
        if (this.velocity.x < -0) {
          const offset = this.hitbox.position.x - this.position.x
          this.position.x =
            collisionBlock.position.x + collisionBlock.width - offset + 0.01
          break
        }

        if (this.velocity.x > 0) {
          const offset =
            this.hitbox.position.x - this.position.x + this.hitbox.width
          this.position.x = collisionBlock.position.x - offset - 0.01
          break
        }
      }
    }
  }

  applyGravity() {
    this.velocity.y += this.gravity
    this.position.y += this.velocity.y
  }

  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i]

      // if a collision exists
      if (
        this.hitbox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >=
          collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >=
          collisionBlock.position.y &&
        this.hitbox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.y < 0) {
          this.velocity.y = 0
          const offset = this.hitbox.position.y - this.position.y
          this.position.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01
          break
        }

        if (this.velocity.y > 0) {
          this.velocity.y = 0
          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height
          this.position.y = collisionBlock.position.y - offset - 0.01
          break
        }
      }
    }
  }
}