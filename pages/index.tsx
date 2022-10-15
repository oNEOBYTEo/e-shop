import type { NextPage } from 'next';
import { ShopLayout } from '../components/layouts';
import Typography from '@mui/material/Typography';

const Home: NextPage = () => {
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
    </ShopLayout>
  );
};

export default Home;
