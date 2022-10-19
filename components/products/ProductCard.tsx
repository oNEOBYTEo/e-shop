import { FC, useMemo, useState } from 'react';
import NextLink from 'next/link';

import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@mui/material';

import { IProduct } from '../../interfaces';

import 'animate.css';

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const productImage = useMemo(() => {
    return isHovered
      ? `products/${product.images[1]}`
      : `products/${product.images[0]}`;
  }, [isHovered, product.images]);

  return (
    <Grid
      item
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sm={4}
      xs={6}
    >
      <NextLink href="/product/slug" passHref prefetch={false}>
        <Link></Link>
      </NextLink>
      <Card>
        <CardActionArea>
          <CardMedia
            alt={product.title}
            className={`animate__animated ${
              isHovered ? 'animate__fadeIn' : 'animate__pulse'
            }`}
            component="img"
            image={productImage}
          />
        </CardActionArea>
      </Card>

      <Box sx={{ mt: 1 }} className="fadeIn">
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>{`$${product.price}`}</Typography>
      </Box>
    </Grid>
  );
};
