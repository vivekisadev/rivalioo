
import ffImage from '../assets/images/ff.png';
import bgmiImage from '../assets/images/bgmi.png';
import codImage from '../assets/images/cod.png';
import valorantImage from '../assets/images/valorant.png';

export interface Player {
    rank: number;
    name: string;
    score: string;
    region: string;
    img: string;
    gameIcon?: string;
    wins?: number;
    matches?: number;
    kd?: number;
    winRate?: string;
    color?: string; // For gradients/effects
}

import { supabase } from '../lib/supabase';

// Helper to map DB user to Player interface
const mapUserToPlayer = (user: any, index: number): Player => {
    const stats = user.trophies || {};
    return {
        rank: stats.rank || index + 1,
        name: user.name || user.username,
        score: stats.score || "0 RP",
        region: "Global", // Default for now
        img: user.profile_picture_url || "https://i.pravatar.cc/150",
        gameIcon: bgmiImage, // Default icon, logic can be improved
        wins: stats.wins || 0,
        matches: stats.matches || 0,
        kd: stats.kd || 0,
        winRate: stats.winRate || "0%",
        color: index === 0 ? "from-[#2FE9A9] to-[#00C6FF]" :
            index === 1 ? "from-[#FF5E3A] to-[#FF2E00]" :
                "from-[#00C6FF] to-[#0072FF]"
    };
};

export const fetchLeaderboard = async (): Promise<Player[]> => {
    if (!supabase) return LEADERBOARD_DATA;

    const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('trophies->score', { ascending: false })
        .limit(10);

    if (error || !data || data.length === 0) {
        console.warn("Error fetching leaderboard or empty data, using mock:", error);
        return LEADERBOARD_DATA;
    }

    // Sort manually if JSON sorting fails or simple fallback
    const sortedData = data.sort((a, b) => {
        const scoreA = parseInt((a.trophies?.score || "0").replace(/\D/g, ''));
        const scoreB = parseInt((b.trophies?.score || "0").replace(/\D/g, ''));
        return scoreB - scoreA;
    });

    return sortedData.map((user, index) => mapUserToPlayer(user, index));
};

export const LEADERBOARD_DATA: Player[] = [
    {
        rank: 1,
        name: "Ayush b",
        score: "2331 RP",
        region: "Asia",
        img: "https://i.pravatar.cc/150?u=a",
        gameIcon: bgmiImage,
        wins: 189,
        matches: 345,
        kd: 3.1,
        winRate: "65%",
        color: "from-[#2FE9A9] to-[#00C6FF]"
    },
    {
        rank: 2,
        name: "Crazy x",
        score: "2151 RP",
        region: "Africa",
        img: "https://i.pravatar.cc/150?u=b",
        gameIcon: ffImage,
        wins: 142,
        matches: 310,
        kd: 2.4,
        winRate: "58%",
        color: "from-[#FF5E3A] to-[#FF2E00]"
    },
    {
        rank: 3,
        name: "gamer b",
        score: "1131 RP",
        region: "America",
        img: "https://i.pravatar.cc/150?u=c",
        gameIcon: codImage,
        wins: 120,
        matches: 290,
        kd: 2.1,
        winRate: "52%",
        color: "from-[#00C6FF] to-[#0072FF]"
    },
    {
        rank: 4,
        name: "Viper",
        score: "1050 RP",
        region: "Europe",
        img: "https://titles.trackercdn.com/valorant-api/agents/707eab51-4836-f488-046a-cda6bf494859/displayicon.png",
        gameIcon: valorantImage,
        wins: 98,
        matches: 210,
        kd: 1.9,
        winRate: "48%"
    },
    {
        rank: 5,
        name: "Ghost",
        score: "980 RP",
        region: "Oceania",
        img: "https://titles.trackercdn.com/valorant-api/agents/add6443a-41bd-e414-f685-bc95d713a0c4/displayicon.png",
        gameIcon: bgmiImage,
        wins: 95,
        matches: 205,
        kd: 1.8,
        winRate: "46%"
    }
];
