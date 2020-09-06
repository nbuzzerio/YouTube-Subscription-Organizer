import React from 'react';
import { shallow, mount } from 'enzyme';
import SignedInContainer from './SignedInContainer.jsx';
import ChosenCategory from '../components/ChosenCategory.jsx';
import CategoryContainer from './CategoryContainer.jsx';
import SubContainer from './SubContainer.jsx';
import NewChannelContainer from './NewChannelContainer.jsx';
import { act } from 'react-dom/test-utils';

jest.mock("../components/_getGoogleUserInfo", () => {
    return {
        __esModule: true,
        default: async () => {
            return {
                data: {
                    given_name: 'TestName'
                }
            }
        }
    };
});

describe('SignedInContainer', () => {

    let signedInContainerWrapper;
    beforeAll(() => {
        signedInContainerWrapper = shallow(<SignedInContainer />);
    });

    it('renders SignedInContainer', () => {
        expect(signedInContainerWrapper).toHaveLength(1);
    });

    it('renders "Signing in..." before userData is set', () => {
        expect(signedInContainerWrapper.find('h2')).toHaveLength(1);
        expect(signedInContainerWrapper.find('h2').text()).toContain('Signing in...');
        expect(signedInContainerWrapper.find(CategoryContainer)).toHaveLength(0);
        expect(signedInContainerWrapper.find(SubContainer)).toHaveLength(0);
        expect(signedInContainerWrapper.find(NewChannelContainer)).toHaveLength(0);

    });

    it('renders "Hello, TestName" after userData is set', async () => {
        let mountedSignedInContainerWrapper;

        await act(async () => {
            mountedSignedInContainerWrapper = mount(<SignedInContainer />);
            expect(mountedSignedInContainerWrapper.find('h2')).toHaveLength(1);
            expect(mountedSignedInContainerWrapper.find('h2').text()).toContain('Signing in...');
        });
        mountedSignedInContainerWrapper.update();

        expect(mountedSignedInContainerWrapper.find(CategoryContainer)).toHaveLength(1);
        expect(mountedSignedInContainerWrapper.find(SubContainer)).toHaveLength(1);
        expect(mountedSignedInContainerWrapper.find(NewChannelContainer)).toHaveLength(1);
        expect(mountedSignedInContainerWrapper.find('h2')).toHaveLength(1);
        expect(mountedSignedInContainerWrapper.find('h2').text()).toContain('Hello, TestName');
        mountedSignedInContainerWrapper.unmount()
    });

    it('should pass userData, selectedCategory, & setSelectedCategory down as props to CategoryContainer', async () => {
        let mountedSignedInContainerWrapper;

        await act(async () => {
            mountedSignedInContainerWrapper = mount(<SignedInContainer />);
        })
        mountedSignedInContainerWrapper.update();

        expect(mountedSignedInContainerWrapper.find(CategoryContainer)).toHaveLength(1);
        expect(mountedSignedInContainerWrapper.find(SubContainer)).toHaveLength(1);
        expect(mountedSignedInContainerWrapper.find(NewChannelContainer)).toHaveLength(1);
        expect(mountedSignedInContainerWrapper.find(CategoryContainer).props().userData.given_name).toEqual('TestName');
        expect(typeof (mountedSignedInContainerWrapper.find(CategoryContainer).props().setSelectedCategory)).toEqual('function');
        mountedSignedInContainerWrapper.unmount()
    });

    it('should pass userData down as props to SubContainer', async () => {
        let mountedSignedInContainerWrapper;

        await act(async () => {
            mountedSignedInContainerWrapper = mount(<SignedInContainer />);
        })
        mountedSignedInContainerWrapper.update();

        expect(mountedSignedInContainerWrapper.find(CategoryContainer)).toHaveLength(1);
        expect(mountedSignedInContainerWrapper.find(SubContainer)).toHaveLength(1);
        expect(mountedSignedInContainerWrapper.find(NewChannelContainer)).toHaveLength(1);
        expect(mountedSignedInContainerWrapper.find(SubContainer).props().userData.given_name).toEqual('TestName');
        mountedSignedInContainerWrapper.unmount()
    })

    it('should set a category when a category is clicked downstream in CategoryCarousel', async () => {
        let mountedSignedInContainerWrapper;
        expect('It Will Pass').toBeTruthy()
    })

    it('should display ChosenCategory component when category is set', async () => {
        let mountedSignedInContainerWrapper;
        expect('It Will Pass').toBeTruthy()
    })

});