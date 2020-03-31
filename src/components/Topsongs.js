import React, { Component } from 'react'
import { getSongs, userRating } from '../api/deltax'
import {Table, Rate, Popconfirm, message} from 'antd';
import {reactLocalStorage} from 'reactjs-localstorage';

let selectedRecord = undefined
let userSelectedRating = undefined
export default class Topsongs extends Component {
    constructor(props){
        super(props);
        this.state = {
            songDetails: [],
            userRating: undefined,
            selectedRecord: undefined,
            ratingUpdateConfirmed: false
        }
    }

    componentDidMount = async () => {
        const email = reactLocalStorage.get('email',undefined, true)
        const response = await getSongs(email);
        this.setState({songDetails: response.data});
    }

    handleRatingChange = (number) => {
         userSelectedRating = number
    }

    handleUpdateRatingConfirmation = () => {

        this.setState({ratingUpdateConfirmed: true})
    }

    handleUpdateRating = async () => {

        const email = reactLocalStorage.get('email',undefined, true)
            try
            {
               const ratingResponse =  await userRating(email, selectedRecord.key, userSelectedRating);
               message.success(ratingResponse.data);
               selectedRecord = undefined
               userSelectedRating = undefined
               const response = await getSongs(email);
               this.setState({songDetails: response.data});

            }
            catch(err)
            {
                if(err.response)
                    console.log(err.response.data);
            }

        
        
    }
    render() {
        if(userSelectedRating !== undefined && selectedRecord !== undefined && this.state.ratingUpdateConfirmed)
           {
                this.handleUpdateRating()
            }
        const columns = [
            {
                title: 'Artwork',
                dataIndex: 'artwork',
                key: 'artwork',
                render: text => {
                    if(text){
                        const imagePath = "http://localhost:8000" + text
                        return <img src={imagePath} className="user-home-song-artwork-img" alt="artwork"/>
                    }
                        
                    else return null;
                },
                width: "5vw"
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: "8vw"
            },
            {
                title: 'Release date',
                dataIndex: 'release_date',
                key: 'release_date',
                width: "7vw"
            },
            {
                title: 'Artists',
                dataIndex: 'artists',
                key: 'artists',
                render: artists => {
                    return(
                        artists.map((item, index) => {
                            return <p className="display-inline"> {item.name}{
                                index !== artists.length-1 ? 
                                                        <p className="display-inline">,</p>
                                                        :<p className="display-inline">.</p>
                            } </p>
                        })
                    )
                },
                width: "15vw"
            },
            {
                title: 'Overall Rating',
                dataIndex: 'rating',
                key: 'rating',
                render: ratingDetails => <React.Fragment>
                                            <Rate allowHalf disabled defaultValue={ratingDetails.rating__avg} />
                                            <p className="rating-info-text"> Total reviews: {ratingDetails.rating__count} </p>
                                        </React.Fragment>,
                width: '10vw'
            },
            {
                title: 'Your Rating',
                dataIndex: 'user_rating',
                key: 'user_rating',
                render: number => {
                    if(number === -1)
                        return(
                            <React.Fragment>
                                <Popconfirm
                                    title="Are you sure you want to update the rating?"
                                    onConfirm={this.handleUpdateRatingConfirmation}
                                    onCancel={null}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <div><Rate allowHalf defaultValue={0} onChange={this.handleRatingChange}/></div>
                                </Popconfirm>
                                <p className="rating-info-text"> You haven't given any ratings yet </p>
                            </React.Fragment>
                        )
                    return (
                        <Popconfirm
                            title="Are you sure you want to update the rating?"
                            onConfirm={this.handleUpdateRatingConfirmation}
                            onCancel={null}
                            okText="Yes"
                            cancelText="No"
                        >
                            <div><Rate allowHalf defaultValue={number} onChange={this.handleRatingChange}/> </div>                       
                            <p className="rating-info-text">.</p>
                        </Popconfirm>

                    )
                },
                width: '10vw',
                onCell: (record, rowIndex) => {
                    return{
                        onClick: (event) => {selectedRecord = record}
                        
                    } 
                }
            }
        ]
        const data = []
        
        for(var i=0;i<this.state.songDetails.length;i++)
        {
            const current_song = this.state.songDetails[i]
            const current_obj = {
                key: current_song.song.id,
                artwork: current_song.song.image,
                name: current_song.song.name,
                release_date: current_song.song.release_date,
                artists: current_song.artists,
                rating: current_song.rating,
                user_rating: current_song.user_rating
            }
            data.push(current_obj)
        }

        return (
            <div>
                <div className="user-home-heading-container">
                <h1 className="display-inline heading"> Songs </h1>
                <span className="heading-info-text"> Songs with higher rating are displayed first. </span>
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
