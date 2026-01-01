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
        title: "Valorant Protocol",
        subtitle: "Valorant",
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
        title: "Abyssal Void Bundle",
        subtitle: "Legendary Bundle",
        price: "₹3,800",
        priceMoney: 3800,
        priceCredits: 4500,
        image: new URL('../assets/images/game1.png', import.meta.url).href,
        type: "Bundle",
        features: [
            "Exclusive Abyssal Void Character Skin",
            "Voidwalker Weapon Camo Pack",
            "Unique 'Darkness' Player Card",
            "10% XP Boost for Season 5"
        ]
    },
    {
        id: 2,
        title: "Phantom Operator",
        subtitle: "Character Skin",
        price: "₹1,200",
        priceMoney: 1200,
        priceCredits: 1500,
        image: new URL('../assets/images/game2.png', import.meta.url).href,
        type: "Skins",
        features: [
            "Tactical Stealth Outfit",
            "Custom Voice Lines",
            "Special Execution Animation"
        ]
    },
    {
        id: 3,
        title: "Neon Demon Katana",
        subtitle: "Melee Skin",
        price: "₹850",
        priceMoney: 850,
        priceCredits: 1000,
        image: new URL('../assets/images/game3.png', import.meta.url).href,
        type: "Skins",
        features: [
            "Reactive Neon Glow Effect",
            "Custom Slash Sound Effects",
            "Cyberpunk Themed Handle"
        ]
    },
    {
        id: 5,
        title: "Logitech G Pro X",
        subtitle: "Gaming Mouse",
        price: "₹12,990",
        priceMoney: 12990,
        priceCredits: 12900,
        image: new URL('../assets/images/mouse.png', import.meta.url).href,
        type: "Gear",
        features: [
            "HERO 25K Sensor",
            "Lightspeed Wireless Technology",
            "Ultra-lightweight detailed design",
            "Pro-grade performance"
        ]
    },
    {
        id: 6,
        title: "Elite Pass Season 5",
        subtitle: "Battle Pass",
        price: "₹2,100",
        priceMoney: 2100,
        priceCredits: 2500,
        image: new URL('../assets/images/valorant-character.png', import.meta.url).href,
        type: "Bundles",
        features: [
            "Unlock 100 Tiers of Rewards",
            "Exclusive Season 5 Skins",
            "Instant Access to Weekly Challenges",
            "500 Bonus Credits"
        ]
    },
    {
        id: 7,
        title: "Dragon's Fury AR Skin",
        subtitle: "Weapon Skin",
        price: "₹950",
        priceMoney: 950,
        priceCredits: 1100,
        image: new URL('../assets/images/game4.png', import.meta.url).href,
        type: "Skins",
        features: [
            "Animated Dragon Scale Pattern",
            "Fire Muzzle Flash Effect",
            "Custom Reload Animation"
        ]
    },
    {
        id: 8,
        title: "Cyber Samurai Bundle",
        subtitle: "Epic Bundle",
        price: "₹2,800",
        priceMoney: 2800,
        priceCredits: 3200,
        image: new URL('../assets/images/game1.png', import.meta.url).href,
        type: "Bundle",
        features: [
            "Cyber Samurai Character Skin",
            "Katana Weapon Pack (3 Variants)",
            "Exclusive Emotes & Sprays",
            "Limited Edition Player Banner"
        ]
    },
    {
        id: 10,
        title: "HyperX Cloud II",
        subtitle: "Gaming Headset",
        price: "₹8,990",
        priceMoney: 8990,
        priceCredits: 8900,
        image: new URL('../assets/images/mouse.png', import.meta.url).href,
        type: "Gear",
        features: [
            "7.1 Surround Sound",
            "Noise-Cancelling Microphone",
            "Memory Foam Ear Cushions",
            "Multi-Platform Compatible"
        ]
    },
    {
        id: 11,
        title: "Venom Strike Pack",
        subtitle: "Rare Bundle",
        price: "₹1,650",
        priceMoney: 1650,
        priceCredits: 1900,
        image: new URL('../assets/images/game2.png', import.meta.url).href,
        type: "Bundle",
        features: [
            "Venom Character Skin",
            "Toxic Weapon Camo",
            "Poison Trail Effect",
            "3 Exclusive Emotes"
        ]
    },
    {
        id: 12,
        title: "Galactic Sniper Rifle",
        subtitle: "Weapon Skin",
        price: "₹1,100",
        priceMoney: 1100,
        priceCredits: 1300,
        image: new URL('../assets/images/game3.png', import.meta.url).href,
        type: "Skins",
        features: [
            "Cosmic Nebula Pattern",
            "Star Trail Bullet Effect",
            "Custom Scope Reticle"
        ]
    },
    {
        id: 14,
        title: "Shadow Assassin",
        subtitle: "Character Skin",
        price: "₹1,350",
        priceMoney: 1350,
        priceCredits: 1600,
        image: new URL('../assets/images/valorant-character.png', import.meta.url).href,
        type: "Skins",
        features: [
            "Stealth Mode Visual Effect",
            "Custom Footstep Sounds",
            "Exclusive Victory Animation"
        ]
    },
    {
        id: 15,
        title: "Razer BlackWidow V3",
        subtitle: "Gaming Keyboard",
        price: "₹14,990",
        priceMoney: 14990,
        priceCredits: 14900,
        image: new URL('../assets/images/mouse.png', import.meta.url).href,
        type: "Gear",
        features: [
            "Mechanical Green Switches",
            "RGB Chroma Lighting",
            "Programmable Macro Keys",
            "Aluminum Construction"
        ]
    },
    {
        id: 16,
        title: "Phoenix Rising Bundle",
        subtitle: "Mythic Bundle",
        price: "₹4,500",
        priceMoney: 4500,
        priceCredits: 5200,
        image: new URL('../assets/images/game4.png', import.meta.url).href,
        type: "Bundle",
        features: [
            "Phoenix Character Skin",
            "Flame Weapon Collection (5 Items)",
            "Rebirth Finisher Animation",
            "Exclusive Phoenix Wings Back Bling",
            "1000 Bonus Credits"
        ]
    },
    {
        id: 17,
        title: "Ice Breaker Shotgun",
        subtitle: "Weapon Skin",
        price: "₹750",
        priceMoney: 750,
        priceCredits: 900,
        image: new URL('../assets/images/game1.png', import.meta.url).href,
        type: "Skins",
        features: [
            "Frozen Crystal Design",
            "Ice Shard Muzzle Flash",
            "Frost Bite Sound Effects"
        ]
    },
];
