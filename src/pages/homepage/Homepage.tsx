import * as React from 'react';
import {
  ERC20Interface,
  useCall,
  useContractFunction,
  useEthers,
  useTokenBalance,
} from '@usedapp/core';
import {
  createStyles,
  Navbar,
  TextInput,
  Code,
  UnstyledButton,
  Badge,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  Container,
  AppShell,
} from '@mantine/core';
import {
  IconBulb,
  IconUser,
  IconCheckbox,
  IconSearch,
  IconPlus,
  IconSelector,
} from '@tabler/icons';
import NavbarComponent from './Navbar';
import { create } from 'domain';
import {
  LensHubProxyContract,
  MockProfileCreationProxyContract,
} from '../../utiils/contracts';
import { Contract, utils } from 'ethers';
import LensHubProxy from '../../assets/abis/LensHubProxy.json';
import MockProfileCreationProxy from '../../assets/abis/MockProfileCreationProxy.json';
import { MockProfileCreationProxyAddress } from '../../utiils/constants';
import { Interface } from 'ethers/lib/utils';
import ArtistCard from './ArtistCard';
import maluma from '../../assets/maluma.jpg';
import shakira from '../../assets/shakira.jpg';
import jbalvin from '../../assets/jbalvin.jpg';

const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 0,
  },

  section: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    marginBottom: theme.spacing.md,

    '&:not(:last-of-type)': {
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },
  },

  searchCode: {
    fontWeight: 700,
    fontSize: 10,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },

  mainLinks: {
    paddingLeft: theme.spacing.md - theme.spacing.xs,
    paddingRight: theme.spacing.md - theme.spacing.xs,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    fontSize: theme.fontSizes.xs,
    padding: `8px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  mainLinkInner: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },

  mainLinkBadge: {
    padding: 0,
    width: 20,
    height: 20,
    pointerEvents: 'none',
  },

  collections: {
    paddingLeft: theme.spacing.md - 6,
    paddingRight: theme.spacing.md - 6,
    paddingBottom: theme.spacing.md,
  },

  collectionsHeader: {
    paddingLeft: theme.spacing.md + 2,
    paddingRight: theme.spacing.md,
    marginBottom: 5,
  },

  collectionLink: {
    display: 'block',
    padding: `8px ${theme.spacing.xs}px`,
    textDecoration: 'none',
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },
  inner: {
    position: 'relative',
    paddingTop: 200,
    paddingBottom: 120,

    [BREAKPOINT]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 62,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,

    [BREAKPOINT]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: 24,

    [BREAKPOINT]: {
      fontSize: 18,
    },
  },
}));

const links = [
  { icon: IconBulb, label: 'Activity', notifications: 3 },
  { icon: IconCheckbox, label: 'Tasks', notifications: 4 },
  { icon: IconUser, label: 'Contacts' },
];

const collections = [
  { emoji: '👍', label: 'Sales' },
  { emoji: '🚚', label: 'Deliveries' },
  { emoji: '💸', label: 'Discounts' },
  { emoji: '💰', label: 'Profits' },
  { emoji: '✨', label: 'Reports' },
  { emoji: '🛒', label: 'Orders' },
  { emoji: '📅', label: 'Events' },
  { emoji: '🙈', label: 'Debts' },
  { emoji: '💁‍♀️', label: 'Customers' },
];

export default function HomePage() {
  const { classes } = useStyles();
  const { account } = useEthers();
  const [balance, setBalance] = React.useState(0);

  const mainLinks = links.map((link) => (
    <UnstyledButton key={link.label} className={classes.mainLink}>
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
        <span>{link.label}</span>
      </div>
      {link.notifications && (
        <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
          {link.notifications}
        </Badge>
      )}
    </UnstyledButton>
  ));

  const collectionLinks = collections.map((collection) => (
    <a
      href="/"
      onClick={(event) => event.preventDefault()}
      key={collection.label}
      className={classes.collectionLink}
    >
      <span style={{ marginRight: 9, fontSize: 16 }}>{collection.emoji}</span>{' '}
      {collection.label}
    </a>
  ));

  const mockProfileInterface = new utils.Interface(MockProfileCreationProxy);
  const contract = new Contract(
    '0x420f0257D43145bb002E69B14FF2Eb9630Fc4736',
    mockProfileInterface
  );
  const { state, send } = useContractFunction(contract, 'proxyCreateProfile', {
    gasLimitBufferPercentage: 10,
    transactionName: 'proxyCreateProfile',
  });

  React.useEffect(() => {
    LensHubProxyContract.balanceOf(account).then((balance: any) => {
      console.log('account', account);
      if (account && balance.eq(0)) {
        send([
          account,
          'user_' + Math.floor(100000 + Math.random() * 900000),
          '',
          '0x0000000000000000000000000000000000000000',
          0,
          'ipfs://QmfStdVKxxdAGobur1GARrDKRgv9cUowPXWFStWqiM2moM',
        ]);
      }
    });
  }, [account]);

  return (
    <AppShell
      padding="md"
      header={<NavbarComponent links={[]} />}
      navbar={
        <Navbar
          height={700}
          width={{ sm: 300 }}
          p="md"
          className={classes.navbar}
        >
          <TextInput
            placeholder="Search"
            size="xs"
            icon={<IconSearch size={12} stroke={1.5} />}
            rightSectionWidth={70}
            rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
            styles={{ rightSection: { pointerEvents: 'none' } }}
            mb="sm"
          />

          <Navbar.Section className={classes.section}>
            <div className={classes.mainLinks}>{mainLinks}</div>
          </Navbar.Section>

          <Navbar.Section className={classes.section}>
            <Group className={classes.collectionsHeader} position="apart">
              <Text size="xs" weight={500} color="dimmed">
                Collections
              </Text>
              <Tooltip label="Create collection" withArrow position="right">
                <ActionIcon variant="default" size={18}>
                  <IconPlus size={12} stroke={1.5} />
                </ActionIcon>
              </Tooltip>
            </Group>
            <div className={classes.collections}>{collectionLinks}</div>
          </Navbar.Section>
        </Navbar>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ArtistCard
          address="0x6d79250533C00FBdC8f92d6aB8c32987a4D6F315"
          profileId={18954}
          badges={[]}
          country=""
          image={maluma}
          title="Maluma"
          description=""
        />
        <ArtistCard
          address="0xC3499348beB5679DDF8EC6dB182f7141E2B66D57"
          profileId={18953}
          badges={[]}
          country=""
          image={shakira}
          title="Shakira"
          description=""
        />
        <ArtistCard
          address="0x9e9a2b7687B35bE7008A95b3b6173AA3fa9b4Ea9"
          profileId={18953}
          badges={[]}
          country=""
          image={jbalvin}
          title="J Balvin"
          description=""
        />
      </Group>
    </AppShell>
  );
}
