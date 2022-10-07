import React, {useEffect, useState} from "react";
import { Col, Divider, Row, Table } from 'antd';
import 'antd/dist/antd.css';
import axios from "axios";
import moment from "moment";


const Invoice = ({ match }) => {

  const [data, setData] = useState(null)
  const [products, setProducts] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    axios.get(`http://localhost:5000/api/order/${match.params.orderId}`)
    .then(response => {
      response.data.data.products.map(product => {
        product.total = product.price * product.count;
      })
      setData(response.data.data);
      console.log(response.data.data);
    })
    .catch(err=>console.error(err));
  }

 

  return(
    <>
    
	<div style={{ padding: 20 }}>
      <Row>
        <Col>
          <Divider>Invoice</Divider>
        </Col>
      </Row>

      <Row gutter={24} style={{ marginTop: 32 }}>
        <Col span={8}>
          <h3>Shubham Hardware & Ply</h3>
          <div>Bus Stand Rd, Jagdeo Nagar,</div>
          <div> Kharkhura, Gaya, </div>
          <div>Bihar 823002</div>
        </Col>
        <Col span={8} offset={8}>
          <table>
            <tr>
              <th>Invoice # :</th>
              <td>{data && data._id}</td>
            </tr>
            <tr>
              <th>Invoice Date :</th>
              <td>	&nbsp; {data && moment(data.createdAt).format('DD-MM-YYYY')}</td>
            </tr>
          </table>
        </Col>
      </Row>

      <Row style={{ marginTop: 48, display: 'flex', flexDirection: 'column' }}>
        <div>Bill To: <strong>{data && data.user.name}</strong></div>
        <div>{data && data.address}</div>
      </Row>


      <Row style={{ marginTop: 48 }}>
        <Table dataSource={
        //   [{
        //     id: 1,
        //     name: 'Accommodation (Single Occupancy)',
        //     description: 'Accommodation',
        //     price: 1599,
        //     quantity: 1
        // }]
        data && data.products
      }
        pagination={false}
        >
          <Table.Column title="Items" dataIndex='name' />
          <Table.Column title="Description" dataIndex='description' />
          <Table.Column title="Quantity" dataIndex='count' />
          <Table.Column title="Price" dataIndex='price' />
          <Table.Column title="Total" dataIndex='total' />
        </Table>
      </Row>

      <Row style={{ marginTop: 48 }}>
        <Col span={8} offset={16}>
          <table>
          <tr>
              <th>Gross Total :</th>
              <td>Rs. {data && data.amount}</td>
            </tr>
            <tr>
              <th>IGST @9% :</th>
              <td>Rs. {data && Math.round(data.amount * 9/100)}</td>
            </tr>
            <tr>
              <th>CGST @9% :</th>
              <td>Rs. {data && Math.round(data.amount * 9/100)}</td>
            </tr>
            <tr>
              <th>Net Total :</th>
              <td>Rs. {data && Math.round(data.amount * 18/100) + data.amount}</td>
            </tr>
          </table>
        </Col>
      </Row>

      {/* <Row style={{ marginTop: 48, textAlign: 'center' }}>
        notes
      </Row>

      <Row style={{ marginTop: 48, textAlign: 'center' }}>
        Footer
      </Row> */}
    </div>
    </>
  )
}
export default Invoice
