import React from 'react';
import {shallow} from 'enzyme';

import {Board} from './board';

describe('<Board />', () => {
  let columns = [];
  beforeAll(() => {
    for (let i = 0; i < 5; i++) {
      columns.push(`Column ${i}`);
    }
  });
  
  it('Renders without crashing', () => {
    const dispatch = jest.fn(() => Promise.resolve());
    shallow(
      <Board columns={columns} dispatch={dispatch}/>
    );
  });
  
});
