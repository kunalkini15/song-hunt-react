import React, { Component } from 'react'
import {Layout} from 'antd';
import Topsongs from './Topsongs';
import TopArtists from './TopArtists';

const Content = Layout.Content;
export default class UserHomeContent extends Component {
    render() {
        return (
            <Content className="content user-home-content">
                <Topsongs/>
                <TopArtists/>
            </Content>
        )
    }
}
