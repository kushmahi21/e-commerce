import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { getProduct, getCategories, updateCategory, getCategory } from './apiAdmin';
import axios from 'axios';

const UpdateCategory = ({ match }) => {

  const [category, setCategory] = useState({});
  const [name , setName] = useState('')

  const { user, token } = isAuthenticated();

  const initCategory = () => {
    getCategory(match.params.categoryId).then((data) => {
      if(data.error) {
        console.log(data.error);
      } else {
        setCategory(data)
        setName(data.name)
      }
    })
  }

  const updateCategoryNow = (e) => {
    e.preventDefault();
    console.log(token)
    axios.put(`http://localhost:5000/api/category/${category._id}`, {name}).then((response) => {
      alert('Category updated successfully')
    }).catch((error) => {
      alert('something went wrong')
      console.log(error)
    })
  }

  useEffect(() => {
    initCategory()
  }, []);

  const newPostForm = () => (
    <form className='mb-3' onSubmit={updateCategoryNow}>

      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          onChange={(e)=>setName(e.target.value)}
          type='text'
          className='form-control'
          value={name}
        />
      </div>

      <button className='btn btn-outline-primary'>Update Category</button>
    </form>
  );



  return (
    <Layout
      title='Update a category'
      description={`G'day ${user.name}, ready to update the category?`}
    >
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          {newPostForm()}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateCategory;
