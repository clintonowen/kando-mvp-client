import React from 'react';
import {shallow} from 'enzyme';

import {DropdownMenu} from './dropdown-menu';

describe('<DropdownMenu />', () => {
  
  it('Renders without crashing', () => {
    shallow(<DropdownMenu />);
  });
  
});
