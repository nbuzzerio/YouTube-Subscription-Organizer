import React from 'react';
import GoogleLoginBtn from './GoogleLoginBtn.jsx';
import { shallow } from 'enzyme';

describe('googleLoginBtn', () => {

    let googleLoginWrapper;
    beforeAll(() => {
      googleLoginWrapper = shallow(<GoogleLoginBtn accessToken={'accessToken=TOKEN_HASH'}/>);
    })
    
    xit('renders googleLoginBtn', () => {
        expect(googleLoginWrapper).toHaveLength(1);
    });

    xit('renders a message with the link', () => {
      expect(googleLoginWrapper.find('a').text()).toContain('Login With Google');
    });

    it('renders a Google login link if accessToken is null', () => {

        googleLoginWrapper = shallow(<GoogleLoginBtn accessToken={null} />);
        console.log(googleLoginWrapper.props())
        expect(googleLoginWrapper.props()['accessToken']).toEqual(null);

        const loginLink = <a href={googleAuth}>Login With Google</a>
        expect(googleLoginWrapper.containsMatchingElement(loginLink)).toEqual(true);
    })
});