import React from 'react';
import { act, create } from 'react-test-renderer';
import RegisterForm from '../../../../src/features/auth/components/RegisterForm';

// ─── Mocks ────────────────────────────────────────────────────────────────────

jest.mock('react-native-vector-icons/FontAwesome', () => {
  const { View } = require('react-native');
  return ({ name, testID }) => <View testID={testID ?? `icon-${name}`} />;
});

// ─── Default props ────────────────────────────────────────────────────────────

const defaultProps = {
  name: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
  isPasswordVisible: false,
  isConfirmPasswordVisible: false,
  agreedToTerms: false,
  errors: {},
  isLoading: false,
  onSubmit: jest.fn(),
  onNameChange: jest.fn(),
  onPhoneChange: jest.fn(),
  onPasswordChange: jest.fn(),
  onConfirmPasswordChange: jest.fn(),
  onTogglePassword: jest.fn(),
  onToggleConfirmPassword: jest.fn(),
  onToggleTerms: jest.fn(),
};

const renderForm = (props = {}) => {
  let renderer;
  act(() => {
    renderer = create(<RegisterForm {...defaultProps} {...props} />);
  });
  return renderer;
};

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('RegisterForm — rendering', () => {
  it('renders without crashing', () => {
    expect(() => renderForm()).not.toThrow();
  });

  it('renders name field with placeholder text', () => {
    const renderer = renderForm();
    const json = JSON.stringify(renderer.toJSON());
    expect(json).toContain('VD: Nguyễn Văn A');
  });

  it('renders phone field with placeholder text', () => {
    const renderer = renderForm();
    const json = JSON.stringify(renderer.toJSON());
    expect(json).toContain('VD: 0912345678');
  });

  it('renders password field with placeholder text', () => {
    const renderer = renderForm();
    const json = JSON.stringify(renderer.toJSON());
    expect(json).toContain('Ít nhất 8 ký tự, gồm chữ và số');
  });

  it('renders confirm password field with placeholder text', () => {
    const renderer = renderForm();
    const json = JSON.stringify(renderer.toJSON());
    expect(json).toContain('Nhập lại mật khẩu');
  });

  it('renders submit button with correct label', () => {
    const renderer = renderForm();
    const json = JSON.stringify(renderer.toJSON());
    expect(json).toContain('Tiếp tục');
  });

  it('renders terms checkbox text', () => {
    const renderer = renderForm();
    const json = JSON.stringify(renderer.toJSON());
    expect(json).toContain('Điều khoản');
    expect(json).toContain('Chính sách bảo mật');
  });
});

// ─── Field values ─────────────────────────────────────────────────────────────

describe('RegisterForm — displays prop values', () => {
  it('displays provided name value', () => {
    const renderer = renderForm({ name: 'Nguyen Van A' });
    const json = JSON.stringify(renderer.toJSON());
    expect(json).toContain('Nguyen Van A');
  });

  it('displays provided phone value', () => {
    const renderer = renderForm({ phoneNumber: '0912345678' });
    const json = JSON.stringify(renderer.toJSON());
    expect(json).toContain('0912345678');
  });
});

// ─── Error messages ───────────────────────────────────────────────────────────

describe('RegisterForm — error messages', () => {
  it('shows general error when provided', () => {
    const renderer = renderForm({
      errors: { general: 'Đăng ký thất bại. Vui lòng thử lại.' },
    });
    const json = JSON.stringify(renderer.toJSON());
    expect(json).toContain('Đăng ký thất bại');
  });

  it('shows name error when provided', () => {
    const renderer = renderForm({
      errors: { name: 'Vui lòng nhập họ và tên đầy đủ' },
    });
    const json = JSON.stringify(renderer.toJSON());
    expect(json).toContain('Vui lòng nhập họ và tên đầy đủ');
  });

  it('shows phone error when provided', () => {
    const renderer = renderForm({
      errors: { phoneNumber: 'Số điện thoại không hợp lệ' },
    });
    const json = JSON.stringify(renderer.toJSON());
    expect(json).toContain('Số điện thoại không hợp lệ');
  });

  it('shows password error when provided', () => {
    const renderer = renderForm({
      errors: { password: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ và số' },
    });
    const json = JSON.stringify(renderer.toJSON());
    expect(json).toContain('Mật khẩu phải có ít nhất 8 ký tự');
  });

  it('shows confirmPassword error when provided', () => {
    const renderer = renderForm({
      errors: { confirmPassword: 'Mật khẩu xác nhận không khớp' },
    });
    const json = JSON.stringify(renderer.toJSON());
    expect(json).toContain('Mật khẩu xác nhận không khớp');
  });

  it('shows terms error when provided', () => {
    const renderer = renderForm({
      errors: { terms: 'Bạn cần đồng ý với điều khoản để tiếp tục' },
    });
    const json = JSON.stringify(renderer.toJSON());
    expect(json).toContain('Bạn cần đồng ý với điều khoản để tiếp tục');
  });

  it('does not show error text when no errors', () => {
    const renderer = renderForm({ errors: {} });
    const json = JSON.stringify(renderer.toJSON());
    expect(json).not.toContain('Vui lòng nhập họ');
    expect(json).not.toContain('không hợp lệ');
  });
});

// ─── Checkbox state ───────────────────────────────────────────────────────────

describe('RegisterForm — terms checkbox', () => {
  it('does not render check icon when unchecked', () => {
    const renderer = renderForm({ agreedToTerms: false });
    const checkIcons = renderer.root.findAllByProps({ testID: 'icon-check' });
    expect(checkIcons).toHaveLength(0);
  });

  it('renders check icon when agreedToTerms is true', () => {
    const renderer = renderForm({ agreedToTerms: true });
    const checkIcons = renderer.root.findAllByProps({ testID: 'icon-check' });
    expect(checkIcons.length).toBeGreaterThan(0);
  });
});

// ─── Callbacks ────────────────────────────────────────────────────────────────

describe('RegisterForm — callbacks', () => {
  afterEach(() => jest.clearAllMocks());

  it('calls onToggleTerms when terms row is pressed', () => {
    const onToggleTerms = jest.fn();
    const renderer = renderForm({ onToggleTerms });
    const termsRow = renderer.root.findByProps({
      accessibilityLabel: 'Đồng ý điều khoản và chính sách bảo mật',
    });
    act(() => termsRow.props.onPress());
    expect(onToggleTerms).toHaveBeenCalledTimes(1);
  });

  it('calls onTogglePassword when eye button is pressed', () => {
    const onTogglePassword = jest.fn();
    const renderer = renderForm({ onTogglePassword });
    const eyeButton = renderer.root.findByProps({
      accessibilityLabel: 'Hiện mật khẩu',
    });
    act(() => eyeButton.props.onPress());
    expect(onTogglePassword).toHaveBeenCalledTimes(1);
  });

  it('calls onToggleConfirmPassword when confirm eye button is pressed', () => {
    const onToggleConfirmPassword = jest.fn();
    const renderer = renderForm({ onToggleConfirmPassword });
    const eyeButton = renderer.root.findByProps({
      accessibilityLabel: 'Hiện xác nhận mật khẩu',
    });
    act(() => eyeButton.props.onPress());
    expect(onToggleConfirmPassword).toHaveBeenCalledTimes(1);
  });
});
