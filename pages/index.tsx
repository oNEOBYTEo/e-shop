import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '../components/layouts';
import { initialData } from '../database/products';
import { ProductList } from '../components/products';

const HomePage: NextPage = () => {
  return (
    <ShopLayout
      title={'Teslo-Shop - Home'}
      pageDescription={'Encuentra los mejroes productos de Teslo aqui'}
    >
      <Typography variant="h1" color="h1">
        Tienda
      </Typography>
      <Typography
        variant="h1"
        sx={{
          mb: 1,
        }}
      >
        Todos los productos
      </Typography>

      <ProductList products={initialData.products as any} />
    </ShopLayout>
  );
};

export default HomePage;
