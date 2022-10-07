import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import Button from '@mui/material/Button';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getPurchaseHistory } from './apiUser';
import moment from 'moment';
import {Modal, Box, Typography, TextField} from '@mui/material';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const Dashboard = () => {
  const [history, setHistory] = useState([]);


  //Feedback form data
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [comment, setComment] = React.useState("");
  const [commentProduct, setCommentProduct] = React.useState("");

  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const token = isAuthenticated().token;

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const addCommentToProduct = (pid) => {
    axios.post('http://localhost:5000/api/product/addFeedback', {
      uid: _id,
      pid,
      comment
    }).then((res) => {
      if(res.status === 200) {
        setComment("")
        setOpen(false)
        alert("Added feedback successfully!")
      }
    }).catch(err => console.log(err));
  }

  const updateProductStatusToReturned = (orderId, product_s_id) => {
    axios.post('http://localhost:5000/api/order/updateProductStatusToReturned', {
      orderId: orderId,
      product_s_id: product_s_id
    }).then(res => {
      window.location.reload()
      console.log("Updated")
    }).catch(err => console.log(err.message));
  }

  const userLinks = () => {
    return (
      <div className='card'>
        <h4 className='card-header'>User links</h4>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link className='nav-link' to='/cart'>
              My cart
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to={`/profile/${_id}`}>
              Update profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>User information</h3>
        <ul className='list-group'>
          <li className='list-group-item'>{name}</li>
          <li className='list-group-item'>{email}</li>
          <li className='list-group-item'>
            {role === 1 ? 'Admin' : 'Registered user'}
          </li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = (history) => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>Purchase history</h3>
        <ul className='list-group'>
          <li className='list-group-item'>
            {history.slice(0).reverse().map((h, i) => {
              return (
                <div>
                  <hr />
                  <h5>Order Status: {h.status}</h5>
                  <h6>Purchased date: {moment(h.createdAt).fromNow()}</h6>
                  {h.products.map((p, i) => {
                    console.log(p.createdAt);
                    return (
                      <>
                      <div key={i}>
                        <h6>Product name: {p.name}</h6>
                        <h6>Product price: ₹{p.price}</h6>
                        {/* <h6>Purchased date: {moment(p.createdAt).fromNow()}</h6> */}

                      </div>
                      <Button variant="text" onClick={handleOpen}>Give your feedback</Button> <br />
                      {h.status == "Delivered" && p.returned == false &&  p.returnAccepted == false && p.refunded == false ? 
                      <Button onClick={()=>updateProductStatusToReturned(h._id, p._id)} variant="text">Return</Button> : null 
                      }
                      {
                        p.returned == true && p.returnAccepted == false ? <Typography>Return Requested.</Typography> : null
                      }
                      {
                        p.returned == true && p.returnAccepted == true ? <Typography>Return Accepted.</Typography> : null
                      }
                      {
                        p.refunded == true ? <Typography>Price Refunded.</Typography> : null
                      }
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                      
                        <Box sx={style}>
                          <Typography id="modal-modal-title" variant="h6" component="h2">
                            Give your review
                          </Typography>
                          <TextField onChange={(e)=>setComment(e.target.value)} value={comment} sx={{mt: 3, width: '100%'}} multiline rows={4} id="outlined-basic" label="Comment" variant="outlined"></TextField><br />
                          <Button onClick={()=>addCommentToProduct(p._id)} sx={{mt:3, float: 'right'}} variant="contained">Submit</Button>
                        </Box>
                      </Modal>
                      </>
                    );
                  })}
                  <Button onClick={() => window.location.replace(`/user/invoice/${h._id}`)} variant="outlined">Invoice</Button>
                </div>
              );
            })}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title='Dashboard'
      description={`Hello, ${name}`}
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-md-3'>{userLinks()}</div>
        <div className='col-md-9'>
          {userInfo()}
          {purchaseHistory(history)}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
