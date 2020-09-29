// Higher Order Components ==> https://medium.com/@muratturkaym/higher-order-components-77a6796d777a 

// A component (HOC) that renders another component... Reuse code, render hijacking, Prop manipulation, Abstract state...


import React from 'react';
import ReactDOM from 'react-dom'


const Info = (props) =>(
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info} </p>
    </div>
);

// Pure fonk. kullanarak parametre olarak bir component alıyoruz. bu component' ı fonksiyon içinde return ettiğimiz bir başka component içinde kullanabiliyoruz. Aynı zamanda HOC' ye gönderilen propsları sarmalanan component'a da gönderebiliyoruz..
const withAdminWarning = (WrappedComponent) =>{
    return (props) => ( // Higher order component tanımlaması.
        <div>
            {props.isAdmin &&  <p>This is private info.</p> }
            {/* isAdmin props'u HOC ye özel bir props'dur. Burada props bilgisiyle işlemler yapabiliriz.. */}
            <WrappedComponent {...props} /> 
            {/* ...props ile HOC propslarını sarmalanan component a spread ederek dağıtmış olduk... */}
        </div>
    );
}

const  requireAuthentication = (WrappedComponent) =>{
    return (props) =>(
        <div>
            {props.isAuthenticated ?  <WrappedComponent {...props} />: <p>Merhaba, başarısız bir giriş oldu...</p>}
        </div>
    )
}

const AdminInfo = withAdminWarning(Info); 
// oluşturduğumuz pure fonksiyon ile yeni bir component oluşturmuş olduk. Bir nevi adminInfo componentini baştan yazmak yerine inheritance? kullandık diyebiliriz.
const AuthInfo = requireAuthentication(Info);


// ReactDOM.render(<AdminInfo isAdmin={true} info="Detaylar burada..."/>, document.getElementById('root'))
ReactDOM.render(<AuthInfo isAuthenticated={true} info="Detaylar burada..."/>, document.getElementById('root'))

