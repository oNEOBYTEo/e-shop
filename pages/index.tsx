import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '../components/layouts';
import { ProductList } from '../components/products';
import { useProducts } from '../hooks';
import { FullScreenLoading } from '../components/ui';

const HomePage: NextPage = () => {
  const { products, isLoading } = useProducts('/products');

  return (
    <ShopLayout
      title={'Teslo-Shop - Home'}
      pageDescription={'Encuentra los mejores productos de Teslo aqui'}
    >
      <Typography variant="h1" color="h1">
        Tienda
      </Typography>
      <Typography
        variant="h1"
        sx={{
          my: 1,
        }}
      >
        Todos los productos
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default HomePage;
