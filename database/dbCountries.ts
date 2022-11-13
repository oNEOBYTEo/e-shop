import { db } from './';
import { Country } from '../models';
import { ICountry } from '../interfaces';

export const getAllCountries = async (): Promise<ICountry | null> => {
  await db.connect();
  const country = await Country.find().select('_id name code').lean();
  await db.disconnect();

  if (!country) {
    return null;
  }

  return JSON.parse(JSON.stringify(country));
};
