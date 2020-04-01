import React, { Component } from 'react'
import {Layout, Spin, message} from 'antd';
import {reactLocalStorage} from 'reactjs-localstorage';
import ArtistDetails from './ArtistDetails';
import ArtistSongDetails from './ArtistSongDetails'
import { LoadingOutlined } from '@ant-design/icons';
import { getArtistAllSongs } from '../api/deltax';
const antIcon = <LoadingOutlined className="loading-icon" spin />;
const Content = Layout.Content;
export default class ArtistHomeContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            artistAllSongs: undefined
        }
    }

    toggleReload = async (value) => {
        this.setState({ artistAllSongs: undefined })
        if(value) {
            try{
                const email = reactLocalStorage.get('email',undefined, true);
                const artistAllSongs = await getArtistAllSongs(email);
                this.setState({artistAllSongs: artistAllSongs.data})
            }
            
            catch(err){
                if(err.response) message.error(err.response.data);
                else message.error("Something went wrong")
            }
            
        }
    }

    componentDidMount = async () => {

        try{
            const email = reactLocalStorage.get('email',undefined, true);
            const artistAllSongs = await getArtistAllSongs(email);
                this.setState({
                    artistAllSongs: artistAllSongs.data});
        }
        catch(err){
            if(err.response) message.error(err.response.data);
            else message.error("Something went wrong")
        }
    }


    render() {
        return (
            <Content className="content">

            <ArtistDetails toggleReload={this.toggleReload} />
            
            {
                this.state.artistAllSongs === undefined 
                ? <div className="loading-icon-container"><Spin indicator={antIcon} /> </div>
                : <ArtistSongDetails artistAllSongs={this.state.artistAllSongs}/>
            }
            

                
            </Content>
        )
    }
}
