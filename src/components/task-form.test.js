import React from 'react';
import {shallow} from 'enzyme';

import TaskForm from './task-form';

describe('<TaskForm />', () => {

  it('Renders without crashing', () => {
      shallow(<TaskForm />);
  });

});
