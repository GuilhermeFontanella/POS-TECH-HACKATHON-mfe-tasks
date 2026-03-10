import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setAllSettings } from '../store/settingsSlice';
import { useSettings } from '../hooks/useSettings';

export const SettingsInitializer = () => {
  const { data, isSuccess } = useSettings();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setAllSettings(data));
    }
  }, [isSuccess, data, dispatch]);

  return null;
};