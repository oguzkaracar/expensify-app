/*
store: Redux kütüphanesiyle birlikte yaratacağımız verilerin tutulacağı alan diyebiliriz. Uygulamamızda tek bir adet “store”umuz olacak ve state’lerimizi bu store’un içinde depolayacağız.

reducer: Action’dan gelen verileri süzgeçleyip store’da belirtilen veriyi güncellememizi sağlayan bir araç.

action: Reducer’lara ulaşarak onları tetikleyen, store’daki güncellemesi gereken veriyi yollan bir araç. Neyi güncellemesi gerektiğini adlandırırken “type” ile belirtmemiz gerekirken, değiştirmesi gereken veriyi payload’larla taşır.

*/

import { createStore } from "redux";
// redux yüklendikten sonra  ilk önce global stateleri tanımlamak için createStore methodunu alıyoruz. Bu metodla stateleri depolayacak alanı yaratırız. Sadece bir kere ayarlanır...


// Reducers
// 1. Reducerlar pure fonksiyonlardır.
// 2. Direkt olarak state ya da action çevirme! - obje olarak döndür....

// state döndüren pure fonksiyon.. - reducer. --
// reducer fonksiyonlar parametre olarak bir fonksiyon bekler. burada state belirtilir. ikinci parametre de ise action objesini belirtmemiz gerekir.
const countReducer = (state = { count: 0 }, action) => {
	switch (action.type) {
		// Birden fazla action type olduğu durumlarda switch yapısını kullanmak daha kullanışlı olabilir.
		case "INCREMENT":
			return {
				count: state.count + action.incrementBy,
			};
		case "DECREMENT":
			return {
				count: state.count - action.decrementBy,
			};
		case "SET":
			return {
				count: typeof action.count === 'number' ? action.count : state.count
			};
		case "RESET":
			return {
				count: 0,
			};
		default:
			return state;
	}
	//return state; // state tanımladık ve return ettik.
};

// createStore metodu bir reducer fonksiyon bekler ve onu çalıştırır ve dönen sonucu depolar. Stateler burada tutulur...
const store = createStore(countReducer);

// store.subscribe metodu ile devamlı olarak store daki değişiklikleri dinleriz..
const unsubscribe = store.subscribe(() => {
	// .getState() - current state valuesunu döndürür...
	console.log(store.getState());
});

// redux actionlar birer objedir. bu obje de genellikle iki tane property belirtiriz. type ve payload, type property'si action nedir, ne yapacak onu belirtir ve reducer da ona göre koşullu event çalıştırılır. payload ise değişecek ya da eklenecek verileri tuttuğumuz kısımdır..

// *** ---- actionları normal obje expressionları olarak tanımlamak yerine action generator dediğimiz fonksiyonlara çevirmek, daha sağlıklıdır. destructuring kullanarak daha da basit ve okunabilir bir hale getirebiliriz.
const incrementCount = ({incrementBy = 1} = {} ) => ({ 
	type: "INCREMENT",
	incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) => ({
	type: "DECREMENT",
	decrementBy
});

const resetCount = () => ({
	type: "RESET",
});

const setCount = ({count} = {}) =>({
    type: "SET",
    count
})

// store.dispatch metodu actionı store a gönderir. (destruction denemeleri..)
store.dispatch(incrementCount({incrementBy:10})); // 10

store.dispatch(incrementCount({incrementBy:5})); // 15

store.dispatch(incrementCount({})); // 16

store.dispatch(incrementCount()); // 17

// subscribe metodu, geriye change listener ı unsubscribe eden bir fonksiyon döndürdüğü için listenerı sonlandırmak için o fonksiyonu çalıştırmamız gerekiyor. arka tarafta store değişikliği devam edecek ama biz unsubscribe fonksiyonu sonrası olan değişiklikleri göremeyeceğiz..

// unsubscribe();

store.dispatch(resetCount()); // 0

store.dispatch(decrementCount({ decrementBy: 5 })); // sonuc -5

store.dispatch(decrementCount({ decrementBy: 3 })); // sonuc -8

store.dispatch(decrementCount({})); // sonuc -9

store.dispatch(decrementCount()); // sonuc -10

store.dispatch(setCount()); // sonuc -10

store.dispatch(setCount({count:120})); // sonuc 120


// --------- Action object Definitions --------- *** Daha çok action generator kullanmaya çalış!!

// const incrementCounter = {
// 	type: "INCREMENT", // type zorunlu bir propertydir.
// 	incrementBy: 5, // action objesi içerisinde işimize yarayacak şekillerde başka şeyler de kullanabiliriz..

// 	// payload: store.getState().count + 1
// };

// const decrementCounter = {
// 	type: "DECREMENT",
// 	decrementBy: 10,
// };

// const resetCounter = {
// 	type: "RESET",
// 	// payload: store.getState().count + 1
// };
