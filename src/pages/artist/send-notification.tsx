import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useContractFunction } from '@usedapp/core';
import { Contract, utils } from 'ethers';
import React from 'react';
import PNSArtists from '../../assets/abis/PNSArtists.json';

export default function SendNotification() {
  const [description, setDescription] = React.useState('');
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      subject: (value) => value.trim().length === 0,
    },
  });

  const epnsContract = '0x3416f37595c745637c3e1eeb390003654a3bb864';
  const wethInterface = new utils.Interface(PNSArtists.abi);
  const contract = new Contract(epnsContract, wethInterface) as any;

  const { state, send } = useContractFunction(contract, 'notify', {
    transactionName: 'Wrap',
    gasLimitBufferPercentage: 10,
  });

  return (
    <form onSubmit={form.onSubmit(() => {})}>
      <Title
        order={2}
        size="h1"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}` })}
        weight={900}
        align="center"
      >
        Get in touch
      </Title>

      <Textarea
        mt="md"
        label="Message"
        placeholder="Your message"
        maxRows={10}
        minRows={5}
        autosize
        name="message"
        variant="filled"
        // {...form.getInputProps('subject')}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Group position="center" mt="xl">
        <Button
          type="submit"
          size="md"
          onClick={() => {
            send('MUSIQUETH', description);
          }}
        >
          Send message
        </Button>
      </Group>
    </form>
  );
}
