import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "./wishlistcard";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { makeStyles } from "@material-ui/core/styles";
import Checkout from "./Checkout";
import axios from "axios";
import { API } from "../config";

import Search from "./Search";
import { prices } from "./fixedPrices";
import Copyright from "./Copyright";

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("jwt"))
  );
  useEffect(() => {
    getwishlist();
  }, []);
  console.log(userData.user._id);

  const getwishlist = async () => {
    try {
      await axios
        .get(`${API}/getwishlist/${userData.user._id}`)
        .then((response) => {
          console.log(response);
          setItems(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const showItems = (items) => {
    return (
      
      <div className="row">
        {items.map((product, i) => (
          
          <div className='col-md-4'>
          <Card
            key={i}
            product={product.pid}
            removefromwishlist={removefromwishlist}
            showAddToCartButton={true}
            wishlistUpdate={false}
            showRemoveProductButton={false}
            setRun={setRun}
            run={run}
          />
          </div>
          
        ))}
        </div>
    );
  };

  const removefromwishlist =(pid)=>{
    axios.delete(`${API}/deletewishlist/${userData.user._id}/${pid}`)
    .then(response =>{
     console.log(response)
     getwishlist();
    }).catch(error =>{
     console.log(error)
    })

}


  const noItemsMessage = () => (
    <h2>
      Your wishlist is empty. <br /> <Link to="/shop">Continue shopping</Link>
    </h2>
  );

  return (
    <Layout
      title="Wishlist"
      description="Manage your wislist items. Add remove checkout or continue shopping."
      className="container-fluid"
    >
    <h2>Your wishlist has {`${items.length}`} items</h2>
        <hr />
      
        {items.length > 0 ? showItems(items) : noItemsMessage()}
      <Copyright />
    </Layout>
  );
}
