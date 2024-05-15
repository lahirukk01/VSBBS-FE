import {TScope} from '~/components/AuthForm/types.ts';

export const SCOPE: { [key: string]: TScope } = {
  CUSTOMER: 'CUSTOMER',
  MANAGER: 'MANAGER',
};

type TRoutes = {
  [key in TScope]: {
    HOME: string;
    // PROFILE: string;
    ACCOUNTS?: string;
    BENEFICIARIES: string;
    LOANS: string;
  };
};

export const ROUTE_BUILDER: TRoutes = {
  MANAGER: {
    HOME: '/manager/home',
    // PROFILE: '/manager/profile',
    BENEFICIARIES: '/manager/beneficiaries',
    LOANS: '/manager/loans',
  },
  CUSTOMER: {
    HOME: '/customer/home',
    // PROFILE: '/customer/profile',
    ACCOUNTS: '/customer/accounts',
    BENEFICIARIES: '/customer/beneficiaries',
    LOANS: '/customer/loans',
  },
};
