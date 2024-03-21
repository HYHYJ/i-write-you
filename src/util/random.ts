export const randomPosition = (number: number) => {
  return Math.floor(Math.random() * number);
};

export const randomColor = (season: string, number: number) => {
  const spring = ['#89CDA9', '#80CA4E', '#2B6519'];
  const summer = ['#FFFFB5', '#F3B0C3', '#FFCCB6'];
  const fall = ['#D94E26', '#E77B31', '#F1B050'];

  switch (season) {
    case 'spring':
      return spring[number];
      break;

    case 'summer':
      return summer[number];
      break;

    case 'fall':
      return fall[number];
      break;

    default:
      return "white";
  }
};