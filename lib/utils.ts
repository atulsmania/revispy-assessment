import { faker } from '@faker-js/faker';

export const generateFakerProducts = async () => {
  return await Promise.all(
    Array.from({ length: 60 }, () => ({
      name: faker.word.noun(),
      selected: false,
    }))
  );
};
