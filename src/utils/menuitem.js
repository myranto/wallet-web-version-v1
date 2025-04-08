import {AccountBalance, AccountBalanceWallet, Chat, Computer, CreditCard, HomeRounded, List, ListAltRounded, MonetizationOn, Money, Moving, Payments, PriceChange, Savings, SupportAgent, TransferWithinAStation,  } from "@mui/icons-material";
import PeopleIcon from '@mui/icons-material/People'
export const admin_pages = [
    { name: 'Accueil', link: '/home', icon: <HomeRounded /> },
    { name: 'Utilisateurs', link: '/users', icon: <PeopleIcon /> },
    {
        name: 'Comptes', icon: <Savings />, dropDown: [
            { name: 'Types de compte', link: '/home/account_type', icon: <AccountBalanceWallet /> },
            { name: 'Mes comptes', link: '/home/account', icon: <AccountBalance /> },
        ]
    },
    {
        name: 'Charges', icon: <MonetizationOn />, dropDown: [
            { name: 'Types de charge', link: '/home/charge_type', icon: <PriceChange /> },
            { name: 'Mes charges', link: '/home/charge', icon: <Payments /> },
        ]
    },
    {
        name: 'Opérations', icon: <Money />, dropDown: [
            { name: 'Types d\'Opérations ', link: '/home/type_operation', icon: <Moving /> },
            { name: 'Mes crédits', link: '/home/credit', icon: <CreditCard /> },
            { name: 'Mes transferts', link: '/home/transfer', icon: <TransferWithinAStation /> },
        ]
    }
];

export const customer_pages = [
    { name: 'Accueil', link: '/home', icon: <HomeRounded /> },
    { name: 'Index', link: '/index', icon: <Chat /> },
    { name: 'Demandes', link: '/home/request', icon: <ListAltRounded /> },
    {
        name: 'Compte', icon: <Computer />, dropDown: [
            { name: 'Création de compte', link: '/home/desktop', icon: <List /> },
            { name: 'Liste des comptes', link: '/home/desktop/controle', icon: <SupportAgent /> },
        ]
    },
    {
        name: 'Charges', icon: <Computer />, dropDown: [
            { name: 'Type de charge', link: '/home/desktop', icon: <List /> },
            { name: 'Gestion des dépenses', link: '/home/desktop/controle', icon: <SupportAgent /> },
        ]
    },
    {
        name: 'crédit', icon: <Computer />, dropDown: [
            { name: 'crédit fixes', link: '/home/desktop', icon: <List /> },
            { name: 'crédit variables', link: '/home/desktop/controle', icon: <SupportAgent /> },
        ]
    },
   
];
