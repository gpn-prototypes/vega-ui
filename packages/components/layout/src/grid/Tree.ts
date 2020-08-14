import { Cursor } from './Cursor';
import { Branch, Leaf, Node } from './Node';
import { Split, SplitDirection as Direction } from './Split';

export type TreeNode = Branch | Leaf;
type Optional<T> = T | undefined;

type WithRoot<T> = {
  [idx: string]: T;
  '0': T;
};

export type TreeState = WithRoot<TreeNode>;

type TreeEntry = [number, TreeNode];

export class Tree {
  private state: TreeState;

  static create(state?: TreeState): Tree {
    return Tree.of(state ?? { 0: Node.createLeaf() });
  }

  static of(state: TreeState): Tree {
    return new Tree({ ...state });
  }

  static from(nodes: TreeNode[]): Tree {
    const [root] = nodes;
    return Tree.create({
      ...Object.fromEntries(Object.entries(nodes)),
      0: root,
    });
  }

  private constructor(state: TreeState) {
    this.state = state;
  }

  public nth(idx: number): Optional<TreeNode> {
    return this.state[idx];
  }

  public root(): TreeNode {
    const root = this.nth(0);

    if (root === undefined) {
      throw new Error('Отсутствует корневой элемент');
    }

    return root;
  }

  public max(): TreeEntry | [number, null] {
    let index = 0;
    let node = this.root();

    if (node === undefined) {
      return [index, null];
    }

    this.iterate((n, idx) => {
      node = idx > index ? n : node;
      index = Math.max(index, idx);
    });

    return [index, node];
  }

  private iterate(fn: (node: TreeNode, idx: number, done: () => void) => null | void): void {
    let isDone = false;
    const entries = Object.entries(this.state);

    function done(): void {
      isDone = true;
    }

    for (let i = 0; i < entries.length; ) {
      const [idx, node] = entries[i];

      fn(node, Number(idx), done);

      if (isDone) {
        break;
      }

      i += 1;
    }
  }

  public indexOf(node: TreeNode): number {
    let index = -1;

    this.iterate((n, idx, done) => {
      if (n === node) {
        index = idx;
        done();
      }
    });

    return index;
  }

  public insert(idx: number, node: TreeNode): void {
    this.state[idx] = node;
  }

  private lift(fromIdx: number, toIdx: number): void {
    const cursor = Cursor.of(fromIdx);
    const targetCursor = Cursor.of(toIdx);
    const node = this.nth(cursor.index());

    if (node === undefined) {
      return;
    }

    delete this.state[cursor.index()];

    this.insert(targetCursor.index(), node);

    if (Node.isBranch(node)) {
      if (cursor.isLeft()) {
        this.lift(cursor.right(), targetCursor.right());
        this.lift(cursor.left(), targetCursor.left());
      }

      if (cursor.isRight()) {
        this.lift(cursor.left(), targetCursor.left());
        this.lift(cursor.right(), targetCursor.right());
      }
    }
  }

  public remove(idx: number): void {
    const cursor = Cursor.of(idx);
    const parent = this.nth(cursor.parent());

    if (parent !== undefined && Node.isBranch(parent)) {
      delete this.state[idx];
      this.lift(cursor.index(), cursor.parent());
    }
  }

  public toBranch(idx: number, splitDirection: Direction): void {
    const node = this.nth(idx);

    if (node === undefined || Node.isBranch(node)) {
      return;
    }

    const leaf = node;
    const cursor = Cursor.of(idx);
    const branch = Node.createBranch({ splitDirection });

    this.insert(idx, branch);

    if (Split.of(splitDirection).isBefore()) {
      this.insert(cursor.left(), Node.cloneLeaf(leaf));
      this.insert(cursor.right(), leaf);
    } else {
      this.insert(cursor.left(), leaf);
      this.insert(cursor.right(), Node.cloneLeaf(leaf));
    }
  }

  public extract(): TreeState {
    return this.state;
  }
}
