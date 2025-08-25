# Dynamic Form Generator

A **React + TypeScript** application that lets you build and render dynamic forms. Form creators can add various field types (text, checkbox, radio, select) and apply conditional display logic.

---


## Features

1. **Form Builder**  
   - Create new forms by adding fields: text, checkbox, radio, or select.  
   - Name your form, preview it before saving.
   - Fields can be marked as *required*.

2. **Conditional Logic**  
   - Show/hide a field based on another field’s value.  
   - The user picks the *target element* by **label** in the UI, but the condition is stored by **ID** internally, ensuring robust references even if labels change.

3. **Validation**  
   - Uses **React Hook Form** with a **Yup** schema builder to validate required fields, checkboxes, etc.  
   - Displays inline error messages for each field.

Link to the deployed project:
https://dynamic-form-generator-eight-peach.vercel.app/

