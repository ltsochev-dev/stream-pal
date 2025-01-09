type BoundingRect = { x: number; y: number; width: number; height: number };

interface QuadTreeNode<T> {
  bounds: BoundingRect;
  points: T[];
  children: QuadTreeNode<T>[];
}

class Quadtree<T> {
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
