import React, {Component} from 'react'
import './App.css'

class Footer extends Component {
constructor(props){
  super(props)
  this.state = {
    data : 0,
    total : 0
  }
}  

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.data !== prevProps.data) {
      this.updateData(this.props.data);
    }
  }

  updateData(data){
    let total = 0
    console.log("datalength")
    console.log(data.length)
    for(let i = 0; i < data.length; i++){
      let foo = data[i].total
      foo = foo.toString().replace(/,/g, '')
      total = total + parseFloat(foo)
    }
    total = total.toFixed(2)
    
    this.setState({total})
  }

  render(){
 
    return(
      <div className = 'footerTable'> 
        <h2>Total: </h2>
        <p style={{margin: "5px 0px 0px 0px", fontWeight: 'bold'}}>{`$ ${(this.state.total).toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}`} </p>
        <p> + iva </p>
      </div> 
    )
  }
}
  
   


export default Footer
  