import { useMemo } from 'react';
import PhoneInput from 'react-phone-input-2';
import {IFormData, setFormDataType} from '../Header/Header.props';

function CustomInputNumber({ field, form, formData, setFormData, startDecorator, ...rest }: { formData: IFormData; setFormData: setFormDataType, startDecorator: React.ReactElement }) {
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