import React, { useEffect, useState } from 'react';
import { TargetData } from '@gpn-prototypes/vega-ui';

type UseTreeHandlersProps = {
  id: string;
  ref: React.RefObject<HTMLElement>;
  isDraggable: boolean;
  onHideItem?: (ref: React.RefObject<HTMLElement | HTMLLIElement>) => void;
  onSelectItem?: (selectedItem: TargetData) => void;
  dropZoneRef: React.RefObject<HTMLElement> | null;
  isDropZone: boolean;

  onContextMenu?(event: React.MouseEvent, ref: React.RefObject<HTMLElement>): void;

  onDragStart?(event: React.DragEvent, dragItem: TargetData): void;
  onDragEnter?(event: React.DragEvent, dropZoneItem: TargetData & { isDropZone: boolean }): void;
  onDragOver?(event: React.DragEvent): void;
  onDragDrop?(event: React.DragEvent): void;
  onDragLeave?(event: React.DragEvent, id: string): void;
  onDragEnd?(event: React.DragEvent): void;
};

type TreeHandlersApi = {
  targetData: TargetData;
  handleSelect: (event: React.MouseEvent | React.KeyboardEvent) => void;
  handleHide: (event: React.MouseEvent | React.KeyboardEvent) => void;
  handleContextMenuOpen: (event: React.MouseEvent) => void;
  handleDragStart?: (event: React.DragEvent) => void;
  handleDragEnter?: (event: React.DragEvent) => void;
  handleDragOver?: (event: React.DragEvent) => void;
  handleDragLeave?: (event: React.DragEvent) => void;
  handleDrop?: (event: React.DragEvent) => void;
};

export const useTreeHandlers = (props: UseTreeHandlersProps): TreeHandlersApi => {
  const {
    id,
    ref,
    onHideItem,
    onSelectItem,
    onContextMenu,
    onDragStart,
    onDragEnter,
    onDragOver,
    onDragDrop,
    onDragLeave,
    isDraggable,
    dropZoneRef,
    isDropZone,
  } = props;
  const [targetData, setTargetData] = useState<TargetData>({ id, ref, isDraggable });

  useEffect(() => {
    setTargetData({
      id,
      ref,
      isDraggable,
    });
  }, [id, ref, isDraggable]);

  const handleHide = (event: React.MouseEvent | React.KeyboardEvent): void => {
    event.stopPropagation();

    if (onHideItem) {
      onHideItem(ref);
    }
  };

  const handleSelect = (event: React.MouseEvent | React.KeyboardEvent): void => {
    event.stopPropagation();

    if (onSelectItem) {
      onSelectItem(targetData);
    }
  };

  const handleContextMenuOpen = (event: React.MouseEvent): void => {
    if (onContextMenu) {
      handleSelect(event);

      onContextMenu(event, ref);
    }
  };

  const handleDragStart = (event: React.DragEvent): void => {
    if (!isDraggable) {
      event.preventDefault();
      event.stopPropagation();

      return;
    }

    if (onDragStart) {
      onDragStart(event, targetData);
    }
  };

  const handleDragEnter = (event: React.DragEvent): void => {
    if (onDragEnter) {
      onDragEnter(event, { id, ref: dropZoneRef, isDraggable, isDropZone });
    }
  };

  const handleDragOver = (event: React.DragEvent): void => {
    if (onDragOver) {
      onDragOver(event);
    }
  };

  const handleDragLeave = (event: React.DragEvent): void => {
    if (onDragLeave) {
      onDragLeave(event, id);
    }
  };

  const handleDrop = (event: React.DragEvent): void => {
    if (onDragDrop) {
      onDragDrop(event);
    }
  };

  return {
    targetData,
    handleSelect,
    handleHide,
    handleContextMenuOpen,
    handleDragStart,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};
