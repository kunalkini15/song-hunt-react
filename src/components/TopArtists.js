import React, { Component } from 'react'
import { getArtists } from '../api/deltax';
import {Table, Spin, message} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined className="loading-icon" spin />;

export default class TopArtists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artistDetails: [],
            loading: true
        }
    }

    componentDidMount = async () => {
        try{
            const response = await getArtists();
            this.setState({
                artistDetails: response.data,
                loading: false
            });
        }
        
        catch(err){
            if(err.response) message.error(err.response.data);
            else message.error("Something went wrong")
        }
        
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
                                                        <span className="display-inline">,</span>
                                                        :<span className="display-inline">.</span>
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
                {
                    this.state.loading
                    ? <div className="loading-icon-container"><Spin indicator={antIcon} /> </div>
                    :<Table 
                    columns={columns} 
                    dataSource={data} 
                    pagination={{ pageSize: 3 }}
                    scroll = {{x: 600 }}
                    />
                }
                
            </div>
        )
    }
}
