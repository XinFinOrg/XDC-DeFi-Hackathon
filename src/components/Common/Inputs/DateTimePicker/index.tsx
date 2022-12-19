import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import styled from 'styled-components';
import './styles.css';

const StyledDateTimePicker = styled(DatePicker).attrs((props) => {
  return {
    dateFormat: props.dateFormat ?? 'MMMM d, yyyy HH:mm',
    showTimeSelect: props.showTimeSelect ?? true,
    placeholderText: props.placeholderText ?? 'MMMM d, yyyy HH:mm',
  };
})`
  width: 100%;
  outline: none;
  padding: 16px;
  white-space: nowrap;
  background-color: black;
  border: none;
  outline: none;
  border-radius: 5px;
  color: ${({ theme }) => theme.text1};
  border-style: solid;
  border: 1px solid ${({ theme }) => theme.bg3};
  -webkit-appearance: none;
  font-size: 18px;

  color-scheme: light;

  ::placeholder {
    color: ${({ theme }) => theme.text3};
  }
  transition: border 100ms;
  :focus {
    border: 1px solid ${({ theme }) => theme.primary1};
    outline: none;
  }
`;

interface DateTimePickerProps extends ReactDatePickerProps {
  onChange: (date: Date | null, event: React.SyntheticEvent<any> | undefined) => void;
}

export default function DateTimePicker({ onChange, ...rest }: DateTimePickerProps) {
  function handleChange(
    date: Date | [Date | null, Date | null] | null,
    event: React.SyntheticEvent<any> | undefined,
  ) {
    onChange(Array.isArray(date) ? null : date, event);
  }

  return <StyledDateTimePicker {...rest} onChange={handleChange} />;
}
