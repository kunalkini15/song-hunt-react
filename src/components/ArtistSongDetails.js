import React, { Component } from 'react'
import {Table} from 'antd';
export default class ArtistSongDetails extends Component {
    render() {
        const artistAllSongs = this.props.artistAllSongs;
        const columns = [
            {
                title: 'Artwork',
                dataIndex: 'artwork',
                key: 'artwork',
                render: text => {
                    if(text){
                        const imagePath = "http://localhost:8000" + text
                        return <img src={imagePath} className="song-artwork-img" alt="artwork"/>
                    }
                        
                    else return null;
                }
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                //render: text => <a>{text}</a>,
            },
            {
                title: 'Release date',
                dataIndex: 'release_date',
                key: 'release_datee',
            }
        ]
        const data = []
        artistAllSongs.forEach((item, index) => {
            const currentSongObj = {
                key: index,
                artwork: item.image,
                name: item.name,
                release_date: item.release_date
            }

            data.push(currentSongObj);
        })
        return (
            <div className="artist-song-details-conatiner">
                <h2 className="artist-song-details-heading"> Your songs:  </h2> 
                <Table columns={columns} dataSource={data} className="artist-song-details-table"/>
            </div>
        )
    }
}
