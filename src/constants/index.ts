export const navLinks = [
    { label: 'About', href: '/about' },
    { label: 'Tournaments', href: '/tournaments' },
    { label: 'Leaderboard', href: '/leaderboard' },
    { label: 'Shop', href: '/shop' },
];

export const games = [
    {
        id: 1,
        title: "Blaze Ops Arena",
        subtitle: "Free Fire",
        image: new URL('../assets/images/game1.png', import.meta.url).href,
        entry: "Free",
        mode: "1 V 1",
        prize: "500 💎",
        status: "Live"
    },
    {
        id: 2,
        title: "Last Squad Standing",
        subtitle: "BGMI",
        image: new URL('../assets/images/game2.png', import.meta.url).href,
        entry: "Free",
        mode: "2 V 2",
        prize: "200 💎",
        status: "Live"
    },
    {
        id: 3,
        title: "Call Of Duty : Warzone",
        subtitle: "COD",
        image: new URL('../assets/images/game3.png', import.meta.url).href,
        entry: "Free",
        mode: "2 V 5",
        prize: "700 💎",
        status: "Coming Soon"
    },
    {
        id: 4,
        title: "Legends Arena Clash",
        subtitle: "Apex Legends",
        image: new URL('../assets/images/game4.png', import.meta.url).href,
        entry: "TXN",
        mode: "5 V 5",
        prize: "₹30",
        status: "Coming Soon"
    }
];

export const marketplaceItems = [
    {
        id: 1,
        title: "Gamer Mouse",
        subtitle: "Mouse",
        price: "$22.88",
        image: new URL('../assets/images/mouse.png', import.meta.url).href,
        type: "Gear"
    },
    {
        id: 2,
        title: "Gaming Keyboard",
        subtitle: "Keyboard",
        price: "$30.88",
        image: new URL('../assets/images/mouse.png', import.meta.url).href,
        type: "Gear"
    },
    {
        id: 3,
        title: "Gaming Headset",
        subtitle: "Headset",
        price: "$21.00",
        image: new URL('../assets/images/mouse.png', import.meta.url).href,
        type: "Audio"
    },
    {
        id: 4,
        title: "VR Shellecon",
        subtitle: "Oculus",
        price: "$23.00",
        image: new URL('../assets/images/mouse.png', import.meta.url).href,
        type: "VR"
    },
    {
        id: 5,
        title: "100 BGMI UC",
        subtitle: "Vouchers",
        price: "$26.00",
        image: new URL('../assets/images/mouse.png', import.meta.url).href,
        type: "Currency"
    },
    {
        id: 6,
        title: "Lexma G98",
        subtitle: "Game Controller",
        price: "$29.99",
        image: new URL('../assets/images/mouse.png', import.meta.url).href,
        type: "Gear"
    }
];
