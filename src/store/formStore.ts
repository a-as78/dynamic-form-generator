import { create } from 'zustand';
import { Form } from '../models/formInterfaces';
import { v4 as uuidv4 } from 'uuid';

const FORMS_STORAGE_KEY = 'my_dynamic_forms';

interface FormStoreState {
  forms: Form[];
  addForm: (newForm: Form) => void;
  updateForm: (updatedForm: Form) => void;
  getFormById: (formId: string) => Form | undefined;
  loadFormsFromStorage: () => void;
}

export const useFormStore = create<FormStoreState>((set, get) => ({
  forms: [],

  addForm: (newForm: Form) => {
    if (!newForm.id) {
      newForm.id = uuidv4();
    }
    set((state) => {
      const updatedForms = [...state.forms, newForm];
      localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(updatedForms));
      return { forms: updatedForms };
    });
  },

  updateForm: (updatedForm: Form) => {
    set((state) => {
      const updatedForms = state.forms.map((f) =>
        f.id === updatedForm.id ? updatedForm : f
      );
      localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(updatedForms));
      return { forms: updatedForms };
    });
  },

  getFormById: (id: string) => {
    return get().forms.find((f) => f.id === id);
  },

  loadFormsFromStorage: () => {
    const stored = localStorage.getItem(FORMS_STORAGE_KEY);
    if (stored) {
      try {
        const parsed: Form[] = JSON.parse(stored);
        set({ forms: parsed });
      } catch (e) {
        console.error('Failed to parse forms from local storage.', e);
      }
    }
  },
}));
