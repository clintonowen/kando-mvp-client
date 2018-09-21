import React from 'react';
import {shallow} from 'enzyme';

import {LandingPage} from './landing-page';

describe('<LandingPage />', () => {

    it('Renders without crashing', () => {
        shallow(<LandingPage />);
    });

});
