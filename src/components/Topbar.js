import React, { Component } from 'react'
import {Layout, Button} from 'antd';
import {reactLocalStorage} from 'reactjs-localstorage';
import history from './../history';
const Header = Layout.Header;
export default class Topbar extends Component {
    
    handleLogout = () => {
        reactLocalStorage.remove('email');
        history.push("/")
    }
    
    render() {
        return (
            <Header className="header">
                <Button className="float-right btn-top-margin" onClick={this.handleLogout}>Logout </Button> 
            </Header>
        )
    }
}
