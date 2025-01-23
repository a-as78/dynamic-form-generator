import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { Form, Element } from '../../models/formInterfaces';
import { useFormStore } from '../../store/formStore';
import ElementCreator from './ElementCreator';

const FormBuilder: React.FC = () => {
  const [formName, setFormName] = useState('');
  const [elements, setElements] = useState<Element[]>([]);
  const { addForm } = useFormStore();

  const [openDialog, setOpenDialog] = useState(false);

  const handleAddElement = (element: Element) => {
    setElements((prev) => [...prev, element]);
  };

  const handleSaveForm = () => {
    if (!formName.trim()) {
      alert('Please provide a form name.');
      return;
    }

    const newForm: Form = {
      id: uuidv4(),
      name: formName,
      elements,
    };
    addForm(newForm);

    setFormName('');
    setElements([]);

    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">Form Builder</Typography>

      <TextField
        label="Form Name"
        value={formName}
        onChange={(e) => setFormName(e.target.value)}
        fullWidth
        margin="normal"
      />

      <ElementCreator onAddElement={handleAddElement} existingElements={elements} />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Preview Elements</Typography>
        <ul>
          {elements.map((el) => (
            <li key={el.id}>
              <strong>{el.label}</strong> ({el.type}){' '}
              {el.isRequired ? 'Required' : 'Optional'}
              {el.options && el.options.length > 0 && (
                <>
                  {' '}
                  | Options:{' '}
                  {el.options.map((opt) => opt.label).join(', ')}
                </>
              )}
              {el.condition && (
                <>
                  {' '}
                  | Condition: show if{' '}
                  <em>{el.condition.targetElementId}</em> ={' '}
                  {String(el.condition.valueToMatch)}
                </>
              )}
            </li>
          ))}
        </ul>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveForm}
        sx={{ mt: 2 }}
      >
        Save Form
      </Button>

      <Dialog open={openDialog} onClose={closeDialog}>
        <DialogTitle>Form Saved</DialogTitle>
        <DialogContent>
          <Typography>The form has been saved successfully!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FormBuilder;
