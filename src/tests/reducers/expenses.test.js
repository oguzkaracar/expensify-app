import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses';

// INIT 

test('should set default state', () =>{
    const state= expensesReducer(undefined,{type:'@@INIT'});
    expect(state).toEqual([]);
})


// remove expense ...
test('should remove expense by id', () =>{
    const action={
        type:'REMOVE_EXPENSE',
        id:expenses[1].id,
    }
    const state = expensesReducer(expenses,action);

    expect(state).toEqual([expenses[0],expenses[2]]);
})


// ADD_EXPENSE
test('should add expense value to state', () =>{
    const expense = {
        id: '4',
        description:'deneme-sonradan eklendi.',
        note:'',
        amount:222,
        createdAt:251525
    }
    const action ={
        type: "ADD_EXPENSE",
        expense
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses,expense]);
})


// edit expense test case 
test('should edit expense on state', () =>{
    const amount = 22000;

    const action ={
        type: "EDIT_EXPENSE",
        id:expenses[1].id,
        updates:{
            amount
        }
    }

    const state = expensesReducer(expenses,action);
    expect(state[1].amount).toBe(amount)
})

// silme ve edit caselerinde id doğru olmaması durumundaki test caseleri şimdilik gözardı ettik....