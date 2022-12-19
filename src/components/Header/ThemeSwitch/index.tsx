import { useAppDispatch } from '../../../store';
import { setTheme } from '../../../store/ui/actions';
import { useIsDark } from '../../../store/ui/hooks';
import './style.css';

const ThemeSwitch = () => {
  const isDark = useIsDark();
  const dispatch = useAppDispatch();

  const handleModeSwitch = () => {
    dispatch(setTheme({ isDark: !isDark }));
  };

  return (
    <label id='switch' htmlFor='slider' className='switch'>
      <input type='checkbox' id='slider' checked={!isDark} onChange={handleModeSwitch} />
      <span className='slider round' />
    </label>
  );
};

export default ThemeSwitch;
