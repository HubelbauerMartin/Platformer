window.addEventListener('load', () => {
    const width = 640
    const height = 480
    const floorHeight = 20
    const playerWidth = 10
    const playerHeight = 30
    let playerX = width / 2
    let playerY = height - floorHeight - playerHeight
    let momentumX = 0
    let jump = 0

    /** @type {HTMLCanvasElement} */
    const gameCanvas = document.querySelector('#gameCanvas')
    gameCanvas.width = width
    gameCanvas.height = height

    const context = gameCanvas.getContext('2d')

    window.requestAnimationFrame(function render() {
        playerX += momentumX
        if (momentumX > 0) {
            momentumX -= 1
        }
        else if (momentumX < 0) {
            momentumX += 1
        }

        let playerYJump = playerY

        if (jump != 0) {
            jump += 2
            if (jump > 100) {
                jump = 0
            }

            const a = jump / 50 //1 - 100 ~ 0 - 2
            const b = a - 1 //0 - 2 ~ -1 - 1
            const c = b * Math.PI //-1 - 1 ~ -Pi - Pi
            const d = Math.cos(c)
            const e = d + 1
            const f = e * 25
            playerYJump -= f
        }

        context.fillStyle = 'black'
        context.fillRect(0, 0, width, height)

        context.fillStyle = 'grey'
        context.fillRect(0, height - floorHeight, width, floorHeight)

        context.fillStyle = 'green'
        context.fillRect(playerX, playerYJump, playerWidth, playerHeight)

        window.requestAnimationFrame(render)
    })

    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowLeft': {
                momentumX -= 5
                if (momentumX < -20) { momentumX = - 20 }
                break
            }
            case 'ArrowRight': {
                momentumX += 5
                if (momentumX > 20) { momentumX = 20 }
                break
            }
            case 'ArrowUp': {
                if (jump == 0) {
                    jump = 1
                }
                break
            }
        }
    })
})