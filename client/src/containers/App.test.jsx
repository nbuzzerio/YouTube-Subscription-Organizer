import React from 'react';
import App from './App.jsx';
import { shallow, mount } from 'enzyme';
import GoogleLoginBtn from '../components/GoogleLoginBtn';
import SignedInContainer from './SignedInContainer.jsx';
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

describe('App', () => {

    let appWrapper;
    beforeAll(() => {
        appWrapper = shallow(<App />);
    })
    
    it('renders App', () => {
        expect(appWrapper).toHaveLength(1);
    });

    it('renders a welcome message', () => {
        const welcome = <h1>WELCOME TO YOUTUBE SUBSCRIPTION ORGANIZER</h1>
        expect(appWrapper.containsMatchingElement(welcome)).toEqual(true);
    })

    it('renders a Google login link if not loggedIn', () => {
        expect(appWrapper.find(GoogleLoginBtn)).toHaveLength(1);
        expect(appWrapper.find('button')).toHaveLength(0);
    })

    it('renders a Sign Out button if loggedIn',  () => {
        const mountedAppWrapper = mount(<App cookie={'accessToken'}/>);

        expect(mountedAppWrapper.props().cookie).toEqual('accessToken');
        expect(mountedAppWrapper.find(GoogleLoginBtn)).toHaveLength(0);
        expect(mountedAppWrapper.find('button')).toHaveLength(1);
    })

    it('Passes a username prop if loggedIn',  async () => {
        let mountedAppWrapper;

        await act(async () => {
            mountedAppWrapper = mount(<App cookie={'accessToken'}/>);
        })
        mountedAppWrapper.update();

        expect(mountedAppWrapper.props().cookie).toEqual('accessToken');
        expect(mountedAppWrapper.find(SignedInContainer)).toHaveLength(1);
        expect(mountedAppWrapper.find('button')).toHaveLength(1);
        expect(mountedAppWrapper.find(SignedInContainer).props().userData.given_name).toEqual('TestName');
    })
});