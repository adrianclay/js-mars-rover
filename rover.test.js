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

describe('Rover receives an', () => {
  describe('exec forward command', () => {
    it('when facing north', () => {
      const rover = new Rover(1, 2, 'n')

      rover.exec('f')
      expect(rover.state).toEqual([1, 3, 'n'])
    })

    it('when facing south', () => {
      const rover = new Rover(1, 2, 's')

      rover.exec('f')
      expect(rover.state).toEqual([1, 1, 's'])
    })

    test('when facing east', () => {
      const rover = new Rover(1, 2, 'e')

      rover.exec('f')
      expect(rover.state).toEqual([2, 2, 'e'])
    })
  })

  describe('exec backwards command', () => {
    test('when facing north', () => {
      const rover = new Rover(1, 2, 'n')

      rover.exec('b')
      expect(rover.state).toEqual([1, 1, 'n'])
    })

    test('when facing south', () => {
      const rover = new Rover(1, 2, 's')

      rover.exec('b')
      expect(rover.state).toEqual([1, 3, 's'])
    })

    test('when facing west', () => {
      const rover = new Rover(1, 2, 'w')

      rover.exec('b')
      expect(rover.state).toEqual([2, 2, 'w'])
    })
  })

  describe('exec left command', () => {
    test('when facing south', () => {
      const rover = new Rover(1, 1, 's')

      rover.exec('l')
      expect(rover.state).toEqual([1, 1, 'e'])
    })

    test('when facing north', () => {
      const rover = new Rover(1, 1, 'n')

      rover.exec('l')
      expect(rover.state).toEqual([1, 1, 'w'])
    })
  })

  describe('right rotation', () => {
    test('when facing south', () => {
      const rover = new Rover(1, 1, 's')

      rover.exec('r')
      expect(rover.state).toEqual([1, 1, 'w'])
    })

    test('when facing west', () => {
      const rover = new Rover(1, 1, 'w')

      rover.exec('r')
      expect(rover.state).toEqual([1, 1, 'n'])
    })
  })

})
