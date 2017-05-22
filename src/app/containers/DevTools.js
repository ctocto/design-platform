import { createDevTools } from 'redux-devtools';

import DockMonitor from 'redux-devtools-dock-monitor';
import FilterableLogMonitor from 'redux-devtools-filterable-log-monitor';
import ChartMonitor from 'redux-devtools-chart-monitor';

const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey={'ctrl-h'}
    changePositionKey={'ctrl-p'}
    changeMonitorKey={'ctrl-m'}
    defaultIsVisible={false}
  >
    <ChartMonitor />
    <FilterableLogMonitor />
  </DockMonitor>
);

export default DevTools;
