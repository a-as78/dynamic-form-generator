import * as Yup from 'yup';
import { Form } from '../models/formInterfaces';

export function createValidationSchema(form: Form): Yup.ObjectSchema<any> {
  const shape: Record<string, Yup.Schema<unknown>> = {};

  form.elements.forEach((el) => {
    if (el.type === 'radio' || el.type === 'select' || el.type === 'text') {
        if (el.isRequired) {
          shape[el.id] = Yup.string().required(`${el.label} is required`);
        } else {
          shape[el.id] = Yup.string().notRequired();
        }
      } else if (el.type === 'checkbox') {
      if (el.isRequired) {
        shape[el.id] = Yup.boolean()
          .oneOf([true], `${el.label} is required`)
          .required(`${el.label} is required`);
          
      } else {
        shape[el.id] = Yup.boolean().notRequired();
      }
    }
  });

  return Yup.object().shape(shape);
}
