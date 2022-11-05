import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { AuthLayout } from '../../components/layouts';
import { useForm } from 'react-hook-form';
import { validations } from '../../utils';
import { AuthContext } from '../../context';

type FormData = {
  email: string;
  name: string;
  password: string;
};

const RegisterPage = () => {
  const router = useRouter();

  const { registerUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onRegiserForm = async ({ name, password, email }: FormData) => {
    setShowError(false);
    const { hasError, message } = await registerUser(name, email, password);

    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    router.replace('/');
  };

  return (
    <AuthLayout title={'Ingresar'}>
      <form noValidate onSubmit={handleSubmit(onRegiserForm)}>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Crear cuenta
              </Typography>

              <Chip
                label="El email ya existe"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? 'flex' : 'none' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('name', {
                  required: 'Este campo es requerido',
                  minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
                label="Nombre completo"
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('email', {
                  required: 'Este campo es requerido',
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                type="email"
                label="Correo"
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('password', {
                  required: 'Este campo es requerido',
                  minLength: { value: 6, message: 'Mínimo 6 caracteres' },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                label="Contraseña"
                type="password"
                variant="filled"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
                disabled={showError}
              >
                Crear nueva cuenta
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href="/auth/login" passHref>
                <Link underline="always">¿Ya tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
