import React, { useMemo } from 'react';
import { Input } from '@mui/joy';

function CustomInput({ field, form, formData, setFormData, startDecorator, ...rest }) {
  return useMemo(() => (
    <Input
      {...field}
      {...rest}
      onChange={(e) => {
        setFormData({
          ...formData,
          [field.name]: e.target.value
        });
        form.setFieldValue(field.name, e.target.value); // Use formik's setFieldValue method
      }}
      startDecorator={startDecorator}
    />
  ), [field.name, formData, form, setFormData, startDecorator]);
}

export default CustomInput;