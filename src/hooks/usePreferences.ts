import { useSelector, useDispatch } from 'react-redux';

import { updateSetting } from '../store/settingsSlice';
import type { RootState } from '../store';

export const usePreferences = () => {

  const preferences = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();

  const setPreferences = (value: any) => {
    dispatch(updateSetting(value));

    const event = new CustomEvent('settingsChanged', {
      detail: { value }
    });

    window.dispatchEvent(event);
  };

  return { preferences, setPreferences };
};