import React from 'react'
import { Layout,Icon } from 'antd';
import './App.css'

const logo = require( '../img/logoNegro.png')

const { Header, Footer } = Layout;


const headerStyle ={ 
  display: 'flex',
  flexDirection: 'row',
  justifyContent:'space-between',
  height:'109px',
  color:'white',
  fontSize: '16px',
  backgroundColor: 'black' ,
  position:'relative',
  width:'100%',
}

export const cHeader = ()=> {
    return(
    <Header style={headerStyle}>
        <img src={logo}  alt='logo'/>
        <h1 style={{color: 'lightgray',   fontWeight: 'bold', padding: '20px'}}> COTIZADOR </h1>
    </Header>
    )
}

export const cFooter = ()=>{
  return(
  <Footer  className = 'footer'>
    <div className = 'mails'>
      <Icon type = "mail" style={{color:'white'}}/>
      <p>mejoratuimpresion@grafiflex.com</p>
    </div>

    <div> 
      <Icon type="environment"/>
      <div className={'dirs'}>
        <p>Medellín: Calle 49 Sur No. 43 A - 241. 3er Piso</p>
        <p>Barranquilla: Via 40 No. 85 - 470.  Of. 15A</p>
      </div>
    </div>

    <div className='phone'>
      <Icon type = "phone"/>
      <div className ='phoneP'>
        <p>(57-4) 44 88 508</p>
        <p>(57-5) 385 8506</p>
      </div>

    </div>
  </Footer>
  )
}
