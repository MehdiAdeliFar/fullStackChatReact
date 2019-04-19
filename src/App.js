import React, {Component} from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Login from "./component/Login";
import Register from "./component/Register";
import List from "./component/List";
import AdminEvents from "./component/AdminEvents";
import AdminMessage from "./component/AdminMessage";
import AdminRooms from "./component/AdminRooms";
import Chat from "./component/Chat";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import AdminRoomEdit from "./component/AdminRoomEdit";

class App extends Component {
    render() {

        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={Login} exact/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/list" component={List}/>
                    <Route path="/admin-rooms" component={AdminRooms}/>
                    <Route path="/edit-room/:id" component={AdminRoomEdit}/>
                    <Route path="/edit-room" component={AdminRoomEdit}/>
                    <Route path="/history" component={AdminMessage}/>
                    <Route path="/history/:name" component={AdminMessage}/>
                    <Route path="/admin-room-log" component={AdminEvents}/>
                    <Route path="/chats" component={Chat}/>

                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
