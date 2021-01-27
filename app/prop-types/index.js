import PropTypes from 'prop-types';

export const PTForm = PropTypes.shape({
  getFieldDecorator: PropTypes.func,
  getFieldError: PropTypes.func,
  getFieldsError: PropTypes.func,
  getFieldsValue: PropTypes.func,
  getFieldValue: PropTypes.func,
  isFieldsTouched: PropTypes.func,
  isFieldTouched: PropTypes.func,
  isFieldValidating: PropTypes.func,
  resetFields: PropTypes.func,
  setFields: PropTypes.func,
  setFieldsValue: PropTypes.func,
  validateFields: PropTypes.func,
  validateFieldsAndScroll: PropTypes.func,
});
export default class PropTypes {
}
