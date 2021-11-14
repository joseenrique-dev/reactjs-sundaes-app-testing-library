import React from 'react';
import Options from './entry/Options';

export default function OrderEntry() {
  return (
    <div>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
    </div>
  );
}
