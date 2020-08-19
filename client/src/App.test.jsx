import React from 'react';
import App from './containers/App.jsx';
import { shallow } from 'enzyme';


describe('App', () => {

    it('renders App', () => {
        const appWrapper = shallow(<App />);
        debugger
        console.log(appWrapper.find('h4')[0], 'are we seeing this in the test?')
        expect(appWrapper).toHaveLength(1);
    });
});