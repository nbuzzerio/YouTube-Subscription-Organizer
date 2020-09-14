import React from 'react';
import { shallow, mount } from 'enzyme';
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

    it('renders "SubUpdater Placeholder"', () => {
        expect(subUpdaterWrapper.find('h4')).toHaveLength(1);
        expect(subUpdaterWrapper.find('h4').text()).toContain('SubUpdater PlaceHolder');
    });

    it('renders a button to Update Subscriptions', () => {
        expect(subUpdaterWrapper.find('button')).toHaveLength(1);
        expect(subUpdaterWrapper.find('button').text()).toContain('Update Subscriptions');
    });

});