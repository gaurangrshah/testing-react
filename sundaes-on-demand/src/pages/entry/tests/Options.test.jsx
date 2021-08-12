import {render, screen} from '@testing-library/react'
import Options from "../Options"


test('displays image for each scoop option from server', async() => {
  render(<Options optionType="scoops" />);
  
  // find images
  const scoopImages = await screen.findAllByRole('img', {name: /scoop$/i}) // regex says string must end with 'scoops'
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  // @ts-ignore
  const altText = scoopImages.map((element) => element.alt)
  // toEqual is used to check equalit on arrays and objects. 
  expect(altText).toEqual(['Choclate Scoop', 'Vanilla Scoop'])
});
