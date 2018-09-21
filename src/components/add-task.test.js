import React from 'react';
import {shallow} from 'enzyme';

import {AddTask} from './add-task';

describe('<AddTask />', () => {
  
  it('Renders without crashing', () => {
    shallow(<AddTask />);
  });
  
});
