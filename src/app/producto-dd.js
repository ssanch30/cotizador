import { Cascader } from 'antd';
import React from 'react'

const options = [{
  value: 'fotopolimero',
  label: 'Fotopolimero',
  children: [{
    value: 'convencional',
    label: 'Convencional',    
  }, {
    value: 'digital',
    label: 'Digital',    
  }, {
    value: 'grafiexpress',
    label: 'Grafiexpress',    
  }],
  }, {
    value: 'pelicula',
    label: 'Película',
  }, {
    value: 'arte',
    label: 'Arte',
    children: [{
      value: 'plancha',
      label: 'Con plancha'
    },{
      value: 'sPlancha',
      label: 'Sin Plancha'
    }]
  }, {
    value: 'montaje',
    label: 'Montaje',
    children: [{
      value: 'plancha',
      label: 'Con plancha'
    },{
      value: 'sPlancha',
      label: 'Sin Plancha'
    }]
  }, {
    value: 'prueba',
    label: 'Prueba de Contrato'
  }, {
    value: 'maquila',
    label: 'Maquila'
  }
  
  
];



export default (props)=>(<Cascader options={options} onChange={props.onChange} placeholder = "Seleccione Producto" />)
