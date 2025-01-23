import React from 'react';
import { useParams } from 'react-router-dom';
import { useFormStore } from '../../store/formStore';
import FormRenderer from './FormRenderer';
import { Typography } from '@mui/material';

const FormViewer: React.FC = () => {
  const { id } = useParams();
  const { getFormById } = useFormStore();

  const form = id ? getFormById(id) : undefined;

  if (!form) {
    return <Typography>Form not found.</Typography>;
  }

  return <FormRenderer form={form} />;
};

export default FormViewer;
