import React from 'react';
import { act, create } from 'react-test-renderer';
import { useRegister } from '../../../../src/features/auth/hooks/useRegister';

// ─── Helper: render hook via a test component ─────────────────────────────────
let hookResult;

const TestComponent = () => {
  hookResult = useRegister();
  return null;
};

const renderHook = () => {
  act(() => {
    create(<TestComponent />);
  });
};

// Re-read latest state after async actions
const getResult = () => hookResult;

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('useRegister — initial state', () => {
  beforeEach(() => renderHook());

  it('starts with empty fields', () => {
    const r = getResult();
    expect(r.name).toBe('');
    expect(r.phoneNumber).toBe('');
    expect(r.password).toBe('');
    expect(r.confirmPassword).toBe('');
  });

  it('starts with no errors', () => {
    expect(getResult().errors).toEqual({});
  });

  it('starts with passwords hidden', () => {
    expect(getResult().isPasswordVisible).toBe(false);
    expect(getResult().isConfirmPasswordVisible).toBe(false);
  });

  it('starts with terms unchecked', () => {
    expect(getResult().agreedToTerms).toBe(false);
  });

  it('starts not loading and registrationDone false', () => {
    expect(getResult().isLoading).toBe(false);
    expect(getResult().registrationDone).toBe(false);
  });
});

// ─── Field change handlers ────────────────────────────────────────────────────

describe('useRegister — field change handlers', () => {
  beforeEach(() => renderHook());

  it('handleNameChange updates name', () => {
    act(() => getResult().handleNameChange('Nguyen Van A'));
    expect(getResult().name).toBe('Nguyen Van A');
  });

  it('handlePhoneChange updates phoneNumber', () => {
    act(() => getResult().handlePhoneChange('0912345678'));
    expect(getResult().phoneNumber).toBe('0912345678');
  });

  it('handlePasswordChange updates password', () => {
    act(() => getResult().handlePasswordChange('pass1234'));
    expect(getResult().password).toBe('pass1234');
  });

  it('handleConfirmPasswordChange updates confirmPassword', () => {
    act(() => getResult().handleConfirmPasswordChange('pass1234'));
    expect(getResult().confirmPassword).toBe('pass1234');
  });
});

// ─── Visibility toggles ───────────────────────────────────────────────────────

describe('useRegister — visibility toggles', () => {
  beforeEach(() => renderHook());

  it('togglePasswordVisibility flips isPasswordVisible', () => {
    act(() => getResult().togglePasswordVisibility());
    expect(getResult().isPasswordVisible).toBe(true);
    act(() => getResult().togglePasswordVisibility());
    expect(getResult().isPasswordVisible).toBe(false);
  });

  it('toggleConfirmPasswordVisibility flips isConfirmPasswordVisible', () => {
    act(() => getResult().toggleConfirmPasswordVisibility());
    expect(getResult().isConfirmPasswordVisible).toBe(true);
    act(() => getResult().toggleConfirmPasswordVisibility());
    expect(getResult().isConfirmPasswordVisible).toBe(false);
  });

  it('toggleAgreedToTerms flips agreedToTerms', () => {
    act(() => getResult().toggleAgreedToTerms());
    expect(getResult().agreedToTerms).toBe(true);
    act(() => getResult().toggleAgreedToTerms());
    expect(getResult().agreedToTerms).toBe(false);
  });
});

// ─── Validation ───────────────────────────────────────────────────────────────

describe('useRegister — validation on submit with empty fields', () => {
  beforeEach(() => {
    renderHook();
    act(() => { getResult().handleRegister(); });
  });

  it('sets name error when name is empty', () => {
    expect(getResult().errors.name).toBe('Vui lòng nhập họ và tên đầy đủ');
  });

  it('sets phoneNumber error when phone is empty', () => {
    expect(getResult().errors.phoneNumber).toBe('Vui lòng nhập số điện thoại');
  });

  it('sets password error when password is empty', () => {
    expect(getResult().errors.password).toBe('Vui lòng nhập mật khẩu');
  });

  it('sets confirmPassword error when confirmPassword is empty', () => {
    expect(getResult().errors.confirmPassword).toBe('Vui lòng xác nhận mật khẩu');
  });

  it('sets terms error when terms not agreed', () => {
    expect(getResult().errors.terms).toBe('Bạn cần đồng ý với điều khoản để tiếp tục');
  });
});

describe('useRegister — phone number validation', () => {
  beforeEach(() => renderHook());

  it('sets error for phone with wrong prefix', () => {
    act(() => getResult().handlePhoneChange('0112345678'));
    act(() => { getResult().handleRegister(); });
    expect(getResult().errors.phoneNumber).toBe('Số điện thoại không hợp lệ');
  });

  it('sets error for phone shorter than 10 digits', () => {
    act(() => getResult().handlePhoneChange('091234'));
    act(() => { getResult().handleRegister(); });
    expect(getResult().errors.phoneNumber).toBe('Số điện thoại không hợp lệ');
  });

  it('accepts valid Vietnamese phone numbers', () => {
    act(() => getResult().handleNameChange('Test User'));
    act(() => getResult().handlePhoneChange('0912345678'));
    act(() => getResult().handlePasswordChange('pass1234'));
    act(() => getResult().handleConfirmPasswordChange('pass1234'));
    act(() => getResult().toggleAgreedToTerms());
    act(() => { getResult().handleRegister(); });
    expect(getResult().errors.phoneNumber).toBeUndefined();
  });
});

describe('useRegister — password validation', () => {
  beforeEach(() => renderHook());

  it('sets error when password is shorter than 8 characters', () => {
    act(() => getResult().handlePasswordChange('ab1'));
    act(() => { getResult().handleRegister(); });
    expect(getResult().errors.password).toMatch(/8 ký tự/);
  });

  it('sets error when password has no letters', () => {
    act(() => getResult().handlePasswordChange('12345678'));
    act(() => { getResult().handleRegister(); });
    expect(getResult().errors.password).toBeTruthy();
  });

  it('sets error when password has no numbers', () => {
    act(() => getResult().handlePasswordChange('abcdefgh'));
    act(() => { getResult().handleRegister(); });
    expect(getResult().errors.password).toBeTruthy();
  });

  it('accepts password with letters and numbers', () => {
    act(() => getResult().handleNameChange('Test'));
    act(() => getResult().handlePhoneChange('0912345678'));
    act(() => getResult().handlePasswordChange('pass1234'));
    act(() => getResult().handleConfirmPasswordChange('pass1234'));
    act(() => getResult().toggleAgreedToTerms());
    act(() => { getResult().handleRegister(); });
    expect(getResult().errors.password).toBeUndefined();
  });
});

describe('useRegister — confirmPassword validation', () => {
  beforeEach(() => renderHook());

  it('sets error when passwords do not match', () => {
    act(() => getResult().handlePasswordChange('pass1234'));
    act(() => getResult().handleConfirmPasswordChange('pass9999'));
    act(() => { getResult().handleRegister(); });
    expect(getResult().errors.confirmPassword).toBe('Mật khẩu xác nhận không khớp');
  });
});

// ─── Error clearing ───────────────────────────────────────────────────────────

describe('useRegister — errors clear on field change', () => {
  beforeEach(() => {
    renderHook();
    // Trigger all errors first
    act(() => { getResult().handleRegister(); });
  });

  it('clears name error when name changes', () => {
    act(() => getResult().handleNameChange('A'));
    expect(getResult().errors.name).toBeUndefined();
  });

  it('clears phoneNumber error when phone changes', () => {
    act(() => getResult().handlePhoneChange('09'));
    expect(getResult().errors.phoneNumber).toBeUndefined();
  });

  it('clears password error when password changes', () => {
    act(() => getResult().handlePasswordChange('x'));
    expect(getResult().errors.password).toBeUndefined();
  });

  it('clears confirmPassword error when confirmPassword changes', () => {
    act(() => getResult().handleConfirmPasswordChange('x'));
    expect(getResult().errors.confirmPassword).toBeUndefined();
  });

  it('clears terms error when terms are toggled', () => {
    act(() => getResult().toggleAgreedToTerms());
    expect(getResult().errors.terms).toBeUndefined();
  });
});

// ─── Successful registration ──────────────────────────────────────────────────

describe('useRegister — successful registration', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    renderHook();
    act(() => {
      getResult().handleNameChange('Nguyen Van A');
      getResult().handlePhoneChange('0912345678');
      getResult().handlePasswordChange('pass1234');
      getResult().handleConfirmPasswordChange('pass1234');
      getResult().toggleAgreedToTerms();
    });
  });

  afterEach(() => jest.useRealTimers());

  it('sets isLoading true while request is pending', async () => {
    act(() => { getResult().handleRegister(); });
    expect(getResult().isLoading).toBe(true);
  });

  it('sets registrationDone true after successful request', async () => {
    await act(async () => {
      getResult().handleRegister();
      jest.runAllTimers();
    });
    expect(getResult().registrationDone).toBe(true);
    expect(getResult().isLoading).toBe(false);
  });

  it('clears all errors on successful register', async () => {
    await act(async () => {
      getResult().handleRegister();
      jest.runAllTimers();
    });
    expect(getResult().errors).toEqual({});
  });
});
