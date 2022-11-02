import { useContext, useState } from 'react';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { Grid, Box, Typography, Button, Chip } from '@mui/material';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { ProductSlideshow } from '../../components/products';
import { ItemCounter } from '../../components/ui/ItemCounter';
import { SizeSelector } from '../../components/products/SizeSelector';

import { ICartProduct, IProduct, ISize } from '../../interfaces';

import { dbProducts } from '../../database';

import { CartContext } from '../../context';

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const router = useRouter();

  const { addProductToCart } = useContext(CartContext);

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    inStock: product.inStock,
    gender: product.gender,
    quantity: 1,
  });

  const selectedSize = (size: ISize) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      size,
    }));
  };

  const onUpdateQuantity = (newQuantity: number) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      quantity: newQuantity,
    }));
  };

  const onAddProduct = () => {
    if (!tempCartProduct.size) {
      return;
    }
    addProductToCart(tempCartProduct);
    router.push('/cart');
  };

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              {`$${product.price}`}
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>
              <ItemCounter
                currentValue={tempCartProduct.quantity}
                updatedQuantity={onUpdateQuantity}
                maxValue={product.inStock}
              />
              <SizeSelector
                selectedSize={tempCartProduct.size}
                sizes={product.sizes}
                onSelectedSize={selectedSize}
              />
            </Box>
            {product.inStock > 0 ? (
              <Button
                color="secondary"
                className="circular-btn "
                sx={{ my: 1 }}
                onClick={onAddProduct}
              >
                {tempCartProduct.size
                  ? 'Agregar al carrito'
                  : 'Seleccione una talla'}
              </Button>
            ) : (
              <Chip
                label="No hay disponibles"
                color="error"
                variant="outlined"
                sx={{ my: 1 }}
              />
            )}

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Descripción:</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// No usar esto

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { slug = '' } = params as { slug: string };
//   const product = await dbProducts.getProductBySlug(slug);

//   if (!product) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       product,
//     },
//   };
// };

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProducts.getAllProductSlugs();

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};
export default ProductPage;
