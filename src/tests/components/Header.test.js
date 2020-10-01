import React from "react";
// import ReactShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from "enzyme";
import {Header} from "../../components/Header";

// react-test-renderer -- ile react componentlarını test edebiliyoruz. React tarafından geliştirilmiştir...

test("should render Header component", () => {
	const wrapper = shallow(<Header startLogout={()=>{}}/>);
    expect(wrapper).toMatchSnapshot();
    
	// expect(wrapper.find('h1').text()).toBe('Expensify');
	// const renderer = new ReactShallowRenderer();
	// renderer.render(<Header/>);
	// // console.log(renderer.getRenderOutput())
	// expect(renderer.getRenderOutput()).toMatchSnapshot();
	// // Component testlerinde snapshot assertionları kullanılır..
});

test('should call startLogout on button click',()=>{
	const startLogout = jest.fn();
	const wrapper = shallow(<Header startLogout={startLogout}/>);
	wrapper.find('button').simulate('click');
	expect(startLogout).toHaveBeenCalled();
})