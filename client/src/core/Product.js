import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import Card from './Card';
import Avatar from '@mui/material/Avatar';
import {deepPurple } from '@mui/material/colors';
import { Typography } from 'antd';

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        console.log(data)
        // fetch related products
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-md-2'></div>
        <div className='col-md-4 col-sm-12'>
          <h4>Product Details</h4>
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
          <h4>Product Feedbacks</h4>
          <div style={{marginBottom: '10px'}}>
          {product && product.feedbacks &&  (
          product.feedbacks.map( feedback =>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '10px', marginLeft: '10px' }}>
            <Avatar sx={{ bgcolor: deepPurple[500], marginRight: '10px' }}>{feedback.uid.name[0]}</Avatar>
            <div>
            <Typography>{feedback.uid.name}</Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '18px' }}>{feedback.comment}</Typography>
            </div>
            </div>
          )
          )}
          </div>
        </div>

        <div className='col-md-4'>
          <h4>Related products</h4>
          {relatedProduct.map((p, i) => (
            <div className='mb-3' key={i}>
              <Card product={p} />
            </div>
          ))}
        </div>
        <div className='col-md-2'></div>
      </div>
    </Layout>
  );
};

export default Product;
