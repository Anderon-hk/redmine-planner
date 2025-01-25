'use client'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { useState } from 'react';

export type DueDateSetDialogProp = {
  open: boolean;
  handleClose: () => void;
  handleAddDateDropZone: (newKey: string) => void
}

export const DueDateSetDialog = ({open, handleClose, handleAddDateDropZone}: DueDateSetDialogProp ) => {
  const [newDateKey, setNewDateKey] = useState('');
  const closeDialog = () => {
    setNewDateKey('')
    handleClose()
  }
  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Date Drop Zone</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the date for the new Date Drop Zone.
          </DialogContentText>
          <TextField
            label="Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            value={newDateKey}
            onChange={(e) => setNewDateKey(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {handleAddDateDropZone(newDateKey); closeDialog()}} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
  )
}