import React, { Component } from 'react'
import {Layout, Button, Row, Col} from 'antd';
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
                <Row>
                    <Col span={12}>
                        <h3 className="header-logo"> SONGHUNT </h3>
                    </Col>
                    <Col span={12}>
                        <Button className="float-right btn-top-margin" onClick={this.handleLogout}>Logout </Button>
                    </Col>

                </Row>
                 
            </Header>
        )
    }
}
