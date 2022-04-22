import { Checkbox, FormControl, FormControlLabel, FormGroup, Rating } from '@mui/material';
import React, { VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeSelectPriority,
  selectSelectPriority,
} from '../../slices/home/learningEfficiencySlice';

export const PriorityForm: VFC = () => {
  const dispatch = useDispatch();
  const priority = useSelector(selectSelectPriority);
  const { priority1, priority2, priority3, priority4, priority5 } = priority;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeSelectPriority({
        ...priority,
        [event.target.name]: event.target.checked,
      }),
    );
  };

  interface PriorityCheckboxProps {
    priorityName: string;
    priorityChecked: boolean;
    priority: number;
  }

  const PriorityCheckbox: VFC<PriorityCheckboxProps> = (props) => {
    const { priorityName, priorityChecked, priority } = props;
    return (
      <FormControlLabel
        control={<Checkbox checked={priorityChecked} onChange={handleChange} name={priorityName} />}
        label={<Rating name={priorityName} defaultValue={priority} readOnly size='small' />}
      />
    );
  };

  return (
    <FormControl component='fieldset' variant='standard'>
      <FormGroup>
        <PriorityCheckbox priorityName={'priority5'} priorityChecked={priority5} priority={5} />
        <PriorityCheckbox priorityName={'priority4'} priorityChecked={priority4} priority={4} />
        <PriorityCheckbox priorityName={'priority3'} priorityChecked={priority3} priority={3} />
        <PriorityCheckbox priorityName={'priority2'} priorityChecked={priority2} priority={2} />
        <PriorityCheckbox priorityName={'priority1'} priorityChecked={priority1} priority={1} />
      </FormGroup>
    </FormControl>
  );
};
