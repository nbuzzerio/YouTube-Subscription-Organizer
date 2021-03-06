import React from 'react';
import { shallow, mount } from 'enzyme';
import CategoryInput from '../components/CategoryInput.jsx';
import { act } from 'react-dom/test-utils';

jest.mock("./_postNewCategory", (newCategory) => {
    return {
        __esModule: true,
        default: async (newCategory) => {
            return { data: ['category A', 'category B', 'category C', 'category D'] }
        }
    };
});

describe('CategoryInput', () => {


    let CategoryInputWrapper;
    let setCategoryData = () => { }

    beforeAll(() => {
        CategoryInputWrapper = shallow(<CategoryInput setCategoryData={setCategoryData} categoryData={[{ Category_Name: 'category A' }, { Category_Name: 'category B' }, { Category_Name: 'category C' }]} userId='007' />);
    });

    it('renders CategoryInputWrapper', () => {
        expect(CategoryInputWrapper).toHaveLength(1);
    });

    it('renders a form with two inputs type text and submit', () => {
        expect(CategoryInputWrapper.find('form')).toHaveLength(1);
        expect(CategoryInputWrapper.find('label').text()).toEqual('New Category:');
        expect(CategoryInputWrapper.find('input[type="text"]')).toHaveLength(1);
        expect(CategoryInputWrapper.find('input[type="submit"]')).toHaveLength(1);
    });

    it('renders an error in a <p> in the form if the category already exists', async () => {
        let mountedCategoryInputWrapper;
        //another async to handle the form submit
        await act(async () => {
            mountedCategoryInputWrapper = mount(<CategoryInput setCategoryData={setCategoryData} categoryData={[{ Category_Name: 'category A' }, { Category_Name: 'category B' }, { Category_Name: 'category C' }]} userId={'007'} />);
        });

        //set textfield to 'category C'
        const inputText = mountedCategoryInputWrapper.find('input[type="text"]');
        const event = {
            target: {
                value: 'category C'
            }
        }
        inputText.simulate('change', event);

        //submit duplicate category
        const inputSubmit = mountedCategoryInputWrapper.find('input[type="submit"]');
        inputSubmit.simulate('submit');

        expect(mountedCategoryInputWrapper.find('form')).toHaveLength(1);
        expect(mountedCategoryInputWrapper.find('p')).toHaveLength(1);
        expect(mountedCategoryInputWrapper.find('p').text()).toEqual('You already have that category!');
        mountedCategoryInputWrapper.unmount();
    });

});