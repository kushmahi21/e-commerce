import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getProduct, getCategories, updateProduct } from './apiAdmin';
import axios from 'axios';
import { Button } from '@mui/material';

const ManageCategories = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  // load categories and set form data
  const initCategories = () => {
    getCategories().then((data) => {
        setCategories(data);
    });
  };

  useEffect(() => {
    // loadProducts();
    initCategories();
  }, []);

  const deleteCategory = (id) => {
    axios.delete(`http://localhost:5000/api/category/${id}`).then((response) => {
      alert('Deleted');
      console.log(response);
      initCategories();
    }).catch((error) => {
      alert('Error: ' + error.message);
      console.log(error)
    })
  }

  return (
    <Layout
      title='Manage Categories'
      description='Manage Your Categories Name'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-12'>
          <h2 className='text-center'>Total {categories.length} Categories</h2>
          <hr />
          <ul className='list-group'>
            {categories.map((p, i) => (
              <li
                key={i}
                className='list-group-item d-flex justify-content-between align-items-center'
              >
                <strong>{p.name}</strong>
                <Link to={`/admin/category/update/${p._id}`}>
                  <span className='badge badge-warning badge-pill'>Update</span>
                </Link>
                <Button variant="text" onClick={() => deleteCategory(p._id)}>
                    Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageCategories;
