import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// ** React-router kullanarak client-side route işlemleri yaptık....
export default function BasicExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
            {/* React-router özel link componentleri - clien tarafında <a> etiketlerine dönüşüyor. En önemli özelliği ise sayfa yenilenmesine engel oluyor. Server side routing yapısı gibi sayfa yenilenmiyor. İlgili componentlerin render edilmesini sağlıyor. */}
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time.
          -- Çoklu <Route> işlemlerinde aranan URL ile eşleşen ilk elementi bulur ve diğerlerine geçmez. Mantıklı bir yapıya sahip... 
        */}
        <Switch>
          <Route exact path="/">
            {/* exact yapısı verilen path'in birebir aynı olması sonucu routing işlemi yapmamızı sağlar. URL pathi istediğimizden farklı ise route işlemi yapılmaz... */}
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages" in your app.
//  Componentleri SPA larda birer sayfa olarak düşünebiliriz.

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
