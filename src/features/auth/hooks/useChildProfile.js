import { useState, useCallback } from 'react';

const AVATAR_OPTIONS = [
  { id: 'rabbit', label: 'Thỏ', emoji: '🐰' },
  { id: 'bear', label: 'Gấu', emoji: '🐻' },
  { id: 'cat', label: 'Mèo', emoji: '🐱' },
  { id: 'dinosaur', label: 'Khủng long', emoji: '🦕' },
];

const GENDER_OPTIONS = [
  { id: 'boy', label: 'Bé trai' },
  { id: 'girl', label: 'Bé gái' },
  { id: 'unspecified', label: 'Không muốn nói' },
];

export const useChildProfile = () => {
  const [childName, setChildName] = useState('');
  const [birthDate, setBirthDate] = useState(null); // Date | null
  const [gender, setGender] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [profileDone, setProfileDone] = useState(false);

  const validate = useCallback(() => {
    const newErrors = {};

    if (!childName.trim()) {
      newErrors.childName = 'Vui lòng nhập tên của bé';
    }

    if (!birthDate) {
      newErrors.birthDate = 'Vui lòng chọn ngày sinh của bé';
    }

    return newErrors;
  }, [childName, birthDate]);

  const handleSave = useCallback(async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const birthDateISO = birthDate.toISOString().split('T')[0]; // YYYY-MM-DD
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // await childApi.createProfile({ childName, birthDate: birthDateISO, gender, avatar: selectedAvatar });
      setProfileDone(true);
    } catch (error) {
      setErrors({ general: 'Không thể tạo hồ sơ. Vui lòng thử lại.' });
    } finally {
      setIsLoading(false);
    }
  }, [validate, birthDate]);

  const handleChildNameChange = useCallback(
    (text) => {
      setChildName(text);
      if (errors.childName) {
        setErrors((prev) => ({ ...prev, childName: undefined }));
      }
    },
    [errors.childName],
  );

  const handleBirthDateChange = useCallback(
    (date) => {
      setBirthDate(date);
      if (errors.birthDate) {
        setErrors((prev) => ({ ...prev, birthDate: undefined }));
      }
    },
    [errors.birthDate],
  );

  const handleGenderSelect = useCallback((id) => {
    setGender(id);
  }, []);

  const handleAvatarSelect = useCallback((id) => {
    setSelectedAvatar(id);
  }, []);

  return {
    childName,
    birthDate,
    gender,
    selectedAvatar,
    errors,
    isLoading,
    profileDone,
    avatarOptions: AVATAR_OPTIONS,
    genderOptions: GENDER_OPTIONS,
    handleChildNameChange,
    handleBirthDateChange,
    handleGenderSelect,
    handleAvatarSelect,
    handleSave,
  };
};
