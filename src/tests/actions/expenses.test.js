import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { addExpense, editExpense, removeExpense, startAddExpense } from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

test("should setup add a expense object with provided value", () => {
	const action = addExpense(expenses[1]);
	expect(action).toEqual({
		type: "ADD_EXPENSE",
		expense: expenses[1],
	});
});

test("should add expense to database and store", (done) => {
	const store = createMockStore({});
	const expenseData = {
		description: "mouse",
		amount: 30000,
		note: "This is mouse price",
		createdAt: 100000,
	};
	store
		.dispatch(startAddExpense(expenseData))
		.then(() => {
			const actions = store.getActions();
			expect(actions[0]).toEqual({
				type: "ADD_EXPENSE",
				expense: {
					id: expect.any(String),
					...expenseData,
				},
			});
			return database.ref(`expenses/${actions[0].expense.id}`).once("value");
		})
		.then((snapshot) => {
			expect(snapshot.val()).toEqual(expenseData);
			done();
		});
});

test("should add expense with defaults database and store", (done) => {
	const store = createMockStore({});
	const expenseDefaults = {
		description: "",
		amount: 0,
		note: "",
		createdAt: 0,
	};
	store
		.dispatch(startAddExpense({}))
		.then(() => {
			const actions = store.getActions();
			expect(actions[0]).toEqual({
				type: "ADD_EXPENSE",
				expense: {
					id: expect.any(String),
					...expenseDefaults,
				},
			});
			return database.ref(`expenses/${actions[0].expense.id}`).once("value");
		})
		.then((snapshot) => {
			expect(snapshot.val()).toEqual(expenseDefaults);
			done();
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
