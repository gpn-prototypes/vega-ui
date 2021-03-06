import Konva from 'konva';

import { EventData } from './components/EventItem/types';
import { StepData } from './components/StepItem/types';
import { Tree } from './entities/Tree';

export type Position = {
  x: number;
  y: number;
};

export type Coordinates = { parent: Position; child: Position };

export type Size = { width: number; height: number };

export type RectParams = Position & Size;

export type BaseProps = {
  position: Position;
  name: string;
  fill?: string;
  height?: number;
  width?: number;
  onPositionChange?: (position: Position, positionDelta: Position) => void;
};

export type KonvaMouseEvent = Konva.KonvaEventObject<MouseEvent>;
export type KonvaDragEvent = Konva.KonvaEventObject<DragEvent>;

export type ConnectorType = 'parent' | 'children';
export type ConnectorActivateData = { type: ConnectorType; position: Position };

export type ItemConnectorData = {
  type: ConnectorType;
  position: Position;
};

export type ActiveData = {
  item: CanvasTree;
  connector: ItemConnectorData;
};

export type SelectedData =
  | { type: 'item'; ids: string[] }
  | { type: 'line'; parentId: string; childId: string }
  | { type: 'event'; itemId: string; eventId: string }
  | { type: 'domainObject'; eventId: string; objectId: string; stepId?: string };

export type ItemType = 'step' | 'root' | 'end' | 'event';

export type Connection = 'children' | 'parent';

export type CanvasData = {
  title: string;
  type: ItemType;
  position: Position;
  width?: number;
  stepData?: StepData;
  eventData?: EventData;
};

export type RemovedTrees = {
  treeId: string;
  stepDataId?: string;
};

export type CanvasTree = Tree<CanvasData>;
export type CanvasSet = Set<CanvasTree>;

export type CanvasUpdate =
  | { type: 'add-tree'; id: string }
  | { type: 'change'; id: string; changes: Partial<CanvasData> }
  | { type: 'change-multiple'; ids: string[]; changes: Partial<CanvasData>[] }
  | { type: 'select'; selected: SelectedData | null }
  | { type: 'unselect' }
  | { type: 'drop-event'; intersectionId?: string; position?: Position }
  | { type: 'remove-trees'; removedTrees: RemovedTrees[] }
  | { type: 'disconnect-tree'; parentId: string; childId: string }
  | { type: 'connect-tree'; parentId: string; childId: string }
  | { type: 'clear' }
  | { type: 'update-children'; id: string; newChildrenIds: string[] }
  | { type: 'update-trees'; newTrees: CanvasTree[] };
