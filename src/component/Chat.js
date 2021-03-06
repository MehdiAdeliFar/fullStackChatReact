import React from "react";
import '../chatStyle.css';
import ChatService from "../util/ChatService";
import chatAction from '../util/chatAction'

class Chat extends React.Component {

    state = {
        room: '',
        login: '',
        chatMessages: [],
        message: ''
    };
    // chatService = new ChatService();
    chatService = new ChatService();

    componentDidMount() {


        this.chatService = new ChatService();
        this.getLoginName();
        this.setState({room: chatAction.roomName});
        if (!chatAction.socket) {
            const {history} = this.props;
            if (history) history.push("/login");
        } else {
            console.log(chatAction);
            if (!chatAction.roomName || chatAction.roomName.length < 1) {
                this.logout();
                return;
            }
        }
        // chatAction.socket.on('new-message',  function (data) {
        //     console.log("new message");
        //     this.setState({chatMessages: [...this.state.chatMessages, data.data]});
        // }.bind(this));

        this.chatService.getMessage().subscribe(data => {
            console.log(this.state.chatMessages);
            this.setState({chatMessages: [...this.state.chatMessages, data]});
            const el = document.getElementById('token');
            el.scrollIntoView();
        })


    }

    logout = () => {
        localStorage.clear();
        this.chatService.disconnect();
        const {history} = this.props;
        if (history) history.push("/login");

    };

    getLoginName() {
        const item = localStorage.getItem('name');
        this.setState({login: item});
    }

    leave = event => {
        this.chatService.leave();
        const {history} = this.props;
        if (history) history.push("/list");

    };
    handleTextChange = event => {
        this.setState({message: event.target.value})
    };
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.message.length < 1) {
            return;
        }
        this.chatService.sendMessage(this.state.message);
        const el = document.getElementById('token');
        el.scrollIntoView();
        this.setState({message: ''})
    };

    render() {
        return (
            <div className="container">

                <nav className=" navbar navbar-light bg-light">
                    <span>{this.state.room}</span>
                    <span>{this.state.login}</span>
                    <button onClick={this.leave} className="btn btn-warning">leave</button>


                </nav>
                <hr/>
                <div className="row justify-content-center ">
                    <div className="col-md-8 col-xl-8 chat">
                        <div className="card">

                            <div className="card-body msg_card_body">
                                {this.state.chatMessages.map(cm => {
                                    if (cm) {
                                        return (
                                            <div>
                                                {cm.username != this.state.login ?
                                                    <div className="d-flex justify-content-start mb-4">
                                                        <span>{cm.username}</span>
                                                        <div className="msg_cotainer">
                                                            {cm.text}
                                                            <span
                                                                className="msg_time">{cm.date}</span>
                                                        </div>
                                                    </div> : <div>
                                                        <div className="d-flex justify-content-end mb-4">
                                                            <div className="msg_cotainer_send">
                                                                {cm.text}
                                                                <span
                                                                    className="msg_time_send">{cm.date}</span>
                                                            </div>

                                                            <span>{cm.username}</span>
                                                        </div>
                                                    </div>}
                                            </div>
                                        )
                                    }else return (<div/>)
                                })}

                            </div>
                            <span id="token"/>
                        </div>
                        <div className="card-footer">
                            <form onSubmit={this.handleSubmit}>
                                <div className="input-group">
                                    <div className="input-group-append">
                            <span className="input-group-text attach_btn">
                            </span>
                                    </div>
                                    <textarea onChange={this.handleTextChange} className=" form-control type_msg"
                                              value={this.state.message}/>
                                    <div className=" input-group-append">
                                        <button type="submit" className="input-group-text send_btn">
                                            <span>send</span></button>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat;
