type BoundingRect = { x: number; y: number; width: number; height: number };

interface QuadTreeNode<T> {
  bounds: BoundingRect;
  points: T[];
  children: QuadTreeNode<T>[];
}

export class Quadtree<T> {
  root: QuadTreeNode<T>;

  constructor(bounds: BoundingRect) {
    this.root = { bounds, points: [], children: [] };
  }
}

class SpatialNavigation {
  constructor() {}

  init() {
    //
  }
}

const MySpatialNavigation = new SpatialNavigation();

export const { init } = MySpatialNavigation;

export interface SpatialNode<T> {
  value: T;
  left?: SpatialNode<T>;
  right?: SpatialNode<T>;
  up?: SpatialNode<T>;
  down?: SpatialNode<T>;
}
