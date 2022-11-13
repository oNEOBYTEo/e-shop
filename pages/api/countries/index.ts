import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { ICountry } from '../../../interfaces';
import { Country } from '../../../models';

type Data =
  | {
      message: string;
    }
  | ICountry[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getCountries(req, res);

    case 'POST':
      return addCountry(req, res);

    default:
      return res.status(400).json({
        message: 'Bad request',
      });
  }
}

async function getCountries(req: NextApiRequest, res: NextApiResponse<Data>) {
  await db.connect();
  const countries = await Country.find().select('_id name code').lean();
  await db.disconnect();

  if (!countries) {
    return res.status(404).json({
      message: 'No hay productos',
    });
  }

  return res.status(200).json(countries);
}

async function addCountry(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { code = '', name = '' } = req.body as { code: string; name: string };

  if (name.trim().length === 0) {
    return res.status(400).json({
      message: 'El nombre debe tener caracteres',
    });
  }
  if (code.trim().length === 0) {
    return res.status(400).json({
      message: 'El code debe tener caracteres',
    });
  }
  await db.connect();

  const newContry = new Country({
    code: code.toLocaleUpperCase(),
    name: name[0].toUpperCase() + name[1].substring(1).toLowerCase(),
  });

  try {
    await newContry.save({ validateBeforeSave: true });
    await db.disconnect();
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(500).json({
      message: 'Revisar logs del servidor',
    });
  }
}
