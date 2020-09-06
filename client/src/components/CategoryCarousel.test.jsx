import React from 'react';
import { shallow, mount } from 'enzyme';
import CategoryCarousel from '../components/CategoryCarousel.jsx';
import { act } from 'react-dom/test-utils';

describe('CategoryCarousel', () => {

    let CategoryCarouselWrapper;
    let setCategoryData = () => {}
    
    beforeAll(() => {
        CategoryCarouselWrapper = shallow(<CategoryCarousel setCategoryData={setCategoryData} categoryData={['category A', 'category B', 'category C']} userId='007'/>);
    });

    it('renders CategoryCarouselWrapper', () => {
        expect(CategoryCarouselWrapper).toHaveLength(1);
    });

});