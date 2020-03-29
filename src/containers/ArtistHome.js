import React, { Component } from 'react'
import Topbar from './../components/Topbar';
import Bottombar from './../components/Bottombar';
import ArtistHomeContent from '../components/ArtistHomeContent';

export default class ArtistHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldReload: false
        }
    }

    toggleReload = () => {
        this.setState({
            shouldReload: !this.state.shouldReload
        })
    }
    render() {
        return (
            <div>
                <Topbar/>
                <ArtistHomeContent/>
                <Bottombar/>
            </div>
        )
    }
}
