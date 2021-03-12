import React, { useContext, useRef } from 'react';

import cnTree from './cn-tree';
import TreeContext from './context';
import { TreeItemContainer } from './TreeItemContainer';
import { TreeItemContent } from './TreeItemContent';
import { TreeItem } from './types';
import { useTreeHandlers } from './use-tree-handlers';
import { useVisibilityIdentifier } from './use-visability-identifier';

export const TreeLeaf: React.FC<TreeItem> = (props) => {
  const { id, name, isDraggable = true, iconId, isDropZone = true } = props;

  const targetRef = useRef<HTMLLIElement | null>(null);

  const {
    selectedItems,
    hiddenItems,
    isDndEnable,
    dropZone,
    onHideItem,
    onContextMenu,
    onSelectItem,
    onDragStart,
    onDragEnd,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDragDrop,
    withDropZoneIndicator,
  } = useContext(TreeContext);

  const {
    targetData,
    handleSelect,
    handleHide,
    handleContextMenuOpen,
    handleDragStart,
    handleDragEnter,
    handleDragOver,
    handleDrop,
  } = useTreeHandlers({
    id,
    ref: targetRef,
    dropZoneRef: targetRef,
    onContextMenu,
    isDraggable: isDndEnable && isDraggable,
    onSelectItem,
    onHideItem,
    onDragStart,
    isDropZone,
    onDragEnd,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDragDrop,
  });

  const visibilityIdentifier = useVisibilityIdentifier({ ref: targetRef, handleHide, hiddenItems });

  return (
    <TreeItemContainer
      className={cnTree('Leaf')}
      draggable={isDndEnable}
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnd={onDragEnd}
      id={id}
      targetRef={targetRef}
      onContextMenu={handleContextMenuOpen}
    >
      <TreeItemContent
        className={cnTree('NavigationItem', {
          Selected: selectedItems?.includes(targetData),
          AccessibleDropZone:
            withDropZoneIndicator && dropZone && dropZone.ref === targetRef && dropZone.accessible,
          InaccessibleDropZone:
            withDropZoneIndicator && dropZone && dropZone.ref === targetRef && !dropZone.accessible,
          Hidden: visibilityIdentifier.isHidden,
        })}
        onClick={handleSelect}
        name={name}
        iconId={iconId}
        renderVisibilitySwitcher={visibilityIdentifier.renderVisibilitySwitcher}
      />
    </TreeItemContainer>
  );
};
