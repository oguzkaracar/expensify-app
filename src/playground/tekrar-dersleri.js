import React from "react";
import ReactDOM from "react-dom";

const notes = [
	{
		id: "4e81fc6e-bfb6-419b-93e5-0242fb6f3f6a",
		task: "Learn React",
	},
	{
		id: "11bbffc8-5891-4b45-b9ea-5c99aadf870f",
		task: "Do laundry",
	},
];

const List = () => {
	return (
		// React Fragment kullanarak fazladan kapsayıcı div sorununu çözmüş oluyoruz. Fragment sayesinde stillendirme işlemlerimiz kolaylaştı...
		<> 
			<p>Notlar</p>
			<ul>
				{notes.map((note) => {
					return <li key={note.id}>{note.task}</li>;
				})}
			</ul>
		</>
	);
};


// React ref kullanımı... ref ==> DOM nodelarına erişmek ya da render edilen React elementlerine dom üzerinde erişmek için kullanılır.. 
// İnput focus işlemleri, text selection ya da animasyon tetikleme gibi işlemlerde işimize yarar.

class MyComponent extends React.Component {
	constructor(props) {
	  super(props);
	  this.myRef = React.createRef(); // Burada yeni bir ref oluşturduk..
	}

	componentDidMount(){
		this.myRef.current.focus();
	}

	render() {
	  return <input type="text" ref={this.myRef} />;
	}
  }

ReactDOM.render(<MyComponent />, document.getElementById("root"));
