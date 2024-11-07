import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, removeProduct } from '../store/productSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress } from '@mui/material';

const ProductManagement = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  const [newProduct, setNewProduct] = useState({ title: '', price: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Fetch products when the component mounts
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  // Handle adding a new product
  const handleAddProduct = async () => {
    if (newProduct.title && newProduct.price) {
      await dispatch(addProduct(newProduct)); // Dispatch addProduct action
      setNewProduct({ title: '', price: '' }); // Reset form after adding product
    } else {
      alert("Please fill in both fields.");
    }
  };

  // Handle editing a product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({ title: product.title, price: product.price });
  };

  // Handle updating an existing product
  const handleUpdateProduct = async () => {
    dispatch(updateProduct({ id: editingProduct.id, updatedProduct: newProduct }));
    setEditingProduct(null);
    setNewProduct({ title: '', price: '' });
  };

  // Handle deleting a product
  const handleDeleteProduct = (id) => {
    setProductToDelete(id);
    setOpenDialog(true); // Open confirmation dialog
  };

  const confirmDeleteProduct = async () => {
    dispatch(removeProduct(productToDelete)); // Dispatch removeProduct action
    setOpenDialog(false);
    setProductToDelete(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog without deleting
    setProductToDelete(null);
  };

  return (
    <Container>
      <h2>Product Management</h2>

      {/* Form for adding/editing products */}
      <TextField
        label="Title"
        variant="outlined"
        value={newProduct.title}
        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
      />
      <TextField
        label="Price"
        variant="outlined"
        type="number"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
      />
      <Button variant="contained" color="primary" onClick={editingProduct ? handleUpdateProduct : handleAddProduct}>
        {editingProduct ? 'Update Product' : 'Add Product'}
      </Button>

      {/* Loading and error messages */}
      {status === 'loading' && <CircularProgress />}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Table to display products */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(products) && products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditProduct(product)}>Edit</Button>
                  <Button onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteProduct} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductManagement;
