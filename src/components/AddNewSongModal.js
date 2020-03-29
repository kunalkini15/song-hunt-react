import React, { Component } from "react";
import { Row, Col, Input, Modal, Button, DatePicker, Select } from "antd";
import {reactLocalStorage} from 'reactjs-localstorage';
import { getAllArtistDetails } from "../api/deltax";
import axios from 'axios';
const {Option} = Select;

export default class AddNewSongModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          visible: this.props.visible,
          name: undefined,
          date: undefined,
          file: null,
          selectedArtists: [],
          allArtists: undefined
        };
      }

      handleOk = async () => {
        const email = reactLocalStorage.get('email',undefined, true);

        if(email){
            const data = new FormData();
            data.append("name", this.state.name);
            data.append("release_date", this.state.date);
            data.append("image", this.state.file, this.state.file.name);
            data.append("selectedArtists", this.state.selectedArtists);
            const url = "http://localhost:8000/song/"
            await axios.post(url, data, {
                headers: {
                  'content-type': 'multipart/form-data',
                  'email': email
                }
              })
        }
        this.props.toggleAddSongModalVisibility(true);
      };
      handleCancel = () => {
        this.props.toggleAddSongModalVisibility(false);
      };

      handleNameChange = e => {
          this.setState({name: e.target.value});
      }

      handleDateChange = (date, dateString) => {
        this.setState({date: dateString})
    }

      handleFileChange = (event) => {
        this.setState({
            // file: URL.createObjectURL(event.target.files[0])
            file: event.target.files[0]
          })
        }
      handleArtistSelection = (value) => {
          this.setState({
              selectedArtists: value
          })
      }

    
      componentDidMount = async () => {
            const email = reactLocalStorage.get('email',undefined, true);
            const response = await getAllArtistDetails(email);
            this.setState({allArtists: response.data})
      }

      renderArtists = () => {
          return (
              this.state.allArtists.map((item, index) => {
                  return (
                      <Option key={item.id} value={item.id} label={item.name}> {item.name} </Option>
                  )
              })
          )
      }


    render() {
        return (
            <div>
                <Modal
                    title="Add new song"
                    visible={this.state.visible}
                    closable={false}
                    footer={[
                        <Button key="back" className="float-left" onClick={this.handleCancel}>
                        Cancel
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                        Add new song
                        </Button>
                    ]}
                >
                    <Row>
                        <Col lg={6} md={6}>
                        {" "}
                        <b>Song name:</b>
                        </Col>
                        <Col lg={10} md={10}>
                        <Input
                            placeholder="Enter your full name"
                            onChange={this.handleNameChange}
                        />
                        </Col>
                    </Row>
                    <Row className="row-top-margin">
                        <Col lg={6} md={6}>
                        {" "}
                        <b>Date released:</b>
                        </Col>
                        <Col lg={10} md={10}>
                            <DatePicker onChange={this.handleDateChange}/>
                        </Col>
                    </Row>
                    <Row className="row-top-margin">
                        <Col lg={6} md={6}> <b>Artwork:</b> </Col>
                        <Col lg={10} md={10}>
                        <input type="file" onChange={this.handleFileChange}/>
                        </Col>
                    </Row>
                    <Row className="row-top-margin">
                        <Col lg={6} md={6}> <b>Artists:</b> </Col>
                        <Col lg={10} md={10}>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Select artists"
                            onChange={this.handleArtistSelection}
                            optionLabelProp="label"
                        >
                            {this.state.allArtists !== undefined && this.renderArtists()}
                            </Select>
                        </Col>
                    </Row>
                </Modal>
                
            </div>
        )
    }
}
