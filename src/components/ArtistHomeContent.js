import React, { Component } from 'react'
import {Layout} from 'antd';
import { getArtistDetails, getArtistAllSongs } from '../api/deltax';
import {reactLocalStorage} from 'reactjs-localstorage';
import ArtistDetails from './ArtistDetails';
import ArtistSongDetails from './ArtistSongDetails'

const Content = Layout.Content;
export default class ArtistHomeContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            artistDetails: undefined,
            artistAllSongs: undefined
        }
    }

    toggleReload = async (value) => {
        if(value) {
            const email = reactLocalStorage.get('email',undefined, true);
            const artistAllSongs = await getArtistAllSongs(email);
            this.setState({artistAllSongs: artistAllSongs.data})
        }
    }

    componentDidMount = async () => {
        const email = reactLocalStorage.get('email',undefined, true);
        if(email)
        {
            const artistDetails = await getArtistDetails(email);
            const artistAllSongs = await getArtistAllSongs(email);
            this.setState({
                artistDetails: artistDetails.data,
                artistAllSongs: artistAllSongs.data
            });
        }
    }
    render() {
        return (
            <Content className="content">
                {
                    (
                        this.state.artistDetails !== undefined && 
                            <ArtistDetails artistDetails={this.state.artistDetails}
                                            toggleReload={this.toggleReload}
                            />
                    )
                }
                {
                    (
                        this.state.artistAllSongs !== undefined &&
                            <ArtistSongDetails artistAllSongs={this.state.artistAllSongs}/>
                    )
                }
                
            </Content>
        )
    }
}
