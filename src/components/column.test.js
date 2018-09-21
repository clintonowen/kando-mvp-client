import React from 'react';
import {shallow} from 'enzyme';

import {Column} from './column';

describe('<Column />', () => {
  let tasks = [];
  beforeAll(() => {
    for (let i = 0; i < 5; i++) {
      tasks.push({
        name: `Task ${i}`,
        id: {i}
      });
    }
  });
  
  it('Renders without crashing', () => {
    const connectDropTarget = jest.fn();
    shallow(
      <Column tasks={tasks} connectDropTarget={connectDropTarget}/>
    );
  });
  
});
