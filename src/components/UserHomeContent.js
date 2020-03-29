import React, { Component } from 'react'
import {Layout} from 'antd';

const Content = Layout.Content;
export default class UserHomeContent extends Component {
    render() {
        return (
            <Content className="content">
                <h1> User Home </h1>
            </Content>
        )
    }
}
