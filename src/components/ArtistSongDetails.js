import React, { Component } from 'react'
import {Table} from 'antd';
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export default class ArtistSongDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            artistAllSongs: this.props.artistAllSongs,
            loading: true
        }
    }

    getDate = (date) => {
        const dateObject = new Date(date);
        return months[dateObject.getMonth()] + " " + dateObject.getDate() + " " + dateObject.getFullYear();
    }


    render() {
        const columns = [
            {
                title: 'Artwork',
                dataIndex: 'artwork',
                key: 'artwork',
                render: text => {
                    if(text){
                        // const imagePath = "http://localhost:8000" + text
                        const imagePath = "https://song-hunt-backend.herokuapp.com" + text
                        return <img src={imagePath} className="song-artwork-img artist-song-img" alt="artwork"/>
                    }
                        
                    else return <div className="song-artwork-img artist-song-img img-not-found"> <b> X </b></div>;
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
        this.state.artistAllSongs.forEach((item, index) => {
            const currentSongObj = {
                key: index,
                artwork: item.image,
                name: item.name,
                release_date: this.getDate(item.release_date)
            }

            data.push(currentSongObj);
        })
        return (
            <div>
                    <div className="artist-song-details-conatiner">
                        <h2 className="artist-song-details-heading"> Your songs:  </h2> 
                        <Table 
                            columns={columns} 
                            dataSource={data} 
                            pagination={{ pageSize: 4 }}
                            className="artist-song-details-table"/>
                    </div>
            </div>
                
        )
    }
}
