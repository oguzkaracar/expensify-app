import moment from 'moment';
import {setTextFilter,sortByAmount,sortByDate,setStartDate,setEndDate} from '../../actions/filters'

test('Should filter with default text', () =>{
    const action = setTextFilter();
    expect(action).toEqual({
        type:'SET_TEXT_FIELD',
        text:''
    })
})

test('Should filter with provided text', () =>{
    const action = setTextFilter('oguzhan');
    expect(action).toEqual({
        type:'SET_TEXT_FIELD',
        text:'oguzhan'
    })
})

test('Should generate set start date action', ()=>{
    const action = setStartDate(moment(0))
    expect(action).toEqual({
        type:"SET_START_DATE",
        startDate:moment(0)
    })
})

test('Should generate set end date action', ()=>{
    const action = setEndDate(moment(0))
    expect(action).toEqual({
        type:"SET_END_DATE",
        endDate:moment(0)
    })
})

test('Should filter by date',() =>{
    const action= sortByDate();
    expect(action).toEqual({
        type: "SORT_BY_DATE",
    })
})

test('Should filter by amount',() =>{
    const action= sortByAmount();
    expect(action).toEqual({
        type: "SORT_BY_AMOUNT",
    })
})

