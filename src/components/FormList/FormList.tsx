import React from 'react';
import { useFormStore } from '../../store/formStore';
import { Link } from 'react-router-dom';
import { List, ListItemButton, ListItemText, Typography } from '@mui/material';

const FormList: React.FC = () => {
    const forms = useFormStore((state) => state.forms);

  return (
    <List>
        {forms.length === 0 && (
            <Typography>No forms created yet.</Typography>
        )}
        {forms.length !== 0 && forms.map((form) => (
            <ListItemButton component={Link} to={`/forms/${form.id}`} key={form.id}>
            <ListItemText primary={form.name} />
            </ListItemButton>
        ))}
    </List>
  );
};

export default FormList;
