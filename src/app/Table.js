import React from 'react'
import ProductoDD from './producto-dd'
import './App.css';
import ServicioDD from './servicio-dd'
import {
  Table, Input, Button, Popconfirm, Form, InputNumber, Icon, Tooltip
} from 'antd';
import Footer from './footer'

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  }

  componentDidMount() {
    if (this.props.editable) {
      document.addEventListener('click', this.handleClickOutside, true);
    }
  }
  componentWillReceiveProps(nextProps){
    if(this.props.editable !== nextProps.editable){
      if (nextProps.editable) {
        document.addEventListener('click', this.handleClickOutside, true);
      }
    }
  }
  componentWillUnmount() {
    if (this.props.editable) {
      document.removeEventListener('click', this.handleClickOutside, true);
    }
  }


  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  }

  handleClickOutside = (e) => {
    const { editing } = this.state;
    if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
      this.save();
    }
    this.cell.blur()
    
  }

  save = () => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  }

  render() {
    const { editing } = this.state;
    const {
      editable,
      numeric,
      dataIndex,
      title,
      record,
      index,
      isPlate,
      handleSave,
      ...restProps
    } = this.props;
    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        { editable  ? 
          (
            <EditableContext.Consumer>
              {(form) => {
                this.form = form;
                return (
                  editing ? (
                    <FormItem style={{ margin: 0 }}>
                      {form.getFieldDecorator(dataIndex, {
                        rules: [{
                          required: true,
                          message: `${title} es obligatorio.`,
                        }],
                        initialValue: record[dataIndex],
                      })(numeric ?
                        <InputNumber
                          ref={node => (this.input = node)}
                          onPressEnter={this.save}
                        /> : 
                        <Input
                          ref={node => (this.input = node)}
                          onPressEnter={this.save}
                        />

                      )}
                    </FormItem>
                  ) : (
                    <div
                      className="editable-cell-value-wrap"
                      style={{ paddingRight: 24 }}
                      onClick={this.toggleEdit}
                    >
                      {restProps.children}
                    </div>
                  )
                );
              }}
            </EditableContext.Consumer>
          )
          : restProps.children}
      </td>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      count: 0,
      trm: 2956.43,
      isPlate: false,
      has2D: false
    };
    this.columns = [{
      title: 'Item',
      dataIndex: 'item',
      width: '10%',
      numeric: false,
      disabled: true,
      editable: false,
    },{
      title: 'Producto',
      dataIndex: 'producto',
      width: '55%',
      numeric: false,
      render:(text ,record) => (<ProductoDD onChange= {(value)=>this.handleProductChange(value, record) }/>)
    }, {
      title: 'Servicio',
      dataIndex: 'servicio',
      width: '55%',
      numeric: false,
      editable: false,
      render: (text, record) =><ServicioDD onChange = { (value)=>this.handleServiceChange(value, record)}  disabled = {this.state.isPlate}/>
    },{
      title: 'Referencia',
      dataIndex: 'referencia',
      width: '50%',
      numeric: false,
      editable: true,
    }, {
      title: 'Cantidad',
      dataIndex: 'cantidad',
      width: '30%',
      editable: true,
      numeric: true,
    }, {
      title: 'Ancho',
      dataIndex: 'ancho',
      width: '30%',
      numeric: true,
      editable:  true,
    }, {
      title: 'Largo',
      dataIndex: 'largo',
      width: '30%',
      numeric: true,
      editable: true,
    }, {
      title: 'Área',
      dataIndex: 'area',
      width: '30%',
      numeric: true,
      editable: false,
    }, {
      title: 'Valor Unitario',
      dataIndex: 'v_unitario',
      width: '30%',
      numeric: true,
      editable: false,
    }, {
      title: 'TRM',
      dataIndex: 'trm',
      width: '30%',
      editable: false,
      numeric: true,
    }, {
      title: 'Total',
      dataIndex: 'total',
      width: '30%',
      editable: false,
      numeric: false,
    }, {
      title: '',
      dataIndex: 'operation',
      numeric: false,
      render: (text, record) => (
        this.state.dataSource.length >= 1
          ? (
            <Popconfirm title="¿Seguro quiere borrar este producto?"
                        onConfirm={() => this.handleDelete(record.key)}>
              <Button><Icon type="delete" /></Button>
            </Popconfirm>
          ) : null
      ),
    }];
  }



  handleProductChange = (value, record) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => record.key === item.key);
    
    const item = newData[index]
    record['producto'] = value
    
    newData.splice(index, 1, {
      ...item,
      ...record,
    });
    this.setState({ dataSource: newData });
  }

  handleServiceChange = (value, record) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => record.key === item.key);
    
    const item = newData[index]
    record['servicio'] = value
    
    newData.splice(index, 1, {
      ...item,
      ...record,
    });
    this.setState({ dataSource: newData });
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      item: `0${count}`,
      producto: '',
      servicio: '',
      referencia: `Ref. ${count}`,
      cantidad:  0 ,
      ancho: 0 ,
      largo: 0,
      area: 0,
      v_unitario: 0,
      trm: `${0}%`,
      total: 0
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
    //console.log(dataSource)
  }

  check2D = ( product ) => {
    let has2D =[
      ['fotopolimero','convencional'],
      ['fotopolimero','digital'],
      ['fotopolimero','grafiexpress'],
      ['pelicula'],
      ['maquila'], 
      ['prueba']
    ]
    for(let i = 0; i < has2D.length;i++){
      if (has2D[i][0]=== product){
        return true
      }
    }
    return false
  }
  
  toggleEditable = (row, col) => {
    if (col.dataIndex=== 'ancho' || col.dataIndex === 'largo'){
      return this.check2D(row.producto[0])
    }
    else if (col.dataIndex === 'cantidad' || col.dataIndex === 'referencia'){
      return true
    }
  }
  parser = (value)=>{
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g,',')
  }
  onTrmChange = (value) => {
    this.setState({trm: value})
  }
  applyTRM = (product) =>{ 
    let applyTrm =[
      ['fotopolimero','convencional'],
      ['fotopolimero','digital'],
      ['fotopolimero','grafiexpress'],
    ]
    for(let i = 0; i < applyTrm.length;i++){
      if (applyTrm[i][0] === product){
        return true
      }
    }
    return false
  }

  recalculateData = (item) => {
    console.log(JSON.stringify(item.producto))

    let precios = {
                  '["fotopolimero","convencional"]':70,
                  '["fotopolimero","digital"]':98,
                  '["fotopolimero","grafiexpress"]':112,
                  '["pelicula"]':12,
                  '["maquila"]':45,
                  '["arte","sPlancha"]':40000,
                  '["arte","plancha"]':40000,   
                  '["montaje","plancha"]':0,
                  '["montaje","sPlancha"]':20000,
                  '["prueba"]':22
                };
    let descuentos = {
      '["copiado"]': 0.15,
      '["openprint","<=3devoluciones"]': 0.13,
      '["openprint",">3devoluciones"]': 0.10,
      '["<3colores"]': 0.08,
      '["policromia"]': 0 
    }
  
    item['area'] = item.ancho*item.largo*item.cantidad

    let unitarioInt = precios[JSON.stringify(item.producto)] 
    
    if(item.producto[0] === 'fotopolimero'){
     unitarioInt = unitarioInt - (unitarioInt*descuentos[JSON.stringify(item.servicio)]) 
    }
    if(item.producto[1]==='convencional' && item.servicio[0] === 'copiado'){
      unitarioInt = 65
    }

    item['v_unitario'] = this.parser(unitarioInt.toFixed(1))

    let trmInt = this.applyTRM(item.producto[0]) ? (((this.state.trm/2956.43)-1)/2).toFixed(4) : 0
    item['trm'] = `${trmInt*100}%`

    let totalInt = this.check2D(item.producto[0]) ? 
                    unitarioInt * item.area 
                  : unitarioInt * item.cantidad
    
    if ( trmInt !== 0 ){
      totalInt = totalInt + ( totalInt * trmInt )
    }
  
    item['total'] = this.parser(totalInt.toFixed(1).toString())

    return item
  }

  handleSave =  (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    
    const item = newData[index]
    row = this.recalculateData(row)
    
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  }

  toggleOptions = (isPlate) => {
    console.log('toggleOptions')
    this.setState({ isPlate });
  }
  handleRefresh = (row) => {
    console.log("Refresh")
  }
  render() {
    const { dataSource } = this.state;

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col, index, dataSource) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: record => ({
          record,
          numeric: col.numeric,
          editable: this.toggleEditable(record, col) && col.editable,
          dataIndex: col.dataIndex,
          isPlate : this.state.isPlate,
          title: col.title,
          handleSave: this.handleSave
        }),
      };
    }, this);
   // console.log(columns)

    return (
      <div style = {{width:'100%'}}>
        <div className = "controls">
          <Tooltip placement="top" title={"Agregar nuevo producto"}>
            <Button onClick={this.handleAdd} type="primary" >
              Agregar Producto
            </Button>
          </Tooltip>
          <Tooltip placement="top" title={"Actualizar precios"}>
            <Button onClick={this.handleRefresh} style={{padding: "0px 0px 0px 0px",}}> 
              <Icon type="interation"  style={{margin: "0px 0px 0px 0px", fontSize: "30px"}}/>
            </Button>
          </Tooltip>
          <Tooltip placement="top" title="Exportar a PDF">
            <Button onClick={this.handleExport} style={{padding: "0px 0px 0px 0px",}}>
              <Icon type="file-pdf"  style={{margin: "0px 0px 0px 0px", fontSize: "30px"}} />          
            </Button>
          </Tooltip>
          <div>
            <h2 style = {{marginRight: "30px", marginBottom:'0px', color: 'dimGray'}}>TRM mes anterior: </h2>
            <InputNumber
              defaultValue={2956.43}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              onChange={this.onTrmChange}
              addOnBefore = {'TRM Promedio Mes Anterior'}
            />
          </div>
        </div>
        
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          dataSource={dataSource}
          columns={columns}
          size = {'small'}
          footer={()=><Footer data={this.state.dataSource}/>}
          pagination = { false }
        />
      </div>
    );
  }
}

export default EditableTable