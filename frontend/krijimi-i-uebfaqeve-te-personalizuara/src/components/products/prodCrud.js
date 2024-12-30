import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../../api/products';
import CreateProductForm from './createProduct';
import UpdateProductForm from './updateProduct';
import './prodCrud.css';

const ProductsCRUD = () => {
  const [products, setProducts] = useState([]);
  const[selectedProductId, setSelectedProductId] = useState('');
  const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '', visible: false });

  const fetchProducts = async () => {
    const fetchedProducts = await getProducts({credentials: 'include'});
    setProducts(fetchedProducts);
  };

  const handleDelete = async (productID) => {
    const response = await deleteProduct(productID);
    setNotification({ message: response.message || 'Product deleted successfully', type: 'success', visible: true });
    fetchProducts();
  };

  const handleEdit = (productID) => {
          setSelectedProductId(productID);
          setIsUpdateFormVisible(true);
          setIsCreateFormVisible(false); 
      };
  
      const closeForms = () => {
          setIsCreateFormVisible(false);
          setIsUpdateFormVisible(false);
          setSelectedProductId(null);
      };
  
      const closeNotification = () => {
          setNotification({ ...notification, visible: false });
      };
  
      useEffect(() => {
          fetchProducts();
      }, []);

  return (
    <div className="orders-container">
            <h2>Products Management</h2>
            <button
                className="create-button"
                onClick={() => {
                    setIsCreateFormVisible(true);
                    setIsUpdateFormVisible(false);
                }}
            >
                Create New Product
            </button>

            {isCreateFormVisible && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        {/*<button className="close-button" onClick={closeForms}>
                            &times;
                        </button>*/}
                        <CreateProductForm 
                            onProductCreated={fetchProducts}  
                            closeForm={closeForms}
                            setNotification={setNotification} 
                        />
                    </div>
                </div>
            )}

            {isUpdateFormVisible && selectedProductId && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        {/*<button className="close-button" onClick={closeForms}>
                            &times;
                        </button>*/}
                        <UpdateProductForm
                            productID={selectedProductId} 
                            onProductUpdated={fetchProducts} 
                            closeForm={closeForms} 
                            setNotification={setNotification} 
                        />
                    </div>
                </div>
            )}

            {notification.visible && (
                <div className={`notification ${notification.type}`}>
                    <span>{notification.message}</span>
                    <button className="not-button" onClick={closeNotification}>×</button>
                </div>
            )}

            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Image URL</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length === 0 ? (
                        <tr>
                            <td colSpan="5">No products found</td>
                        </tr>
                    ) : (
                        products.map((product) => (
                            <tr key={product.productID}>
                                <td>{product.productID}</td>
                                <td>{product.productName}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.imageURL}</td>
                                <td>
                                    <button
                                        className="edit-button"
                                        onClick={() => handleEdit(product.productID)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(product.productID)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsCRUD;
