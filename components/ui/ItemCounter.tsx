import { FC } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

interface Props {
  currentValue: number;
  maxValue: number;

  // Methods
  updatedQuantity: (newQuantity: number) => void;
}

export const ItemCounter: FC<Props> = ({
  currentValue,
  maxValue,
  updatedQuantity,
}) => {
  console.log(maxValue);
  return (
    <Box display="flex" alignItems="center">
      <IconButton
        onClick={() => updatedQuantity(currentValue - 1)}
        disabled={currentValue <= 1}
      >
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>
        {currentValue}
      </Typography>
      <IconButton
        onClick={() => updatedQuantity(currentValue + 1)}
        disabled={currentValue >= maxValue}
      >
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
