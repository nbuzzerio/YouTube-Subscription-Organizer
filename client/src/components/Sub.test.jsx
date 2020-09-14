import React from 'react';
import { shallow } from 'enzyme';
import Sub from './Sub.jsx';

describe('Sub', () => {

    let SubWrapper;

    beforeAll(() => {
        SubWrapper = shallow(<Sub sub={{Channel_Name: 'TestName', default_img_URL: 'fakeImg'}}/>);
    });

    it('renders Sub', () => {
        expect(SubWrapper).toHaveLength(1);
    });

    it('renders "Sub Placeholder"', () => {
        expect(SubWrapper.find('h5')).toHaveLength(1);
        expect(SubWrapper.find('h5').text()).toContain('TestName');
    });

    it('renders Subs img', () => {
        expect(SubWrapper.find('img')).toHaveLength(1);
    });

});