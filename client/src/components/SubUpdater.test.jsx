import React from 'react';
import { shallow } from 'enzyme';
import SubUpdater from '../components/SubUpdater.jsx';

jest.mock("../components/_getUpdatedUserSubs.js", (user) => {
    return {
        __esModule: true,
        default: async (user) => ['A', 'List', 'Of', 'Subs']
    };
});

describe('SubUpdater', () => {

    let subUpdaterWrapper;
    beforeAll(() => {
        subUpdaterWrapper = shallow(<SubUpdater />);
    });

    it('renders SubUpdater', () => {
        expect(subUpdaterWrapper).toHaveLength(1);
    });

    it('renders a button to Update Subscriptions', () => {
        expect(subUpdaterWrapper.find('div.subUpdaterBtn')).toHaveLength(1);
        expect(subUpdaterWrapper.find('p.subUpdaterBtnTxt')).toHaveLength(1);

        expect(subUpdaterWrapper.find('p.subUpdaterBtnTxt').text()).toContain('Update Subscriptions');
    });

});