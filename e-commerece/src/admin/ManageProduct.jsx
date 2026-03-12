
import React, { useState } from 'react'
import axios from '../utils/axiosInstance'
import { useEffect } from 'react'


const ManageProduct = () => {

  const [productName, setproductName] = useState()
  const [productImage, setproductImage] = useState()
  const [productDescription, setproductDescription] = useState()
  const [productPrice, setproductPrice] = useState()
  const [productList, setProductList] = useState()
  const [preview, setPreview] = useState()
  const [editId, setEditId] = useState()

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get("/product/list")

      setProductList(data.productList)
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    //Runs only on the first render
    fetchProduct()
  }, []);

  const handleProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('productName', productName)
    formData.append('productImage', productImage)
    formData.append('productDescription', productDescription)
    formData.append('productPrice', productPrice)


    console.log("productName ===> ", productName)
    console.log("productImage ===> ", productImage)
    console.log("productDescription ===> ", productDescription)
    console.log("productPrice ===> ", productPrice)
    console.log(productImage)
    try {


      if (editId) {

        const { data } = await axios.put(`/product/edit/${editId}`,

          formData
        )
        console.log(data)
        alert(data.message)
      }
      else {

        const { data } = await axios.post(`/product/add`,

          formData
        )
        console.log(data)
        alert(data.message)
      }




      setproductName('')
      setproductImage('')
      setproductDescription('')
      setproductPrice('')
      fetchProduct()
    }
    catch (err) {
      alert(err.response.data.message)
    }
  }

  const handleEdit = (item) => {
    setEditId(item._id)
    setproductName(item.productName)
    setproductDescription(item.productDescription)
    setproductPrice(item.productPrice)
    setPreview(item.productImage)
  }

  const handleDelete = async (id) => {
    try {

      const { data } = await axios.delete(`/product/delete/${id}`)
      console.log(data)
      alert(data.message)
      fetchProduct()

    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <h1 className='text-center'>Manage Product</h1>

          <form onSubmit={handleProduct} className='col-6 justify-content-center '>
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">Product Name</label>
              <input value={productName} type="text" className="form-control" id="exampleFormControlInput1"
                placeholder="Product Name" onChange={(e) => setproductName(e.target.value)} />
            </div>

            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">Product Image</label>
              <input type="file" className="form-control" id="exampleFormControlInput2"
                onChange={(e) => setproductImage(e.target.files[0])} />

              {
                preview &&
                <img width={100} height={100} src={`/upload/${preview}`} alt="" />

              }
            </div>

            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">Product Description</label>
              <input value={productDescription} type="text" className="form-control" id="exampleFormControlInput3"
                onChange={(e) => setproductDescription(e.target.value)} />
            </div>

            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">Product Price</label>
              <input value={productPrice} type="number" className="form-control" id="exampleFormControlInput4"
                onChange={(e) => setproductPrice(e.target.value)} />
            </div>

            <button type='submit' className='btn btn-primary' >{editId ? "Update Product" : "Add Product"}</button>

          </form>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">ProductName</th>
              <th scope="col">ProductDescription</th>
              <th scope="col">ProdutPrice</th>
              <th scope="col">Action</th>

            </tr>
          </thead>
          <tbody>

            {productList == 0 ? <h1>No product Found</h1> :
              productList?.map((item) =>
                <tr key={item._id}>
                  <th scope="row">
                    <img width={100} height={100} src={`/upload/${item.productImage}`} alt="" />
                  </th>
                  <td>{item.productName}</td>
                  <td>{item.productDescription}</td>
                  <td>{item.productPrice}</td>
                  <td>
                    <button className='btn btn-success me-3' onClick={() => handleEdit(item)}>Edit</button>
                    <button className='btn btn-danger' onClick={() => handleDelete(item._id)}>Delete</button>
                  </td>

                </tr>
              )
            }



          </tbody>
        </table>
      </div>

    </>
  )
}

export default ManageProduct