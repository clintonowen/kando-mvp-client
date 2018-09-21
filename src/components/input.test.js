import React from 'react';
import {shallow} from 'enzyme';

import Input from './input';

describe('<Input />', () => {
  const input={
    name: "username",
    value: ""
  }
  const meta = {
    invalid: "true",
    pristine: "true"
  }
  
  it('Renders without crashing', () => {
    shallow(<Input
      id="username"
      input={input}
      label="Username"
      meta={meta}
      type="text" />);
  });
    
});
  