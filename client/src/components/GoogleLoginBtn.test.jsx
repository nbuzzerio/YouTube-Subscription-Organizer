import React from 'react';
import GoogleLoginBtn from './GoogleLoginBtn.jsx';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils'
const CONFIG = require('../../../config/youtube.config.js');

jest.mock("./_getGoogleSignIn", () => {
  return {
    __esModule: true,
    default: async () => 'GOOGLE_LOGIN_LINK'
  };
});

describe('googleLoginBtn', () => {

    let googleLoginWrapper;
    beforeAll(() => {
      googleLoginWrapper = shallow(<GoogleLoginBtn />);
    })
    
    it('renders googleLoginBtn', () => {
        expect(googleLoginWrapper).toHaveLength(1);
    });

    it('renders a message with the link', () => {
      expect(googleLoginWrapper.find('a').text()).toContain('Login With Google');
    });

    it('renders a login link', async () => {
      let mountedGoogleLoginWrapper;
      
      await act(async () => {
        mountedGoogleLoginWrapper = mount(<GoogleLoginBtn />);
      })
      mountedGoogleLoginWrapper.update();

      let googleAuth = 'GOOGLE_LOGIN_LINK'
      const link = <a href={googleAuth}>{'Login With Google'}</a>

      expect(mountedGoogleLoginWrapper.containsMatchingElement(link)).toEqual(true);

    })
});