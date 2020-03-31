import React, { Component } from 'react'
import { Row, Col, Button, Input, message } from 'antd'
import Form from 'antd/lib/form/Form';
import RegistrationModal from '../components/RegistrationModal';
import {login} from './../api/deltax';
import history from './../history';
import {reactLocalStorage} from 'reactjs-localstorage';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegisterModalVisible: false,
            email: undefined,
            password: undefined,
            isUserLoginClicked: false,
            isArtistLoginClicked: false
        }
    }

    
    handleRegisterClick = () => {
        this.setState({isRegisterModalVisible: true})
    }

    toggleRegistrationModalVisibility = (value) => {
        this.setState({isRegisterModalVisible: value})
    }

    handleLoginClick = async (isArtist) => {
        const response = await login(this.state.email, this.state.password, isArtist);
        if(response.status === 200)
        {
            message.success("Login Successful");
            if(isArtist)
                {
                    reactLocalStorage.set('email', this.state.email);
                    history.push('/artist');
                }
            else{
                reactLocalStorage.set('email', this.state.email);
                history.push('/user');
            }
        }
        else 
            message.error(response.data);
        
    }

    handleEmailChange = e => {
        this.setState({email: e.target.value})
    }

    handlePasswordChange = e => {
        this.setState({password: e.target.value})
    }



    renderHeading = () =>  <h1 className="home-page-heading white-text"> SONG HUNT </h1>
    
    renderInfoText = () => <p className="white-text home-page-info-text"> Song Hunt provides one central place for users and artists to collaborate.
                                User can use Song hunt to rate the songs, explore new songs, explore artists, etc.
                                Artists can use Song hunt to get user feedback, launch new song, etc.
                            </p>

    renderRegisterButton = () => <Button type="primary"
                                        className="home-page-register-btn"
                                        onClick={this.handleRegisterClick}
                                        > 
                                        Click here to register 
                                </Button>

    renderLoginForm = () => 
            <div>
                <Form className="home-page-form">
                    <Row>
                            <Input 
                                className="home-page-input-field" 
                                placeholder="Enter your username"
                                onChange={this.handleEmailChange}
                                />
                    </Row>
                    <Row>
                            <Input.Password 
                                className="home-page-input-field" 
                                placeholder="Enter your password"
                                onChange={this.handlePasswordChange}
                                />
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <Button type="primary" 
                                className="home-page-login-btn home-page-user-login-btn"
                                onClick = {() => this.handleLoginClick(false)}
                                > 
                                User Login 
                            </Button>
                        </Col>
                        <Col lg={12}>
                            <Button type="primary" 
                                className="home-page-login-btn home-page-emp-login-btn"
                                onClick = {() => this.handleLoginClick(true)}
                                > 
                                
                                Artist Login 
                            </Button>
                        </Col>
                    </Row>

                </Form>
            </div>
        
 
    render() {
        return (
            <div className="container">
                <Row>
                    <Col lg={12} >
                        <div className="home-page-left">
                            {this.renderHeading()}
                            {this.renderInfoText()}
                            {this.renderRegisterButton()}
                        </div>
                    </Col>
                    <Col lg={12} className="home-page-right">
                        <h1 className="white-text"> Login To Song Hunt </h1>
                        {this.renderLoginForm()}
                    </Col>

                </Row>

                {
                    this.state.isRegisterModalVisible && <RegistrationModal 
                                                                visible={this.state.isRegisterModalVisible}
                                                                toggleRegistrationModalVisibility={this.toggleRegistrationModalVisibility}
                                                        />
                }

            </div>
        )
    }
}
