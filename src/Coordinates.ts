
export class Coordinates {
  private readonly x: number
  private readonly y: number

  constructor (x: number, y: number) {
    this.x = x
    this.y = y
  }

  public getXCoordinate (): number {
    return this.x
  }

  public getYCoordinate (): number {
    return this.y
  }
}
