import { addExpense, editExpense, removeExpense } from "../../actions/expenses";

test("should setup add a expense object with provided value", () => {
	const expenseData = {
		description: "Rent",
		amount: 85000,
		createdAt: 2000,
		note: "This was last month rent.",
	};
	const action = addExpense(expenseData);
	expect(action).toEqual({
		type: "ADD_EXPENSE",
		expense: {
			...expenseData,
			id: expect.any(String),
		},
	});
});

test("should setup add a expense object with default value", () => {
	const action = addExpense();

	expect(action).toEqual({
		type: "ADD_EXPENSE",
		expense: {
			id:expect.any(String),
			description: "",
			amount: 0,
			createdAt: 0,
			note: "",
		},
	});
});

test("Should setup remove expense action object", () => {
	const action = removeExpense({ id: "123abc" });
	expect(action).toEqual({
		type: "REMOVE_EXPENSE",
		id: "123abc",
	});
});

test("should setup edit expense action object", () => {
	const action = editExpense("123abc", { note: "New value" });
	expect(action).toEqual({
		type: "EDIT_EXPENSE",
		id: "123abc",
		updates: {
			note: "New value",
		},
	});
});