import React from "react";
// import ReactShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from "enzyme";
import Header from "../../components/Header";

// react-test-renderer -- ile react componentlarını test edebiliyoruz. React tarafından geliştirilmiştir...

test("should render Header component", () => {
	const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
    
	// expect(wrapper.find('h1').text()).toBe('Expensify');
	// const renderer = new ReactShallowRenderer();
	// renderer.render(<Header/>);
	// // console.log(renderer.getRenderOutput())
	// expect(renderer.getRenderOutput()).toMatchSnapshot();
	// // Component testlerinde snapshot assertionları kullanılır..
});
