import { Position } from '../types';

import { Node } from './Node';
import { Listener, Notifier } from './Notifier';
import { Tree } from './Tree';

export type Connection = 'children' | 'parent';

export type Context = {
  title: string;
  type: 'step' | 'root' | 'end';
  position: Position;
  canHasConnections?: [Connection, Connection?];
};

export type CanvasUpdate =
  | { type: 'add-tree'; id: string }
  | { type: 'change'; id: string; changes: Context }
  | { type: 'remove-tree'; id: string }
  | { type: 'disconnect-tree'; id: string; oldParentId: string }
  | { type: 'connect-tree'; parentId: string; childId: string }
  | { type: 'clear' };

export type FlatTree = {
  data: Context;
  parentId: string | null;
  children: string[];
  id: string;
};

export type CanvasTree = Tree<Context>;

export class Canvas {
  private trees: CanvasTree[];

  private notifier: Notifier<CanvasUpdate> = new Notifier();

  private constructor(trees: CanvasTree[]) {
    this.trees = trees;
  }

  static toFlat(tree: CanvasTree): FlatTree {
    const parent = tree.getParent();
    return {
      id: tree.getId(),
      children: tree.getChildren().map((child) => child.getId()),
      parentId: parent ? parent.getId() : null,
      data: tree.getData(),
    };
  }

  static toFlatArray(trees: CanvasTree[]): FlatTree[] {
    const flattenTree = (root: CanvasTree): CanvasTree[] => {
      const flatten = [root];

      return flatten.concat(root.getChildren().flatMap((child) => flattenTree(child)));
    };

    const flatTrees = trees.reduce<CanvasTree[]>(
      (prev, next) => prev.concat(flattenTree(next)),
      [],
    );

    return flatTrees.map((tree) => Canvas.toFlat(tree));
  }

  static toTrees(flatTrees: FlatTree[]): CanvasTree[] {
    const trees: [CanvasTree, FlatTree][] = flatTrees.map((item) => {
      return [Tree.of(new Node({ data: item.data, id: item.id })), item];
    });

    const nest = (items: [CanvasTree, FlatTree][], id: string | null = null): CanvasTree[] => {
      return items
        .filter(([, flatTree]) => {
          return flatTree.parentId === id;
        })
        .map(([tree, flatTree]) => {
          const children = nest(items, flatTree.id);
          tree.setChildren(children);
          return tree;
        });
    };

    return nest(trees);
  }

  static create(rootNode: Node<Context>): Canvas {
    return new Canvas([Tree.of<Context>(rootNode)]);
  }

  static of(trees: FlatTree[]): Canvas {
    return new Canvas(Canvas.toTrees(trees));
  }

  static from(trees: CanvasTree[]): Canvas {
    return new Canvas(trees);
  }

  public extract(): FlatTree[] {
    return Canvas.toFlatArray(this.trees);
  }

  public addListener(listener: Listener<CanvasUpdate>): VoidFunction {
    return this.notifier.addListener(listener);
  }

  public removeAllListeners(): void {
    this.notifier.removeAllListeners();
  }

  public getTrees(): CanvasTree[] {
    return this.trees;
  }

  public iterate(fn: (node: Node) => void): void {
    this.trees.forEach((tree) => {
      tree.iterate(fn);
    });
  }

  public removeTree(tree: CanvasTree): void {
    const treeIndex = this.trees.findIndex((child) => child.getId() === tree.getId());
    if (treeIndex !== undefined) {
      this.trees.splice(treeIndex, 1);
      this.notifier.notify({
        type: 'remove-tree',
        id: tree.getId(),
      });
    }
  }

  public addTree(tree: CanvasTree): void {
    this.trees.push(tree);
    this.notifier.notify({
      id: tree.getId(),
      type: 'add-tree',
    });
  }

  public connectTrees(parentTree: CanvasTree, childTree: CanvasTree): void {
    childTree.setParent(parentTree);
    this.removeTree(childTree);
    this.notifier.notify({
      type: 'connect-tree',
      childId: childTree.getId(),
      parentId: parentTree.getId(),
    });
  }

  public disconnectTree(childTree: CanvasTree): void {
    const treeNode = childTree.extract();
    const parent = treeNode.getParent();

    if (parent) {
      parent.removeChild(treeNode);
      childTree.setParent(null);

      this.addTree(childTree);
      this.notifier.notify({
        type: 'disconnect-tree',
        id: childTree.getId(),
        oldParentId: parent.getId(),
      });
    }
  }

  public setTreeData(tree: CanvasTree, data: Context): void {
    tree.setData(data);
    this.notifier.notify({
      type: 'change',
      id: tree.getId(),
      changes: data,
    });
  }

  public removeTrees(): void {
    this.trees = this.trees.filter((tree) => tree.getData().type !== 'step');
    this.notifier.notify({ type: 'clear' });
  }
}
