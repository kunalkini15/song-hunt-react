import React, { Component } from 'react'
import { Row, Col, Button, Spin, message } from 'antd'
import AddNewSongModal from './AddNewSongModal';
import { LoadingOutlined } from '@ant-design/icons';
import { getArtistDetails } from '../api/deltax';
import {reactLocalStorage} from 'reactjs-localstorage';
const antIcon = <LoadingOutlined className="loading-icon" spin />;
export default class ArtistDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAddSongModalVisible: false,
            artistDetails: undefined,
            loading: true
        }
    }

    handleAddSongClick = () => {
        this.setState({isAddSongModalVisible: true})
    }

    toggleAddSongModalVisibility = (value) => {
        if(value){
            this.props.toggleReload(value)
        }
        this.setState({isAddSongModalVisible: false})
    }


    componentDidMount = async () => {

        try{
            const email = reactLocalStorage.get('email',undefined, true);
            const artistDetails = await getArtistDetails(email);
            this.setState({
                artistDetails: artistDetails.data,
                loading: false
            
            })
        }
        catch(err){
            if(err.response) message.error(err.response.data);
            else message.error("Something went wrong")
        }
    }
    render() {
        return (
            <div className="artist-details-container">
                {

                    this.state.loading
                    ? <div className="loading-icon-container"><Spin indicator={antIcon} /> </div>
                    :(<Row>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <h1 className="heading"> Hi, {this.state.artistDetails.name} </h1>   
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <Button 
                            type="primary" 
                            id = "add-new-song-btn"
                            className="btn-top-margin float-right"
                            onClick={this.handleAddSongClick}
                        > 
                            Add new song <b> +</b> 
                            
                        </Button> 
                    </Col>
                    </Row>)

                }
                {
                    this.state.isAddSongModalVisible &&
                            <AddNewSongModal 
                                visible ={this.state.isAddSongModalVisible}
                                toggleAddSongModalVisibility={this.toggleAddSongModalVisibility}
                            />
                }
            </div>
        )
    }
}
