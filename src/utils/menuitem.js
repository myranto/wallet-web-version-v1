import {AccountBalance, AccountBalanceWallet, Chat, Computer, HomeRounded, List, ListAltRounded, SupportAgent,  } from "@mui/icons-material";
import PeopleIcon from '@mui/icons-material/People'
export const admin_pages = [
    { name: 'Accueil', link: '/home', icon: <HomeRounded /> },
    { name: 'Utilisateurs', link: '/users', icon: <PeopleIcon /> },
    {
        name: 'Comptes', icon: <Computer />, dropDown: [
            { name: 'Types de compte', link: '/home/acount_type', icon: <AccountBalanceWallet /> },
            { name: 'Mes comptes', link: '/home/account', icon: <AccountBalance /> },
        ]
    },
    { name: 'Very', link: '/index', icon: <Chat /> },
    { name: 'Demandes', link: '/home/request', icon: <ListAltRounded /> },
    {
        name: 'Ordinateur', icon: <Computer />, dropDown: [
            { name: 'Liste ordinateur', link: '/home/desktop', icon: <List /> },
            { name: 'Controle', link: '/home/desktop/controle', icon: <SupportAgent /> },
        ]
    },
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
