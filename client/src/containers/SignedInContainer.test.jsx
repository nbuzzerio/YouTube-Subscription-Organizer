import React from 'react';
import { shallow, mount } from 'enzyme';
import SignedInContainer from './CategoryContainer.jsx';
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
    })
    
    it('renders SignedInContainer', () => {
        expect(signedInContainerWrapper).toHaveLength(1);
    });

    // it('renders a welcome message', async () => {
    //     const given_name = 'TestName';
    //     let mountedSignedInContainerWrapper;
        
    //     await act(async () => {
    //         mountedSignedInContainerWrapper = mount(<SignedInContainer userData={given_name}/>);
    //     })
    //     mountedSignedInContainerWrapper.update();
    //     expect(mountedSignedInContainerWrapper.props().userData).toEqual('TestName');
    //     const welcome = <h2>HELLO, TestName</h2>
    //     // console.log(mountedSignedInContainerWrapper.find('div.user').text())
    //     expect(mountedSignedInContainerWrapper.containsMatchingElement(welcome)).toEqual(true);
    // })

    // it('renders a Google login link if not loggedIn', () => {
    //     expect(signedInContainerWrapper.find(GoogleLoginBtn)).toHaveLength(1);
    //     expect(signedInContainerWrapper.find('button')).toHaveLength(0);
    // })

    // it('renders a Sign Out button if loggedIn',  () => {
    //     const mountedSignedInContainerWrapper = mount(<App cookie={'accessToken'}/>);

    //     expect(mountedSignedInContainerWrapper.props().cookie).toEqual('accessToken');
    //     expect(mountedSignedInContainerWrapper.find(GoogleLoginBtn)).toHaveLength(0);
    //     expect(mountedSignedInContainerWrapper.find('button')).toHaveLength(1);
    // })

    // it('Passes a username prop if loggedIn',  async () => {
    //     let mountedSignedInContainerWrapper;

    //     await act(async () => {
    //         mountedSignedInContainerWrapper = mount(<App cookie={'accessToken'}/>);
    //     })
    //     mountedSignedInContainerWrapper.update();

    //     expect(mountedSignedInContainerWrapper.props().cookie).toEqual('accessToken');
    //     expect(mountedSignedInContainerWrapper.find(SignedInContainer)).toHaveLength(1);
    //     expect(mountedSignedInContainerWrapper.find('button')).toHaveLength(1);
    //     expect(mountedSignedInContainerWrapper.find(SignedInContainer).props().userData.given_name).toEqual('TestName');
    // })
});










// import { act } from 'react-dom/test-utils';

// jest.mock("../components/_getGoogleUserInfo", () => {
//     return {
//       __esModule: true,
//       default: async () => {
//           return {
//               data: {
//                   given_name: 'TestName'
//               }
//           }
//       }
//     };
//   });