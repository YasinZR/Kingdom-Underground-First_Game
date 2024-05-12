class BigPig extends Sprite {
  constructor({ collisionBlocks = [], imageSrc, frameRate, animations, loop, position, velocity, step, offset}) {
    super({ imageSrc, frameRate, animations, loop });
    this.position = position;
    this.velocity = velocity;
    this.step = step;
    this.dir;
    this.delay = 15;
    this.attackDelay = 1000; // Задержка между атаками (1000 миллисекунд)
    this.lastAttackTime = 0; // Время последней атаки // Задержка между перемещениями (10 миллисекунд)

    this.sides = {
      bottom: this.position.y + this.height,
    };
    this.gravity = 1;

    this.collisionBlocks = collisionBlocks;

    this.attackBox = {
      position:{
        x: this.position.x,
        y: this.position.y
      },
      offset,
      width: 150,
      height: 25,
    }

    this.isAttacking = false

    this.stop = false
    this.lastDirection;

    this.health = 100

    this.score = 0;
  }

  update() {
    // this is the blue box
    // c.fillStyle = 'rgba(0, 0, 255, 0.5)'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)

    if(!this.dead){
      this.updateFrames()
      if(this.isAttacking){
        return;
      }
    }

    this.position.x += this.velocity.x;
    this.updateHitbox();
    this.checkForHorizontalCollisions();
    this.applyGravity();
    this.updateHitbox();

    // c.fillRect(
    //   this.hitbox.position.x,
    //   this.hitbox.position.y,
    //   this.hitbox.width,
    //   this.hitbox.height
    // )

    this.checkForVerticalCollisions();

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y 

    // if(this.isAttacking){
      // c.fillStyle = 'rgba(255, 0, 0, 0.5)'
      // c.fillRect(
      //   this.attackBox.position.x, 
      //   this.attackBox.position.y, 
      //   this.attackBox.width, 
      //   this.attackBox.height
      // )
    // }

    if(!this.dead){
      if(this.stop === false){
        if(this.lastDirection === 'runLeft'){
          this.velocity.x = 0
          this.switchSprite('idleRight')
          this.lastDirection === 'left'
        }
        else if(this.lastDirection === 'runRight'){
          this.velocity.x = 0
          this.switchSprite('idleLeft')
          this.lastDirection === 'right'
        }
        this.move()
      } 
    } else {
      this.velocity.x = 0;
    }
  }

  attack(){
      this.isAttacking = true
      setTimeout(() => {
        this.isAttacking = false
      }, 100)
  }

  takeHit(){
    this.health -= 5;

    // if(this.lastDirection === 'runLeft' && this.health >= 0){
    //   this.position.x += 7
    // } else if(this.lastDirection === 'runRight' && this.health >= 0){
    //   this.position.x += -7
    // } else 
    if(this.health <= 0){
      this.score = 939;
      this.dead = true
      this.switchSprite('dead')
    }
    if(player.lastDirection === 'right' && this.health <= 0)
      this.velocity.x = 20
    else if(player.lastDirection === 'left' && this.health <= 0) this.velocity.x = -20
    this.velocity.y = -12
  }

  switchSprite(name) {
    if(this.image === this.animations['dead'].image){
      if(this.currentFrame === this.animations['dead'].frameBuffer)
        this.dead = true
      return
    }

    if(this.image === this.animations['attack'].image && this.currentFrame < this.animations['attack'].frameBuffer) return
    if(this.image === this.animations['attackLeft'].image && this.currentFrame < this.animations['attackLeft'].frameBuffer) return

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
        x: this.position.x + 12,
        y: this.position.y + 20,
      },
      width: this.width - 20,
      height: this.height - 20,
    };
  }

  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      // if a collision exists
      if (
        this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
        this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        // collision on x axis going to the left
        if (this.velocity.x < -0) {
          const offset = this.hitbox.position.x - this.position.x;
          this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01;
          break;
        }

        if (this.velocity.x > 0) {
          const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;
          this.position.x = collisionBlock.position.x - offset - 0.01;
          break;
        }
      }
    }
  }

  applyGravity() {
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
  }

  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      // if a collision exists
      if (
        this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
        this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          const offset = this.hitbox.position.y - this.position.y;
          this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01;
          break;
        }

        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
          this.position.y = collisionBlock.position.y - offset - 0.01;
          break;
        }
      }
    }
  }

  move() {
    if(this.position.x == this.position.startX){
      this.lastDirection = 'runRight'
    }
    if(this.position.x == (this.position.startX - this.step)){
      this.lastDirection = 'runLeft'
    }
  }
};