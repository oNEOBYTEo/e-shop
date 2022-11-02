import { NextPage } from 'next';
import {
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Box,
  Button,
} from '@mui/material';

import { CardList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';

const CartPage: NextPage = () => {
  return (
    <ShopLayout
      title="Carrito"
      pageDescription="Carrito de compras de la tienda"
    >
      <Typography variant="h1" component="h1">
        Carrito
      </Typography>
      <Grid container>
        <Grid item xs={12} md={7}>
          <CardList editable />
        </Grid>
        <Grid item xs={12} md={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">orden</Typography>
              <Divider sx={{ mt: 1 }} />
              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;
