window.addEventListener('keydown', (event) => {
  if(!player.dead){
    if (player.preventInput) return
    switch (event.key) {
      case 'F':
      case 'f':
      case 'А':
      case 'а':
        for (let i = 0; i < doors.length; i++) {
          const door = doors[i]

          if (
            player.hitbox.position.x + player.hitbox.width <=
              door.position.x + door.width &&
            player.hitbox.position.x >= door.position.x &&
            player.hitbox.position.y + player.hitbox.height >= door.position.y &&
            player.hitbox.position.y <= door.position.y + door.height
          ) {
            if((add === 10 && level==1) || (add=== 40 && level==2) || (add === 999 && level==3)){
                player.velocity.x = 0
                player.velocity.y = 0
                player.preventInput = true
                player.switchSprite('enterDoor')
                door.play()
                return
              }
          }
        }

        break
      case 'A':
      case 'a':
      case 'Ф':
      case 'ф':
        // move player to the left
        keys.a.pressed = true
        break
      case 'D':
      case 'd':
      case 'В':
      case 'в':
        // move player to the right
        keys.d.pressed = true
        break
      case 'W':
      case 'w':
      case 'Ц':
      case 'ц':
        player.jump()
        break
        
      case ' ':
        player.attack()
        break
    }
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'A':
    case 'a':
    case 'Ф':
    case 'ф':
      // move player to the left
      keys.a.pressed = false

      break
    case 'D':
    case 'd':
    case 'В':
    case 'в':
      // move player to the right
      keys.d.pressed = false

      break
  }
})
