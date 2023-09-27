import { useMemo } from 'react';
import PhoneInput from 'react-phone-input-2';

function CustomInputNumber({ field, form, formData, setFormData, startDecorator, ...rest }) {
  return useMemo(() => (
    <PhoneInput
      {...field}
      {...rest}
		country={'ua'}
      onChange={(value) => {
        setFormData({
          ...formData,
          tel: value
        });
        form.setFieldValue(field.name, value);
      }}
    />
  ), [field.name, formData, form, setFormData, startDecorator]);
}

export default CustomInputNumber;