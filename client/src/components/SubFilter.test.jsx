import React from 'react';
import { shallow } from 'enzyme';
import SubFilter from './SubFilter.jsx';

describe('SubFilter', () => {

    let SubFilterWrapper;
    let setFilter = () => {}

    beforeAll(() => {
        SubFilterWrapper = shallow(<SubFilter setFilter={setFilter}/>);
    });

    it('renders SubFilter', () => {
        expect(SubFilterWrapper).toHaveLength(1);
    });

    it('renders "SubFilter Placeholder"', () => {
        expect(SubFilterWrapper.find('h4')).toHaveLength(1);
        expect(SubFilterWrapper.find('h4').text()).toContain('SubFilter PlaceHolder');
    });

    it('renders Filter Subs label', () => {
        expect(SubFilterWrapper.find('label')).toHaveLength(1);
        expect(SubFilterWrapper.find('label').text()).toContain('Filter Subs:');
    });

    it('renders textField', () => {
        expect(SubFilterWrapper.find('input[type="text"]'));
    });

});