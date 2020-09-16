import React from 'react';
import { shallow, mount } from 'enzyme';
import Category from './Category.jsx';
import { act } from 'react-dom/test-utils';

jest.mock("./_postChannelToCategory", (addedChannel, categoryId) => {
    return {
        __esModule: true,
        default: async (addedChannel, categoryId) => {
            return
        }
    };
});

describe('Category', () => {

    let CategoryWrapper;
    const mockSetSelectedCategory = jest.fn(() => {});

    beforeAll(() => {
        CategoryWrapper = shallow(<Category category={'testCategory'} categoryId = {0} setSelectedCategory={mockSetSelectedCategory} key={0} />);
    });

    it('renders CategoryWrapper', () => {
        expect(CategoryWrapper).toHaveLength(1);
    });

    it('renders the category name', () => {
        expect(CategoryWrapper.text()).toEqual('testCategory');
    });

    it('has categoryId prop', async () => {

        let mountedCategoryWrapper;

        await act(async () => {
            mountedCategoryWrapper = mount(<Category category={'testCategory'} categoryId = {0} setSelectedCategory={mockSetSelectedCategory} key={0} />);
        });
        mountedCategoryWrapper.update();

        expect(mountedCategoryWrapper.props().categoryId).toEqual(0);
    });

    it('has setSelectedCategory function in props', async () => {

        let mountedCategoryWrapper;

        await act(async () => {
            mountedCategoryWrapper = mount(<Category category={'testCategory'} categoryId = {0} setSelectedCategory={mockSetSelectedCategory} key={0} />);
        });
        mountedCategoryWrapper.update();

        expect(typeof ((mountedCategoryWrapper.props()).setSelectedCategory)).toEqual('function'); 
    });

    it('calls setSelectedCategory function when clicked', async () => {

        let mountedCategoryWrapper;

        await act(async () => {
            mountedCategoryWrapper = mount(<Category category={'testCategory'} categoryId = {0} setSelectedCategory={mockSetSelectedCategory} key={0} />);
        });
        mountedCategoryWrapper.update();

        let clickableCategory =  mountedCategoryWrapper.find('div.category')
        expect(clickableCategory).toHaveLength(1);
        clickableCategory.simulate('click');

        expect(mockSetSelectedCategory.mock.calls.length).toBe(1);
    });

});