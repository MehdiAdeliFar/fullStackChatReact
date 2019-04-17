import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Login from "./component/Login";
import Register from "./component/Register";
import List from "./component/List";
import AdminEvents from "./component/AdminEvents";
import AdminMessage from "./component/AdminMessage";
import AdminRooms from "./component/AdminRooms";

class App extends Component {
  render() {
    return (
        <div>
        <AdminRooms/>
        <List/>
        <AdminMessage/>
        </div>
    );
  }
}

export default App;
