import React from 'react';
import { shallow, mount } from 'enzyme';
import SubCarousel from './SubCarousel.jsx';
import SubFilter from './SubFilter.jsx';
import Sub from './Sub.jsx';
import { act } from 'react-dom/test-utils';

describe('SubCarousel', () => {

    let subCarouselWrapper;
    beforeAll(() => {
        subCarouselWrapper = shallow(<SubCarousel subs={[{Channel_Name: "A", Channel_Description: "A"}, {Channel_Name: "List", Channel_Description: "List"}, {Channel_Name: "Of", Channel_Description: "Of"}, {Channel_Name: "Subs", Channel_Description: "Subs"}]}/>);
    });

    it('renders SubCarousel', () => {
        expect(subCarouselWrapper).toHaveLength(1);
    });

    it('renders "SubCarousel Placeholder"', () => {
        expect(subCarouselWrapper.find('h4')).toHaveLength(1);
        expect(subCarouselWrapper.find('h4').text()).toContain('SubCarousel PlaceHolder');
    });

    it('renders all the subs passed in when filter is an empty string', () => {
        expect(subCarouselWrapper.find(Sub).length).toEqual(4)
    });

    it('passes setFilter down to SubFilter', async () => {
        let mountedSubCarouselWrapper;

        await act( async () => {
            mountedSubCarouselWrapper = mount(<SubCarousel subs={[{Channel_Name: "A", Channel_Description: "A"}, {Channel_Name: "List", Channel_Description: "List"}, {Channel_Name: "Of", Channel_Description: "Of"}, {Channel_Name: "Subs", Channel_Description: "Subs"}]}/>);
        });

        expect(typeof ((mountedSubCarouselWrapper.find(SubFilter).props()).setFilter)).toEqual('function');
    });

    it('renders only subs that match the filter', async () => {
        let mountedSubCarouselWrapper;

        await act( async () => {
            mountedSubCarouselWrapper = mount(<SubCarousel subs={[{Channel_Name: "Test", Channel_Description: "A"}, {Channel_Name: "List", Channel_Description: "List"}, {Channel_Name: "Of", Channel_Description: "Test"}, {Channel_Name: "Test", Channel_Description: "Subs"}]}/>);
        });

        const inputText = mountedSubCarouselWrapper.find('input[type="text"]');
        const event = {
            target: {
                value: 'Test'
            }
        }
        inputText.simulate('change', event);
        expect(mountedSubCarouselWrapper.find(Sub).length).toEqual(3)
    });

    it('renders only subs that match the filter and is not case-sensitive', async () => {
        let mountedSubCarouselWrapper;

        await act( async () => {
            mountedSubCarouselWrapper = mount(<SubCarousel subs={[{Channel_Name: "TeSting", Channel_Description: "A"}, {Channel_Name: "List", Channel_Description: "List"}, {Channel_Name: "Of", Channel_Description: "TeSting"}, {Channel_Name: "TeSting", Channel_Description: "Subs"}]}/>);
        });

        const inputText = mountedSubCarouselWrapper.find('input[type="text"]');
        const event = {
            target: {
                value: 'tEsT'
            }
        }
        inputText.simulate('change', event);
        expect(mountedSubCarouselWrapper.find(Sub).length).toEqual(3)
    });

});