import React from 'react';

import { cnLayout } from './cn-layout';
import { Grid, GridState, GridUpdate } from './grid';
import { GridContext } from './hooks';
import { LayoutView } from './LayoutView';

import './Layout.css';

interface LayoutProps {
  state?: GridState;
  onChange?: (change: { update: GridUpdate; state: GridState }) => void;
}

export const Layout: React.FC<LayoutProps> = ({ state, onChange }) => {
  const grid = React.useMemo(() => Grid.create(state), [state]);
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;

  React.useEffect(
    () =>
      grid.addListener(update => {
        if (typeof onChangeRef.current === 'function') {
          onChangeRef.current({ update, state: grid.extract() });
        }
      }),
    [grid, onChangeRef],
  );

  return (
    <GridContext.Provider value={grid}>
      <div className={cnLayout()}>
        <LayoutView />
      </div>
    </GridContext.Provider>
  );
};
