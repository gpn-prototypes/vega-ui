export class Cursor {
  private idx: number;

  static of(idx: number): Cursor {
    return new Cursor(idx);
  }

  static create(idx = 0): Cursor {
    return Cursor.of(idx);
  }

  private constructor(idx: number) {
    this.idx = idx < 0 ? 0 : idx;
  }

  public to(idx: number): this {
    this.idx = idx;
    return this;
  }

  public index(): number {
    return this.idx;
  }

  public clone(): Cursor {
    return Cursor.of(this.idx);
  }

  public left(): number {
    return this.idx * 2 + 1;
  }

  public right(): number {
    return this.idx * 2 + 2;
  }

  public parent(): number {
    if (this.idx <= 0) {
      return -1;
    }

    return Math.floor((this.idx - 1) / 2);
  }

  public sibling(): number {
    if (this.isLeft()) {
      return this.toParent().right();
    }

    if (this.isRight()) {
      return this.toParent().left();
    }

    return -1;
  }

  public isChild(): boolean {
    return this.idx > 0;
  }

  public isLeft(): boolean {
    if (!this.isChild()) {
      return false;
    }

    return !this.isRight();
  }

  public isRight(): boolean {
    if (!this.isChild()) {
      return false;
    }

    return this.idx % 2 === 0;
  }

  public toLeft(): Cursor {
    return Cursor.of(this.left());
  }

  public toRight(): Cursor {
    return Cursor.of(this.right());
  }

  public toParent(): Cursor {
    return Cursor.of(this.parent());
  }

  public toSibling(): Cursor {
    return Cursor.of(this.sibling());
  }
}
