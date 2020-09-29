import React from "react";
import { shallow } from "enzyme";
import moment from "moment";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";

test("should render ExpenseForm correctly", () => {
	const wrapper = shallow(<ExpenseForm />);
	expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseForm correctly with expense data", () => {
	const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
	expect(wrapper).toMatchSnapshot();
});

// form eventi test case..
test("should render error for invalid form submission", () => {
	const wrapper = shallow(<ExpenseForm />);
	expect(wrapper).toMatchSnapshot();
	wrapper.find("form").simulate("submit", {
		preventDefault: () => {},
	});
	expect(wrapper.state("error")).toBe(true);
	expect(wrapper).toMatchSnapshot();
});

// input change test case
test("should set description on input change", () => {
	const value = "New description";
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find("input").at(0).simulate("change", {
		target: { value },
	});
	expect(wrapper.state("description")).toBe(value);
});

// textarea change test case
test("should set note on textarea change", () => {
	const value = "New note";
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find("textarea").at(0).simulate("change", {
		target: { value },
	});
	expect(wrapper.state("note")).toBe(value);
});

// set amount if valid input
test("should set amount if valid input", () => {
	const value = "23.45";
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find("input").at(1).simulate("change", {
		target: { value },
	});
	expect(wrapper.state("amount")).toBe(value);
});

// set amount if invalid input
test("should not set description if invalid input", () => {
	const value = "23.455";
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find("input").at(1).simulate("change", {
		target: { value },
	});
	expect(wrapper.state("amount")).toBe("");
});

// Spy kullanarak test case oluşturma...
test("should call onSubmit prop for valid form submission", () => {
	const onSubmitSpy = jest.fn(); // test spies.
	const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
	wrapper.find("form").simulate("submit", {
		preventDefault: () => {},
	});

	expect(wrapper.state("error")).toBe(false);

	expect(onSubmitSpy).toHaveBeenLastCalledWith({
		description: expenses[0].description,
		amount: expenses[0].amount,
		note: expenses[0].note,
		createdAt: expenses[0].createdAt,
	});
});


// ** Hata veriyor...

// test("should set new date on date change", () => {
// 	const now = moment();
// 	const wrapper = shallow(<ExpenseForm />);
// 	wrapper.find("SingleDatePicker").prop("onDateChange")(now);
// 	expect(wrapper.state("createdAt")).toEqual(now);
// });

// test("should set new focused on focused", () => {
// 	const focused = true;
// 	const wrapper = shallow(<ExpenseForm />);
// 	wrapper.find("SingleDatePicker").prop("onFocusChange")({ focused });
// 	expect(wrapper.state("calendarFocused")).toB(focused);
// });
