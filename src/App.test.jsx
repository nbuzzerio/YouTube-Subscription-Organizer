import React from 'react';
import App from './containers/App.jsx';
import { shallow } from 'enzyme';


describe('App', () => {

    it('renders App', () => {
        const appWrapper = shallow(<App />);
        
        expect(appWrapper).toHaveLength(1);
    });
});