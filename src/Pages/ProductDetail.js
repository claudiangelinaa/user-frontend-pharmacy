import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CardDetailComponent from '../Components/CardDetailComponent'
import { makeStyles } from "@material-ui/core/styles";

const ProductDetail = ({match}) => {

    const [product, setProduct] = useState({})
    // const getDetailProduct = () =>{
    // }
    useEffect(() => {
        // getDetailProduct()
        let idProduct = match.params.id
        axios.get(`http://localhost:5001/obatjadi/${idProduct}`)
        .then((res)=>{
            // console.log(res.data.result[0]);
            setProduct(res.data.result[0])
            // console.log("product:", product);
        })
        .catch(err=>{
            console.log(err);
        })
    }, [])

    // const products = useSelector(state => state.productsReducer)

    return (
        <div>
            {/* {JSON.stringify(product)} */}
            {/* <h1>{product.nama}</h1>   */}
            {/* <CardComponent / */}
            <CardDetailComponent
              id={product.id}
              foto_produk={product.foto_produk}
              nama={product.nama}
              deskripsi={product.deskripsi}
              harga={product.harga}
              kategori={product.category}
              stock={product.stock}
            />
        </div>
    )
}

export default ProductDetail
