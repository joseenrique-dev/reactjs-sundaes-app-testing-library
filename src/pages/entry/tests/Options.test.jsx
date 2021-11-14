import { render, screen } from '@testing-library/react';
import Options from '../Options';

test('display images for each scoop option from server', async () => {
  render(<Options optionType='scoops' />);

  //find the images
  const scoopImages = await screen.findAllByRole('img', {
    name: /scoop$/i,
  });
  expect(scoopImages).toHaveLength(2);

  //confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('displays image for each toppings option from server', async () => {
  render(<Options optionType='toppings' />);

  const images = await screen.findAllByRole('img', { name: /topping$/i });
  expect(images).toHaveLength(3);

  //check the actual alt text for the img
  const imgTitle = images.map((img) => img.alt);
  expect(imgTitle).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ]);
});
