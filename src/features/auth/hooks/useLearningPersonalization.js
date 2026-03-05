import { useState, useCallback } from 'react';

const SKILL_OPTIONS = [
  { id: 'communication', label: 'Kỹ năng giao tiếp' },
  { id: 'safety', label: 'An toàn cá nhân' },
  { id: 'social', label: 'Hành vi xã hội' },
  { id: 'independence', label: 'Kỹ năng tự lập' },
  { id: 'problem_solving', label: 'Giải quyết vấn đề' },
];

export const useLearningPersonalization = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [done, setDone] = useState(false);

  const toggleSkill = useCallback((id) => {
    setSelectedSkills((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  }, []);

  const handleContinue = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      // await childApi.saveSkills(selectedSkills);
      setDone(true);
    } catch (error) {
      setDone(true); // Non-critical step — proceed even on failure
    } finally {
      setIsLoading(false);
    }
  }, [selectedSkills]);

  const handleSkip = useCallback(() => {
    setDone(true);
  }, []);

  return {
    selectedSkills,
    isLoading,
    done,
    skillOptions: SKILL_OPTIONS,
    toggleSkill,
    handleContinue,
    handleSkip,
  };
};
