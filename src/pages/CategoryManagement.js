import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, addCategory, updateCategory, removeCategory } from '../store/categorySlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress } from '@mui/material';

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);
  const status = useSelector((state) => state.categories.status);
  const error = useSelector((state) => state.categories.error);

  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [editingCategory, setEditingCategory] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // Fetch categories when the component mounts
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  // Handle adding a new category
  const handleAddCategory = async () => {
    if (newCategory.name && newCategory.description) {
      await dispatch(addCategory(newCategory)); // Dispatch addCategory action
      setNewCategory({ name: '', description: '' }); // Reset form after adding category
    } else {
      alert("Please fill in both fields.");
    }
  };

  // Handle editing a category
  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategory({ name: category.name, description: category.description });
  };

  // Handle updating an existing category
  const handleUpdateCategory = async () => {
    dispatch(updateCategory({ id: editingCategory.id, updatedCategory: newCategory }));
    setEditingCategory(null);
    setNewCategory({ name: '', description: '' });
  };

  // Handle deleting a category
  const handleDeleteCategory = (id) => {
    setCategoryToDelete(id);
    setOpenDialog(true); // Open confirmation dialog
  };

  const confirmDeleteCategory = async () => {
    dispatch(removeCategory(categoryToDelete)); // Dispatch removeCategory action
    setOpenDialog(false);
    setCategoryToDelete(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog without deleting
    setCategoryToDelete(null);
  };

  return (
    <Container>
      <h2>Category Management</h2>

      {/* Form for adding/editing categories */}
      <TextField
        label="Category Name"
        variant="outlined"
        value={newCategory.name}
        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
      />
      <TextField
        label="Description"
        variant="outlined"
        value={newCategory.description}
        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
      />
      <Button variant="contained" color="primary" onClick={editingCategory ? handleUpdateCategory : handleAddCategory}>
        {editingCategory ? 'Update Category' : 'Add Category'}
      </Button>

      {/* Loading and error messages */}
      {status === 'loading' && <CircularProgress />}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Table to display categories */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(categories) && categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditCategory(category)}>Edit</Button>
                  <Button onClick={() => handleDeleteCategory(category.id)}>Delete</Button>
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
            Are you sure you want to delete the category <strong>{categories.find(category => category.id === categoryToDelete)?.name}</strong> with the description: 
            <em>{categories.find(category => category.id === categoryToDelete)?.description}</em>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteCategory} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CategoryManagement;
