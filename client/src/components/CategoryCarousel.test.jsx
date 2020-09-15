import React from 'react';
import { shallow } from 'enzyme';
import CategoryCarousel from './CategoryCarousel.jsx';
import Category from './Category.jsx';

describe('CategoryCarousel', () => {

    let CategoryCarouselWrapper;
    let setCategoryData = () => {};
    let setSelectedCategory = () => {};
    let categoryData = [{ Category_Name: 'category A' }, { Category_Name: 'category B' }, { Category_Name: 'category C' }];

    beforeAll(() => {
        CategoryCarouselWrapper = shallow(<CategoryCarousel setSelectedCategory={setSelectedCategory} setCategoryData={setCategoryData} categoryData={categoryData} userId='007' />);
    });

    it('renders CategoryCarouselWrapper', () => {
        expect(CategoryCarouselWrapper).toHaveLength(1);
    });

    it('renders a message', () => {
        expect((CategoryCarouselWrapper).find('h4.selectMsg')).toHaveLength(1);
        expect((CategoryCarouselWrapper).find('h4.selectMsg').text()).toEqual('Select A Category:');

    });

    it('renders one category for each category in categoryData', () => {
        expect(CategoryCarouselWrapper.find(Category)).not.toHaveLength(0);
        expect(CategoryCarouselWrapper.find(Category)).not.toHaveLength(1);
        expect(CategoryCarouselWrapper.find(Category)).toHaveLength(3);
    });

    it('renders one category for each category in categoryData', () => {

        expect(CategoryCarouselWrapper.find({ category: 'category A' })).toHaveLength(1);
        expect(CategoryCarouselWrapper.find({ category: 'category B' })).toHaveLength(1);
        expect(CategoryCarouselWrapper.find({ category: 'category C' })).toHaveLength(1);

    });

    it('passes down setSelectedCategory to each Category', () => {

        expect(typeof (CategoryCarouselWrapper.find({ category: 'category A' }).props()).setSelectedCategory).toEqual('function');
        expect(typeof (CategoryCarouselWrapper.find({ category: 'category B' }).props()).setSelectedCategory).toEqual('function');
        expect(typeof (CategoryCarouselWrapper.find({ category: 'category C' }).props()).setSelectedCategory).toEqual('function');

    });

});

//Need to add delete category functionality later on drag and drop into trash