import React, { useMemo, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from '../../models/formInterfaces';
import { Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import RenderElement from './RenderElement';
import { createValidationSchema } from '../../schema/validation'; 

interface FormRendererProps {
  form: Form; 
}

const FormRenderer: React.FC<FormRendererProps> = ({ form }) => {
  const defaultValues = useMemo(() => {
    const values: Record<string, any> = {};
    form.elements.forEach((el) => {
      switch (el.type) {
        case 'checkbox':
          values[el.id] = false;
          break;
        case 'radio':
        case 'select':
          values[el.id] = '';
          break;
        case 'text':
        default:
          values[el.id] = '';
          break;
      }
    });
    return values;
  }, [form.elements]);

  const validationSchema = useMemo(() => createValidationSchema(form), [form]);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit',
  });
  const { handleSubmit, formState, watch, reset } = methods;
  const { errors } = formState;

  const [openDialog, setOpenDialog] = useState(false);

  const onSubmit = (data: any) => {
    console.log('Submitted form data:', data);
    setOpenDialog(true);
    reset();
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
        {form.elements.map((element) => (
          <RenderElement
            key={element.id}
            element={element}
            errors={errors}
            allElements={form.elements}
            allValues={watch()}
          />
        ))}

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>

      <Dialog open={openDialog} onClose={closeDialog}>
        <DialogTitle>Success!</DialogTitle>
        <DialogContent>
          <Typography>Your form has been successfully submitted.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};

export default FormRenderer;
