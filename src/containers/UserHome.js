import React, { Component } from 'react'
import Topbar from './../components/Topbar';
import Bottombar from './../components/Bottombar';
import UserHomeContent from '../components/UserHomeContent';
export default class UserHome extends Component {

    render() {
        return (
            <div>
                <Topbar/>
                <UserHomeContent/>
                <Bottombar/>
            </div>
        )
    }
}
