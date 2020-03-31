import React, { Component } from 'react'
import { getArtists } from '../api/deltax';
import {Table} from 'antd';

export default class TopArtists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artistDetails: []
        }
    }

    componentDidMount = async () => {
        const response = await getArtists();
        this.setState({artistDetails: response.data});
    }

    render() {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: "8vw"
            },
            {
                title: 'Date of birth',
                dataIndex: 'dob',
                key: 'dob',
                width: "7vw"
            },
            {
                title: 'songs',
                dataIndex: 'songs',
                key: 'songs',
                render: songs => {
                    return(
                        songs.map((item, index) => {
                            return <p className="display-inline"> {item.name}{
                                index !== songs.length-1 ? 
                                                        <p className="display-inline">,</p>
                                                        :<p className="display-inline">.</p>
                            } </p>
                        })
                    )
                },
                width: "15vw"
            }
        ]
        const data = []
        for(var i=0;i<this.state.artistDetails.length;i++)
        {
            const current_artist = this.state.artistDetails[i]
            const currentObj = {
                key:i,
                name: current_artist.artist.name,
                dob: current_artist.artist.dob,
                songs: current_artist.songDetails.songs 
            }
            data.push(currentObj)
        }
        return (
            <div>
                <div className="user-home-heading-container">
                    <h1 className="display-inline heading"> Artists </h1>
                    <span className="heading-info-text"> Artists with higher rating are displayed first. </span>
                </div>
                <Table 
                    columns={columns} 
                    dataSource={data} 
                    pagination={{ pageSize: 3 }}
                    
                    />
            </div>
        )
    }
}
