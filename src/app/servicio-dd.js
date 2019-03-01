import { Cascader } from 'antd';
import React from 'react'

class ServicioDD extends React.Component {
  options = [{
    value: 'copiado',
    label: 'Copiado',
  }, {
    value: 'openprint',
    label: 'OpenPrint',
    children: [{
      value: '<=3devoluciones',
      label: '3 o Menosdevoluciones por calidad'
    },{
      value: '>3devoluciones',
      label: 'Mas de devoluciones por calidad'
    }]
  }, {
    value: '<3colores',
    label: '3 colores planos o menos',
  }, {
    value: 'policromia',
    label: 'Policromía'
  },
  ];
  render(){
    return(
      <Cascader options={this.options} onChange={this.props.onChange} placeholder="Seleccione Servicio" disabled = {this.props.disabled} />
    )
  }

}




export default ServicioDD
