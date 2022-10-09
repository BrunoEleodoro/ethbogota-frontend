import { IconHeart } from '@tabler/icons';
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
  createStyles,
} from '@mantine/core';
import * as React from 'react';
import { Contract, utils } from 'ethers';
import { useContractFunction } from '@usedapp/core';
import LensHubProxy from '../../assets/abis/LensHubProxy.json';
import { LensHubProxyAddress } from '../../utiils/constants';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

interface BadgeCardProps {
  image: string;
  title: string;
  country: string;
  description: string;
  address: string;
  profileId: number;
  badges: {
    emoji: string;
    label: string;
  }[];
}

export default function ArtistCard({
  image,
  title,
  description,
  country,
  badges,
  profileId,
}: BadgeCardProps) {
  const { classes, theme } = useStyles();

  const mockProfileInterface = new utils.Interface(LensHubProxy);
  const contract = new Contract(LensHubProxyAddress, mockProfileInterface);
  const { state, send } = useContractFunction(contract, 'follow', {
    gasLimitBufferPercentage: 10,
    transactionName: 'follow',
  });

  async function follow() {
    send([profileId], [10]);
  }

  const features = badges.map((badge) => (
    <Badge
      color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}
      key={badge.label}
      leftSection={badge.emoji}
    >
      {badge.label}
    </Badge>
  ));

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={image} alt={title} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group position="apart">
          <Text size="lg" weight={500}>
            {title}
          </Text>
          <Badge size="sm">{country}</Badge>
        </Group>
        <Text size="sm" mt="xs">
          {description}
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Text mt="md" className={classes.label} color="dimmed">
          Perfect for you, if you enjoy
        </Text>
        <Group spacing={7} mt={5}>
          {features}
        </Group>
      </Card.Section>

      <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }}>
          Show details
        </Button>
        <ActionIcon
          variant="default"
          radius="md"
          size={36}
          onClick={() => follow()}
        >
          <IconHeart size={18} className={classes.like} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
}