import React, { useState } from 'react';
import { Element, Choice } from '../../models/formInterfaces';
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@mui/material';

interface Props {
  onAddElement: (element: Element) => void;
  existingElements: Element[];
}

const ElementCreator: React.FC<Props> = ({ onAddElement, existingElements }) => {
  const [label, setLabel] = useState('');
  const [type, setType] = useState<'text' | 'checkbox' | 'radio' | 'select'>('text');
  const [options, setOptions] = useState<Choice[]>([]);
  const [isRequired, setIsRequired] = useState(false);

  // Condition fields
  const [enableCondition, setEnableCondition] = useState(false);
  const [conditionTarget, setConditionTarget] = useState('');
  const [conditionValue, setConditionValue] = useState('');

  // Add new element
  const handleAdd = () => {
    const trimmedLabel = label.trim();

    if (!trimmedLabel) {
      alert('Label is required.');
      return;
    }

    const labelAlreadyExists = existingElements.some(
      (el) => el.label.toLowerCase() === trimmedLabel.toLowerCase()
    );
    if (labelAlreadyExists) {
      alert('This label already exists! Please use another label.');
      return;
    }

    const newElement: Element = {
      id: uuidv4(),
      label: trimmedLabel,
      type,
      isRequired,
    };

    if (type === 'radio' || type === 'select') {
      newElement.options = options;
    }

    if (enableCondition && conditionTarget) {
      newElement.condition = {
        targetElementId: conditionTarget,
        valueToMatch: conditionValue,
      };
    }

    onAddElement(newElement);

    setLabel('');
    setType('text');
    setOptions([]);
    setIsRequired(false);
    setEnableCondition(false);
    setConditionTarget('');
    setConditionValue('');
  };

  const handleAddOption = () => {
    const newOption: Choice = {
      id: uuidv4(),
      label: `Option ${options.length + 1}`,
    };
    setOptions((prev) => [...prev, newOption]);
  };

  const handleOptionLabelChange = (id: string, newLabel: string) => {
    setOptions((prev) =>
      prev.map((opt) =>
        opt.id === id ? { ...opt, label: newLabel } : opt
      )
    );
  };

  return (
    <Box sx={{ border: '1px solid #ccc', p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Add a New Element
      </Typography>

      <FormControl fullWidth margin="normal">
        <TextField
          label="Element Label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Type</InputLabel>
        <Select
          value={type}
          label="Type"
          onChange={(e) => {
            const val = e.target.value as 'text' | 'checkbox' | 'radio' | 'select';
            setType(val);
            setOptions([]);
          }}
        >
          <MenuItem value="text">Text</MenuItem>
          <MenuItem value="checkbox">Checkbox</MenuItem>
          <MenuItem value="radio">Radio</MenuItem>
          <MenuItem value="select">Select</MenuItem>
        </Select>
      </FormControl>

      {(type === 'radio' || type === 'select') && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Options</Typography>
          <Button onClick={handleAddOption} sx={{ mb: 1 }}>
            + Add Option
          </Button>
          <ul>
            {options.map((opt) => (
              <li key={opt.id}>
                <TextField
                  size="small"
                  value={opt.label}
                  onChange={(e) =>
                    handleOptionLabelChange(opt.id, e.target.value)
                  }
                />
              </li>
            ))}
          </ul>
        </Box>
      )}

      <FormControlLabel
        control={
          <Checkbox
            checked={isRequired}
            onChange={(e) => setIsRequired(e.target.checked)}
          />
        }
        label="Required?"
      />

      {existingElements.length !== 0 && (<FormControlLabel
        control={
          <Checkbox
            checked={enableCondition}
            onChange={(e) => setEnableCondition(e.target.checked)}
          />
        }
        label="Enable Condition?"
      />)}

      {enableCondition && (
        <Box sx={{ mt: 1, ml: 2 }}>
          <Typography variant="subtitle2">Condition Setup</Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>Target Element Label</InputLabel>
            <Select
              value={conditionTarget}
              label="Target Element Label"
              onChange={(e) => setConditionTarget(e.target.value)}
            >
              {existingElements.map((el) => (
                <MenuItem key={el.id} value={el.label}>
                  {el.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Value to Match"
            value={conditionValue}
            onChange={(e) => setConditionValue(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Box>
      )}

      <Button variant="outlined" onClick={handleAdd} sx={{ mt: 2 }}>
        Add Element
      </Button>
    </Box>
  );
};

export default ElementCreator;
