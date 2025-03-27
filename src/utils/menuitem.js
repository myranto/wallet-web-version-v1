import {Chat, Computer, HomeRounded, List, ListAltRounded, SupportAgent,  } from "@mui/icons-material";
export const admin_pages = [
    { name: 'Accueil', link: '/home', icon: <HomeRounded /> },
    { name: 'Index', link: '/index', icon: <Chat /> },
    { name: 'Demandes', link: '/home/request', icon: <ListAltRounded /> },
    {
        name: 'Ordinateur', icon: <Computer />, dropDown: [
            { name: 'Liste ordinateur', link: '/home/desktop', icon: <List /> },
            { name: 'Controle', link: '/home/desktop/controle', icon: <SupportAgent /> },
        ]
    },
];
