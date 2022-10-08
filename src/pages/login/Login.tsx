import * as React from 'react';
import {
  Anchor,
  Button,
  createStyles,
  Paper,
  Text,
  Title,
} from '@mantine/core';
import heroImage from '../../assets/hero2.png';
import { useConnectWallet } from '../../utiils/wallet-connect';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: 'contain',
    backgroundImage: 'url(' + heroImage + ')',
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: 900,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    width: 120,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

export default function LoginPage() {
  const { classes } = useStyles();
  const { onConnect } = useConnectWallet();
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title
          order={2}
          className={classes.title}
          align="center"
          mt="md"
          mb={50}
        >
          musiqu.eth
        </Title>
        <Button
          fullWidth
          mt="xl"
          size="md"
          onClick={() => {
            onConnect();
          }}
        >
          Login
        </Button>
        <Text align="center" mt="md">
          Don&apos;t have an account?{' '}
          <Anchor<'a'>
            href="#"
            weight={700}
            onClick={(event) => event.preventDefault()}
          >
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
