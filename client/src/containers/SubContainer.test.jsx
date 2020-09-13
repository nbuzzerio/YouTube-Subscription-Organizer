import React from 'react';
import { shallow, mount } from 'enzyme';
import SubContainer from './SubContainer.jsx';
import SubUpdater from '../components/SubUpdater.jsx';
import SubCarousel from '../components/SubCarousel.jsx';
import { act } from 'react-dom/test-utils';

describe('SubContainer', () => {

    let subContainerWrapper;
    beforeAll(() => {
        subContainerWrapper = shallow(<SubContainer />);
    });

    it('renders SubContainer', () => {
        expect(subContainerWrapper).toHaveLength(1);
    });

    it('renders "SubContainer Placeholder"', () => {
        expect(subContainerWrapper.find('h3')).toHaveLength(1);
        expect(subContainerWrapper.find('h3').text()).toContain('SubContainer PlaceHolder');
        expect(subContainerWrapper.find(SubUpdater)).toHaveLength(1);
        expect(subContainerWrapper.find(SubCarousel)).toHaveLength(1);
    });

    it('should pass subs to SubCarousel', async () => {
        let mountedSubContainerWrapper;
        let subs = 'sub';

        await act(async () => {
            mountedSubContainerWrapper = mount(<SubContainer />);
        })
        mountedSubContainerWrapper.update();

        expect(mountedSubContainerWrapper.find(SubCarousel)).toHaveLength(1);
        expect(mountedSubContainerWrapper.find(SubCarousel).props().subs).toEqual(null);
        mountedSubContainerWrapper.unmount();
    });

    it('should pass setSubs to SubUpdater', async () => {
        let mountedSubContainerWrapper;

        await act(async () => {
            mountedSubContainerWrapper = mount(<SubContainer />);
        })
        mountedSubContainerWrapper.update();

        expect(mountedSubContainerWrapper.find(SubUpdater)).toHaveLength(1);
        expect(typeof ((mountedSubContainerWrapper.find(SubUpdater).props()).setSubs)).toEqual('function');
        mountedSubContainerWrapper.unmount();
    });

});