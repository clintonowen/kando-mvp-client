import React from 'react';
import {shallow} from 'enzyme';

import {Timer} from './timer';

describe('<Timer />', () => {
  
  it('Renders without crashing', () => {
    shallow(<Timer />, {disableLifecycleMethods: true});
  });
  
});
