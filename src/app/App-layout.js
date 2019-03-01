import React, { Component } from 'react';
import './App.css';
import { Layout } from 'antd';
import Table from './Table.js'
import {cHeader as Header, cFooter as Footer} from './header'



class AppLayout extends Component {
  state = {
    data : null
  }

  render(){

    return (
      <Layout style = {{height:'100%'}}>
        <Header className = 'header'/>
          <div className = 'content'>
            <Table pagination = {false}/>
          </div>
        <Footer  className = 'footer'/>
    </Layout>
    )
  }
}

export default AppLayout