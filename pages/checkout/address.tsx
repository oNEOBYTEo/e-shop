import { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';

import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ICountry } from '../../interfaces';
import { dbCountries } from '../../database';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { CartContext } from '../../context';

interface Props {
  countries: ICountry[];
}

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
};

const getAddressFromCookies = (): FormData => {
  return {
    firstName: Cookies.get('firstName') || '',
    lastName: Cookies.get('lastName') || '',
    address: Cookies.get('address') || '',
    address2: Cookies.get('address2') || '',
    zip: Cookies.get('zip') || '',
    city: Cookies.get('city') || '',
    country: Cookies.get('country') || '',
    phone: Cookies.get('phone') || '',
  };
};

const AddressPage: FC<Props> = ({ countries }) => {
  const router = useRouter();

  const { updateAddress } = useContext(CartContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: getAddressFromCookies(),
  });

  const onSubmit = (data: FormData) => {
    updateAddress(data);

    router.push('/checkout/summary');
  };

  return (
    <ShopLayout
      title="Dirección"
      pageDescription="Confirmar dirección del destino"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h1" component="h1">
          Dirección
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('firstName', {
                required: 'Este campo es requerido',
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              label="Nombre"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('lastName', {
                required: 'Este campo es requerido',
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              label="Apellido"
              variant="filled"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...register('address', {
                required: 'Este campo es requerido',
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
              label="Dirección"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('address2')}
              label="Dirección 2 (opcional)"
              variant="filled"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...register('zip', {
                required: 'Este campo es requerido',
              })}
              error={!!errors.zip}
              helperText={errors.zip?.message}
              label="Código Postal"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('city', {
                required: 'Este campo es requerido',
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
              label="Ciudad"
              variant="filled"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                {...register('country', {
                  required: 'Este campo es requerido',
                })}
                error={!!errors.country}
                key={Cookies.get('country') || countries[0].code}
                defaultValue={Cookies.get('country') || countries[0].code}
                select
                variant="filled"
                label="País"
              >
                {countries.map((country) => (
                  <MenuItem key={country._id} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('phone', {
                required: 'Este campo es requerido',
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              label="Teléfono"
              variant="filled"
              fullWidth
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
          <Button
            type="submit"
            color="secondary"
            className="circular-btn"
            size="large"
          >
            Revisar pedido
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const countries = await dbCountries.getAllCountries();

  if (!countries) {
    return {
      props: {
        countries: [],
      },
    };
  }

  return {
    props: {
      countries,
    },
  };
};

export default AddressPage;
