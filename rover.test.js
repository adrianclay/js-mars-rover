const cmds = { f: 1, b: -1}
const directions = { n: 1, e: 1, s: -1, w: -1 }
const clockwise_directions = Object.keys(directions)

class Rover {
  constructor(x, y, d) {

    if (! ['n', 's', 'e', 'w'].includes(d)){
      throw('Invalid state!')
    }
    this.state = [x, y, d]
  }

  modulo(n){
    return ((n%4)+4)%4;
  }

  rotate(n){
    this.state[2] = clockwise_directions[(clockwise_directions.indexOf(this.state[2]) + n + 4) % 4]
  }

  exec(command){

    let inc = 0

    switch (command) {
      case 'f': case 'b':
          inc = cmds[command] * directions[this.state[2]]
        break
      case 'r':
        this.rotate(1)
        break
      case 'l':
        this.rotate(-1)
        break
    }

    if(['w', 'e'].includes(this.state[2])) {
      this.state[0] += inc
    } else {
      this.state[1] += inc
    }
  }

}

describe('Initialize the Rover', () => {

  test('with a valid state', () => {
    const rover = new Rover(1,2, 'n')

    expect(rover.state).toEqual([1,2,'n'])
  })

  test('with a invalid state', () => {
    expect(() => { new Rover(1,2, 'X') }).toThrow(/Invalid state/)
  })

})

describe('Rover processes a single command.', () => {
  test.each([
    ['n', 'f', 1, 3],
    ['s', 'f', 1, 1],
    ['e', 'f', 2, 2],
    ['n', 'b', 1, 1],
    ['s', 'b', 1, 3],
    ['w', 'b', 2, 2]
  ])('starting at (1, 2) and facing %s, a %s command ends up at (%i, %i)', (direction, command, finalX, finalY) => {
    const rover = new Rover(1, 2, direction)

    rover.exec(command)
    expect(rover.state).toEqual([finalX, finalY, direction])
  })

  test.each([
    ['s', 'r', 'w'],
    ['w', 'r', 'n'],
    ['s', 'l', 'e'],
    ['n', 'l', 'w']
  ])('starting facing %s, a %s command rotates to %s', (startDirection, command, endDirection) => {
    const rover = new Rover(1, 1, startDirection)

    rover.exec(command)
    expect(rover.state).toEqual([1, 1, endDirection])
  })

})
