import { useContext, FC } from 'react';
import { GetStaticProps } from 'next';
import NextLink from 'next/link';

import {
  Link,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart';
import { CartContext } from '../../context';
import { dbCountries } from '../../database';
import { ICountry } from '../../interfaces';

interface Props {
  countries: ICountry[];
}

const SummaryPage: FC<Props> = ({ countries }) => {
  const { shippingAddress, numberOfItems } = useContext(CartContext);

  if (!shippingAddress) {
    return <></>;
  }

  const {
    address,
    city,
    country,
    firstName,
    lastName,
    phone,
    zip,
    address2 = '',
  } = shippingAddress;

  return (
    <ShopLayout
      title="Resumen de orden"
      pageDescription={'Resumen de la orden'}
    >
      <>
        <Typography variant="h1" component="h1">
          Resumen de la orden
        </Typography>

        <Grid container>
          <Grid item xs={12} sm={7}>
            <CartList />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Card className="summary-card">
              <CardContent>
                <Typography variant="h2">
                  Resumen ({numberOfItems}
                  {numberOfItems === 1 ? ' producto' : ' productos'})
                </Typography>
                <Divider sx={{ my: 1 }} />

                <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle1">
                    Dirección de entrega
                  </Typography>
                  <NextLink href="/checkout/address" passHref>
                    <Link underline="always">Editar</Link>
                  </NextLink>
                </Box>

                <Typography>
                  {firstName} {lastName}
                </Typography>
                <Typography>
                  {address}, {address2 ? address2 : ''}
                </Typography>
                <Typography>
                  {city}, {zip}
                </Typography>
                <Typography>
                  {countries.find((c) => c.code === country)?.name}
                </Typography>
                <Typography>{phone}</Typography>

                <Divider sx={{ my: 1 }} />

                <Box display="flex" justifyContent="end">
                  <NextLink href="/cart" passHref>
                    <Link underline="always">Editar</Link>
                  </NextLink>
                </Box>

                <OrderSummary />

                <Box sx={{ mt: 3 }}>
                  <Button color="secondary" className="circular-btn" fullWidth>
                    Confirmar Orden
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>
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

export default SummaryPage;
