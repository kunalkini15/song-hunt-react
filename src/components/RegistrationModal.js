import React, { Component } from "react";
import { Row, Col, Input, Modal, message, Button, DatePicker, Checkbox } from "antd";
import { register } from "../api/deltax";
// import { register } from "./../api/flipr";

export default class RegistrationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      name: undefined,
      email: undefined,
      password: undefined,
      confirmedPassword: undefined,
      isArtist: false,
      dob: undefined,
      bio: undefined
    };
  }

  handleOk = async () => {
    if (this.state.name === undefined)
      message.error("Please enter your name to continue");
    else if (this.state.email === undefined)
      message.error("Please enter an email to continue");
    else if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)))
      message.error("Please enter a valid email")
    else if (this.state.password === undefined)
      message.error("Please enter a password to continue");
    else if (this.state.password.length < 8)
      message.error("Password must be at least 8 characters long")
    else if (this.state.confirmPassword === undefined)
      message.error("Please confirm password to continue");
    
    else if (this.state.password !== this.state.confirmPassword)
      message.error("Password doesn't match");
    else {
      
        if(this.state.isArtist){
          /* Artist Fields Error check */
          if(this.state.dob === undefined)
            message.error("Please enter date of birth to continue");
          else if( new Date(this.state.dob) > new Date())
            message.error("Date of birth can't be greater than current day");
          else if(this.state.bio === undefined)
            message.error("Please add your bio to continue");
          else{
            
            try{
              const response = await register(this.state.name, 
                this.state.email,  
                this.state.password, 
                this.state.isArtist,
                this.state.dob,
                this.state.bio
                
                );
                if(response.status === 201)
                {
                  message.success("Artist created successfully. Please login to continue");
                  this.props.toggleRegistrationModalVisibility(false);
                }
              
            }
            catch(err)
            {
              if(err.response)
                message.error(err.response.data);
              else{
                message.error("Something went wrong")
              }
            }
          }
          
        }
        
        else{
          try
          {
            const response = await register(this.state.name, this.state.email,  this.state.password, this.state.isArtist);
          if(response.status === 201)
            {
                message.success("User created successfully. Please login to continue");
                this.props.toggleRegistrationModalVisibility(false);
            }
          }
          catch(err)
          {
            if(err.response)
              message.error(err.response.data);
          }
        }
        
    }
  };

  handleCancel = () => {
    this.props.toggleRegistrationModalVisibility(false);
  };
  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handleConfirmPasswordChange = e => {
    this.setState({ confirmPassword: e.target.value });
  };

  handleIsArtistClick = (e) => {
    this.setState({isArtist: e.target.checked})
  } 

  handleDobChange = (date, dateString) => {
    this.setState({dob: dateString})
  }

  handleBioChange = e => {
    this.setState({ bio: e.target.value })
  }

  render() {
    return (
      <div>
        <Modal
          title="Register"
          visible={this.state.visible}
          closable={false}
          footer={[
            <Button key="back" className="float-left" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Register
            </Button>
          ]}
        >
          <Row>
            <Col span={6}>
              {" "}
              <b>Name:</b>
            </Col>
            <Col lg={10} md={12} sm={12} xs={16}>
              <Input
                placeholder="Enter your full name"
                onChange={this.handleNameChange}
              />
            </Col>
          </Row>
          <Row className="row-top-margin">
            <Col span={6}>
              {" "}
              <b>Email:</b>
            </Col>
            <Col lg={10} md={12} sm={12} xs={16}>
              <Input
                placeholder="Enter email"
                onChange={this.handleEmailChange}
              />
            </Col>
          </Row>
          <Row className="row-top-margin">
            <Col span={6}>
              <b>Password:</b>{" "}
            </Col>
            <Col lg={10} md={12} sm={12} xs={16}>
              <Input.Password
                placeholder="Enter password"
                onChange={this.handlePasswordChange}
              />
            </Col>
          </Row>
          <Row className="row-top-margin">
            <Col span={6}>
              <b>Confirm:</b>{" "}
            </Col>
            <Col lg={10} md={12} sm={12} xs={16}>
              <Input.Password
                placeholder="Enter password again"
                onChange={this.handleConfirmPasswordChange}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Checkbox checked={this.state.isArtist} onChange={this.handleIsArtistClick}> Artist </Checkbox>
            </Col>

          </Row>
          {
            this.state.isArtist && (

              <React.Fragment>
                <Row className="row-top-margin">
                  <Col span={6}>
                    <b>DOB:</b>
                  </Col>
                  <Col lg={10} md={12} sm={12} xs={16}>
                      <DatePicker onChange={this.handleDobChange} />

                  </Col>
                </Row>
                <Row className="row-top-margin">
                    <Col span={6}>
                        <b>Bio:</b>
                      </Col>
                      <Col lg={10} md={12} sm={12} xs={16}>
                          <Input.TextArea onChange={this.handleBioChange}/>

                      </Col>
                </Row>
              </React.Fragment>
            )
          }
        </Modal>
      </div>
    );
  }
}
