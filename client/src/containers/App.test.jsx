import React from 'react';
import App from './App.jsx';
import { shallow } from 'enzyme';

import GoogleLoginBtn from '../components/GoogleLoginBtn';


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

    xit('renders a Google login link', () => {
        const loginLink = <a href={googleAuth}>Login With Google</a>
        expect(appWrapper.containsMatchingElement(loginLink)).toEqual(true);
    })
});