import {AccountBalance, AccountBalanceWallet, Chat, Computer, CreditCard, HomeRounded, List, ListAltRounded, MonetizationOn, Money, Moving, Payments, PriceChange, Savings, SupportAgent, TransferWithinAStation,  } from "@mui/icons-material";
import PeopleIcon from '@mui/icons-material/People'
const iconColor = 'primary'
const iconDropColor = 'success'
export const admin_pages = [
    { name: 'Accueil', link: '/home', icon: <HomeRounded color={iconColor} /> },
    { name: 'Utilisateurs', link: '/users', icon: <PeopleIcon color={iconColor} /> },
    {
        name: 'Comptes', icon: <Savings color={iconColor} />, dropDown: [
            { name: 'Types de compte', link: '/home/account_type', icon: <AccountBalanceWallet color={iconDropColor} /> },
            { name: 'Mes comptes', link: '/home/account', icon: <AccountBalance color={iconDropColor} /> },
        ]
    },
    {
        name: 'Charges', icon: <MonetizationOn color={iconColor} />, dropDown: [
            { name: 'Types de charge', link: '/home/charge_type', icon: <PriceChange color={iconDropColor} /> },
            { name: 'Mes charges', link: '/home/charge', icon: <Payments color={iconDropColor} /> },
        ]
    },
    {
        name: 'Opérations', icon: <Money color={iconColor} />, dropDown: [
            { name: 'Types d\'Opérations ', link: '/home/type_operation', icon: <Moving color={iconDropColor} /> },
            { name: 'Mes crédits', link: '/home/credit', icon: <CreditCard color={iconDropColor}  /> },
            { name: 'Mes transferts', link: '/home/transfer', icon: <TransferWithinAStation color={iconDropColor} /> },
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
