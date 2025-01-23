import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  RadioGroup,
  FormControl,
  FormLabel,
  Radio,
  Select,
  MenuItem,
} from '@mui/material';
import { Element } from '../../models/formInterfaces';

interface RenderElementProps {
  element: Element;
  errors: any;
  allElements: Element[];
  allValues: Record<string, string | boolean | undefined>;
}

const RenderElement: React.FC<RenderElementProps> = ({
  element,
  errors,
  allElements,
  allValues,
}) => {
  const { register } = useFormContext();

  if (element.condition) {
    const { targetElementId, valueToMatch } = element.condition;
    const targetElement = allElements.find((el) => el.label === targetElementId);
    if (targetElement) {
      const targetValue = allValues[targetElement.id];
      if (targetValue !== valueToMatch) {
        return null;
      }
    }
  }

  const formattedLabel = element.isRequired ? `${element.label} *` : element.label;

  const errorMessage = errors[element.id]?.message;

  return (
    <Box sx={{ mb: 2 }}>
      {element.type === 'text' && (
        <TextField
          label={formattedLabel}
          {...register(element.id)}
          error={Boolean(errorMessage)}
          helperText={errorMessage || ''}
          fullWidth
        />
      )}

      {element.type === 'checkbox' && (
        <>
          <FormControlLabel
            control={<Checkbox {...register(element.id)} />}
            label={formattedLabel}
          />
          {errorMessage && (
            <Typography variant="body2" color="error">
              {errorMessage}
            </Typography>
          )}
        </>
      )}

      {element.type === 'radio' && element.options && (
        <FormControl sx={{ mt: 1 }}>
          <FormLabel>{formattedLabel}</FormLabel>
          <RadioGroup>
            {element.options.map((opt) => (
              <FormControlLabel
                key={opt.id}
                value={opt.label}
                control={<Radio {...register(element.id)} />}
                label={opt.label}
              />
            ))}
          </RadioGroup>
          {errorMessage && (
            <Typography variant="body2" color="error">
              {errorMessage}
            </Typography>
          )}
        </FormControl>
      )}

      {element.type === 'select' && element.options && (
        <FormControl fullWidth sx={{ mt: 1 }}>
          <FormLabel>{formattedLabel}</FormLabel>
          <Select {...register(element.id)} defaultValue="">
            <MenuItem value="">-- Select --</MenuItem>
            {element.options.map((opt) => (
              <MenuItem key={opt.id} value={opt.label}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
          {errorMessage && (
            <Typography variant="body2" color="error">
              {errorMessage}
            </Typography>
          )}
        </FormControl>
      )}
    </Box>
  );
};

export default RenderElement;
