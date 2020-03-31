import React, { Component } from 'react'
import {Layout, Row, Col} from 'antd';
const Footer = Layout.Footer;
export default class Bottombar extends Component {
    render() {
        return (
           <Footer className="footer">
               <Row>
                   <Col lg={12}>
                        <h3 className="footer-logo"> SongHunt </h3>
                   </Col>
                   <Col lg={12}>
                       <p className="float-right"> Copyright &copy; {new Date().getFullYear()} Kunal  </p>
                   </Col>
               </Row>
           </Footer>
        )
    }
}
