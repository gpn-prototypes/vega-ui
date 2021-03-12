import React, { useContext, useLayoutEffect, useRef, useState } from 'react';

import { IconArrowDown, IconArrowRight } from '../icons';

import cnTree from './cn-tree';
import TreeContext from './context';
import { TreeItemContainer } from './TreeItemContainer';
import { TreeItemContent } from './TreeItemContent';
import { TreeItem } from './types';
import { useTreeHandlers } from './use-tree-handlers';
import { useVisibilityIdentifier } from './use-visability-identifier';

export const TreeNode: React.FC<TreeItem> = (props) => {
  const {
    name,
    id,
    children,
    isDraggable = true,
    isDropZone = true,
    iconId,
    isExpanded = false,
  } = props;

  const {
    showIndentGuides,
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

  const [expanded, setExpanded] = useState(isExpanded);

  useLayoutEffect(() => {
    if (isExpanded) {
      setExpanded(true);
    }
  }, [isExpanded]);

  const targetRef = useRef<HTMLLIElement | null>(null);
  const dropZoneRef = useRef<HTMLUListElement | null>(null);

  const {
    targetData,
    handleDragStart,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleSelect,
    handleHide,
    handleContextMenuOpen,
  } = useTreeHandlers({
    id,
    ref: targetRef,
    dropZoneRef,
    onContextMenu,
    onSelectItem,
    isDropZone,
    isDraggable: isDndEnable && isDraggable,
    onHideItem,
    onDragStart,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDragDrop,
  });

  const visibilityIdentifier = useVisibilityIdentifier({ ref: targetRef, handleHide, hiddenItems });

  const handleToggleExpand = (event: React.MouseEvent | React.KeyboardEvent): void => {
    event.stopPropagation();

    setExpanded(!expanded);
  };

  return (
    <TreeItemContainer
      className={cnTree('TreeNode')}
      draggable={isDndEnable}
      onDragStart={handleDragStart}
      id={id}
      targetRef={targetRef}
      onContextMenu={handleContextMenuOpen}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnd={onDragEnd}
      aria-label="List name"
    >
      <TreeItemContent
        className={cnTree('NavigationItem', {
          Selected: selectedItems?.includes(targetData),
          AccessibleDropZone:
            withDropZoneIndicator &&
            dropZone &&
            dropZone.ref === dropZoneRef &&
            dropZone.accessible,
          InaccessibleDropZone:
            withDropZoneIndicator &&
            dropZone &&
            dropZone.ref === dropZoneRef &&
            !dropZone.accessible,
          Hidden: visibilityIdentifier.isHidden,
        })}
        onClick={handleSelect}
        name={name}
        iconId={iconId}
        renderVisibilitySwitcher={visibilityIdentifier.renderVisibilitySwitcher}
      >
        <button
          className={cnTree('NavigationArrow', { expanded })}
          onClick={handleToggleExpand}
          role="menuitem"
          onKeyPress={handleToggleExpand}
          aria-label="List controller"
          type="button"
          tabIndex={0}
        >
          {expanded ? <IconArrowDown size="s" /> : <IconArrowRight size="s" />}
        </button>
      </TreeItemContent>

      <ul
        ref={dropZoneRef}
        data-container-id={id}
        onDragLeave={handleDragLeave}
        className={cnTree('NodeList', { expanded, withIndentGuides: showIndentGuides && expanded })}
      >
        {children}
      </ul>
    </TreeItemContainer>
  );
};
