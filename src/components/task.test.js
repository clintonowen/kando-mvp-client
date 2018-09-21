import React from 'react';
import {shallow} from 'enzyme';

import {Task} from './task';

describe('<Task />', () => {
  
  it('Renders without crashing', () => {
    const connectDropTarget = jest.fn();
    const connectDragSource = jest.fn();
    shallow(
      <Task 
        connectDropTarget={connectDropTarget}
        connectDragSource={connectDragSource}
      />
    );
  });
  
});
