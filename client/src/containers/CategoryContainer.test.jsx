import React from 'react';
import { shallow, mount } from 'enzyme';
import CategoryContainer from './CategoryContainer.jsx';
import CategoryInput from '../components/CategoryInput.jsx';
import CategoryCarousel from '../components/CategoryCarousel.jsx';
import { act } from 'react-dom/test-utils';

jest.mock("../components/_getUserCategories", () => {
    return {
        __esModule: true,
        default: async () => {
            return ['category A', 'category B', 'category C'];
        }
    };
});

jest.mock("../components/_postNewCategory", (newCategory) => {
    return {
        __esModule: true,
        default: async (newCategory) => {
            return {data: ['category A', 'category B', 'category C', 'category D']}
        }
    };
});

describe('CategoryContainer', () => {

    let CategoryContainerWrapper;
    let setSelectedCategory = () => {}

    beforeAll(() => {
        CategoryContainerWrapper = shallow(<CategoryContainer setSelectedCategory={setSelectedCategory} userData={{id: '007'}}/>);
    });

    it('renders CategoryContainer', () => {
        expect(CategoryContainerWrapper).toHaveLength(1);
    });

    it('renders "Loading Categories..." before categoryData is set', () => {
        expect(CategoryContainerWrapper.find('h3')).toHaveLength(1);
        expect(CategoryContainerWrapper.find('h3').text()).toContain('Loading Categories...');
        expect(CategoryContainerWrapper.find(CategoryInput)).toHaveLength(0);
        expect(CategoryContainerWrapper.find(CategoryCarousel)).toHaveLength(0);
    });

    it('renders "Select a Category", CategoryInput, & CategoryCarousel after categoryData is set', async () => {
        let mountedCategoryContainerWrapper;

        await act(async () => {
            mountedCategoryContainerWrapper = mount(<CategoryContainer setSelectedCategory={setSelectedCategory} userData={{id: '007'}}/>);
            expect(mountedCategoryContainerWrapper.find('h3')).toHaveLength(1);
            expect(mountedCategoryContainerWrapper.find('h3').text()).toContain('Loading Categories...');
        });
        mountedCategoryContainerWrapper.update();

        expect(mountedCategoryContainerWrapper.find(CategoryInput)).toHaveLength(1);
        expect(mountedCategoryContainerWrapper.find(CategoryCarousel)).toHaveLength(1);
        expect(mountedCategoryContainerWrapper.find('h3')).toHaveLength(1);
        expect(mountedCategoryContainerWrapper.find('h3').text()).toContain('Select a Category');
        mountedCategoryContainerWrapper.unmount();
    });

    it('passes setSelectedCategory down as props to CategoryCarousel', async () => {
        let mountedCategoryContainerWrapper;

        await act(async () => {
            mountedCategoryContainerWrapper = mount(<CategoryContainer setSelectedCategory={setSelectedCategory} userData={{id: '007'}}/>);
        });
        mountedCategoryContainerWrapper.update();

        expect(typeof (mountedCategoryContainerWrapper.find(CategoryCarousel).props().setSelectedCategory)).toEqual('function');
        mountedCategoryContainerWrapper.unmount();
    });

    it('passes setCategoryData down as props to CategoryCarousel & CategoryInput', async () => {
        let mountedCategoryContainerWrapper;

        await act(async () => {
            mountedCategoryContainerWrapper = mount(<CategoryContainer setSelectedCategory={setSelectedCategory} userData={{id: '007'}}/>);
            expect(mountedCategoryContainerWrapper.find(CategoryInput)).toHaveLength(0);
            expect(mountedCategoryContainerWrapper.find(CategoryCarousel)).toHaveLength(0);
        });
        mountedCategoryContainerWrapper.update();

        expect(typeof mountedCategoryContainerWrapper.find(CategoryCarousel).props().setCategoryData).toEqual('function');
        expect(typeof (mountedCategoryContainerWrapper.find(CategoryInput).props().setCategoryData)).toEqual('function');
        mountedCategoryContainerWrapper.unmount();
    });

    it('passes categoryData down as props to CategoryCarousel & CategoryInput', async () => {
        let mountedCategoryContainerWrapper;

        await act(async () => {
            mountedCategoryContainerWrapper = mount(<CategoryContainer setSelectedCategory={setSelectedCategory} userData={{id: '007'}}/>);
        });
        mountedCategoryContainerWrapper.update();

        expect(mountedCategoryContainerWrapper.find(CategoryCarousel).props().categoryData).toEqual(expect.arrayContaining(['category A', 'category B', 'category C']));
        expect(mountedCategoryContainerWrapper.find(CategoryInput).props().categoryData).toEqual(expect.arrayContaining(['category A', 'category B', 'category C']));
        mountedCategoryContainerWrapper.unmount();
    });

    it('passes userId down as props to CategoryCarousel & CategoryInput', async () => {
        let mountedCategoryContainerWrapper;

        await act(async () => {
            mountedCategoryContainerWrapper = mount(<CategoryContainer setSelectedCategory={setSelectedCategory} userData={{id: '007'}}/>);
        });
        mountedCategoryContainerWrapper.update();

        expect(mountedCategoryContainerWrapper.find(CategoryCarousel).props().userId).toEqual('007');
        expect(mountedCategoryContainerWrapper.find(CategoryInput).props().userId).toEqual('007');
        mountedCategoryContainerWrapper.unmount();
    });
});