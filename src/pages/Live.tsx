import { useState, useEffect } from 'react';
import { Users, Trophy, Share2, Radio, CheckCircle2, Info, ExternalLink, Eye, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoIcon from "../assets/images/logo-icon.svg";
import { fetchYouTubeVideoStats, formatViewCount, fetchChannelLiveStreams, fetchChannelPopularVideos, fetchChannelDetails, fetchBatchVideoStats } from '../utils/youtube';

// Mock Data
interface Channel {
    id: string;
    name: string;
    title: string;
    game: string;
    viewers: string;
    avatar: string;
    videoId: string; // YouTube Video ID
    subscribers: string;
    language: string;
    platform: 'twitch' | 'youtube';
    isVerified?: boolean;
    channelUrl: string; // Channel URL
    channelId?: string; // YouTube Channel ID for live stream detection
}

const STREAMERS: Channel[] = [
    {
        id: "1",
        name: "iParadoxYT",
        title: "Valorant DAILY RANKED - Road to Radiant",
        game: "Valorant",
        viewers: "1.2K",
        avatar: "https://yt3.googleusercontent.com/ytc/AIdro_n4yX3sKx4HwQZ9-8yB2z_5q9r8u1t_X9_9=s176-c-k-c0x00ffffff-no-rj",
        videoId: "zKoxTOQhRD8",
        subscribers: "1.1M",
        language: "English",
        platform: "youtube",
        isVerified: true,
        channelUrl: "https://www.youtube.com/@iparadoxyt4153",
        channelId: "UC0Oi0-U6aMszoNwiyDeQmEw"
    },
    {
        id: "2",
        name: "iParadoxYT",
        title: "Valorant Credits Storm Event",
        game: "Valorant",
        viewers: "856",
        avatar: "https://yt3.googleusercontent.com/ytc/AIdro_n4yX3sKx4HwQZ9-8yB2z_5q9r8u1t_X9_9=s176-c-k-c0x00ffffff-no-rj",
        videoId: "9sSAbHIBMUk",
        subscribers: "2.8M",
        language: "English",
        platform: "youtube",
        isVerified: true,
        channelUrl: "https://www.youtube.com/@iparadoxyt4153",
        channelId: "UC0Oi0-U6aMszoNwiyDeQmEw"
    },
    {
        id: "3",
        name: "Zephyr Gaming",
        title: "BGMI Daily Ranked - Rush Gameplay",
        game: "BGMI",
        viewers: "4.5K",
        avatar: logoIcon,
        videoId: "-9N_Q0JqfA4",
        subscribers: "1.9M",
        language: "English",
        platform: "youtube",
        isVerified: true,
        channelUrl: "https://www.youtube.com/@ZephyrGaminglive",
        channelId: "UCYD1KrGaXogqZ_ioliChP0g"
    },
    {
        id: "4",
        name: "Zephyr Gaming",
        title: "FreeFire Daily Ranked Push",
        game: "FreeFire",
        viewers: "2.1K",
        avatar: logoIcon,
        videoId: "RSCbK3j9Fj0",
        subscribers: "4.1M",
        language: "English",
        platform: "youtube",
        isVerified: true,
        channelUrl: "https://www.youtube.com/@ZephyrGaminglive",
        channelId: "UCYD1KrGaXogqZ_ioliChP0g"
    },
    {
        id: "5",
        name: "Zephyr Gaming",
        title: "FreeFire Credits Storm",
        game: "FreeFire",
        viewers: "1.8K",
        avatar: logoIcon,
        videoId: "L52GjJ4yXj4",
        subscribers: "4.6M",
        language: "English",
        platform: "youtube",
        isVerified: true,
        channelUrl: "https://www.youtube.com/@ZephyrGaminglive",
        channelId: "UCYD1KrGaXogqZ_ioliChP0g"
    }
];

// Popular Videos Data
interface PopularVideo {
    id: string;
    videoId: string;
    title: string;
    creator: string;
    creatorAvatar: string;
    thumbnail: string;
    views: string;
    category: string;
    uploadDate?: string;
    isVerified?: boolean;
    channelId: string;
}

// MOCK DATA FOR POPULAR VIDEOS (High Fidelity)
const MOCK_POPULAR_VIDEOS: PopularVideo[] = [
    {
        id: "pv-1",
        videoId: "zKoxTOQhRD8",
        title: "Valorant DAILY RANKED - Road to Radiant",
        creator: "iParadoxYT",
        creatorAvatar: "https://yt3.googleusercontent.com/ytc/AIdro_n4yX3sKx4HwQZ9-8yB2z_5q9r8u1t_X9_9=s176-c-k-c0x00ffffff-no-rj",
        thumbnail: "https://img.youtube.com/vi/zKoxTOQhRD8/maxresdefault.jpg",
        views: "12K",
        category: "Most Recent",
        channelId: "UC0Oi0-U6aMszoNwiyDeQmEw",
        isVerified: true
    },
    {
        id: "pv-2",
        videoId: "-9N_Q0JqfA4",
        title: "BGMI IMPOSSIBLE CLUTCH MOMENTS",
        creator: "Zephyr Gaming",
        creatorAvatar: logoIcon,
        thumbnail: "https://img.youtube.com/vi/-9N_Q0JqfA4/maxresdefault.jpg",
        views: "45K",
        category: "Popular Creators",
        channelId: "UCYD1KrGaXogqZ_ioliChP0g",
        isVerified: true
    },
    {
        id: "pv-3",
        videoId: "9sSAbHIBMUk",
        title: "Valorant Credits Storm Event Highlights",
        creator: "iParadoxYT",
        creatorAvatar: "https://yt3.googleusercontent.com/ytc/AIdro_n4yX3sKx4HwQZ9-8yB2z_5q9r8u1t_X9_9=s176-c-k-c0x00ffffff-no-rj",
        thumbnail: "https://img.youtube.com/vi/9sSAbHIBMUk/maxresdefault.jpg",
        views: "8.5K",
        category: "Credit Storm",
        channelId: "UC0Oi0-U6aMszoNwiyDeQmEw",
        isVerified: true
    },
    {
        id: "pv-4",
        videoId: "RSCbK3j9Fj0",
        title: "FreeFire Daily Ranked Push",
        creator: "Zephyr Gaming",
        creatorAvatar: logoIcon,
        thumbnail: "https://img.youtube.com/vi/RSCbK3j9Fj0/maxresdefault.jpg",
        views: "22K",
        category: "Daily",
        channelId: "UCYD1KrGaXogqZ_ioliChP0g",
        isVerified: true
    },
    {
        id: "pv-5",
        videoId: "L52GjJ4yXj4",
        title: "Premium Rush: High Stakes Gameplay",
        creator: "Zephyr Gaming",
        creatorAvatar: logoIcon,
        thumbnail: "https://img.youtube.com/vi/L52GjJ4yXj4/maxresdefault.jpg",
        views: "15K",
        category: "Premium Rush",
        channelId: "UCYD1KrGaXogqZ_ioliChP0g",
        isVerified: true
    }
];

const Live = () => {
    const [streamers, setStreamers] = useState<Channel[]>(STREAMERS);
    const [selectedChannel, setSelectedChannel] = useState<Channel>(STREAMERS[0]);
    const [videoStats, setVideoStats] = useState<{
        viewCount: string;
        isLive: boolean;
        loading: boolean;
    }>({ viewCount: '0', isLive: false, loading: true });

    // Track viewer counts for all streamers - INITIALIZED WITH STATIC MOCK DATA
    const [streamerStats, setStreamerStats] = useState<Map<string, { viewCount: string; isLive: boolean }>>(() => {
        const map = new Map();
        STREAMERS.forEach(s => {
            map.set(s.videoId, { viewCount: s.viewers, isLive: true });
        });
        return map;
    });

    // Popular videos state
    const [selectedCategory, setSelectedCategory] = useState<string>('Popular Creators');
    const [popularVideos, setPopularVideos] = useState<PopularVideo[]>(MOCK_POPULAR_VIDEOS);
    const [loadingPopular, setLoadingPopular] = useState(false);

    // Channel avatars state - INITIALIZED WITH STATIC MOCK DATA
    const [channelAvatars, setChannelAvatars] = useState<Map<string, string>>(() => {
        const map = new Map();
        STREAMERS.forEach(s => {
            if (s.channelId) map.set(s.channelId, s.avatar);
        });
        return map;
    });

    // Video player state
    const [isPlaying, setIsPlaying] = useState(false);

    // Search state
    const [searchQuery, setSearchQuery] = useState("");

    // Temporary user login check (Mock Mode: always true for UI, but API calls disabled)
    const isUserLoggedIn = true;

    // Fetch real-time stats for the main video
    useEffect(() => {
        const fetchStats = async () => {
            setVideoStats(prev => ({ ...prev, loading: true }));

            if (isUserLoggedIn) {
                const stats = await fetchYouTubeVideoStats(selectedChannel.videoId);
                if (stats) {
                    setVideoStats({
                        viewCount: stats.isLive && stats.concurrentViewers ? stats.concurrentViewers : stats.viewCount,
                        isLive: stats.isLive,
                        loading: false
                    });
                }
            }
        };

        fetchStats();
        setIsPlaying(false);
        const interval = setInterval(fetchStats, 60000); // 1 min refresh for active video
        return () => clearInterval(interval);
    }, [selectedChannel, isUserLoggedIn]);

    // Search filtering
    useEffect(() => {
        // ... (Keep text search logic if needed, or rely on render filter)
    }, [searchQuery]);

    // Fetch stats for all streamers in the list using BATCH REQUEST
    useEffect(() => {
        const fetchAllStreamerStats = async () => {
            if (!isUserLoggedIn) return;

            // Collect all video IDs
            const videoIds = streamers.map(s => s.videoId);

            // Single API Call
            const statsMap = await fetchBatchVideoStats(videoIds);

            if (statsMap.size > 0) {
                setStreamerStats(prev => {
                    const newMap = new Map(prev);
                    statsMap.forEach((stats, id) => {
                        newMap.set(id, {
                            viewCount: stats.isLive && stats.concurrentViewers ? stats.concurrentViewers : stats.viewCount,
                            isLive: stats.isLive
                        });
                    });
                    return newMap;
                });
            }
        };

        fetchAllStreamerStats();
        // Refresh every 5 minutes (Conservatory polling)
        const interval = setInterval(fetchAllStreamerStats, 300000);
        return () => clearInterval(interval);
    }, [streamers, isUserLoggedIn]);


    // Check for new live streams from tracked channels
    useEffect(() => {
        const checkForNewLiveStreams = async () => {
            const uniqueChannels = new Map<string, Channel>();
            STREAMERS.forEach(streamer => {
                if (streamer.channelId && !uniqueChannels.has(streamer.channelId)) {
                    uniqueChannels.set(streamer.channelId, streamer);
                }
            });

            for (const [channelId, baseChannel] of uniqueChannels) {
                // This function already uses batching internally for video details
                const liveVideos = await fetchChannelLiveStreams(channelId);

                if (liveVideos.length > 0) {
                    const newStreams: Channel[] = [];
                    liveVideos.forEach((liveVideo, index) => {
                        const exists = streamers.some(s => s.videoId === liveVideo.videoId);
                        if (!exists) {
                            newStreams.push({
                                id: `${baseChannel.id}-live-${Date.now()}-${index}`,
                                name: baseChannel.name,
                                title: liveVideo.title,
                                game: baseChannel.game,
                                viewers: liveVideo.concurrentViewers,
                                avatar: baseChannel.avatar,
                                videoId: liveVideo.videoId,
                                subscribers: baseChannel.subscribers,
                                language: baseChannel.language,
                                platform: baseChannel.platform,
                                isVerified: baseChannel.isVerified,
                                channelUrl: baseChannel.channelUrl,
                                channelId: baseChannel.channelId
                            });
                        }
                    });

                    if (newStreams.length > 0) {
                        setStreamers(prev => [...newStreams, ...prev]);
                    }
                }
            }
        };

        checkForNewLiveStreams();
        const interval = setInterval(checkForNewLiveStreams, 300000); // 5 mins
        return () => clearInterval(interval);
    }, [streamers]);

    // Fetch popular videos from tracked channels
    useEffect(() => {
        const fetchPopularVideos = async () => {
            if (!isUserLoggedIn) return;

            setLoadingPopular(true);
            const allVideos: PopularVideo[] = [];
            const uniqueChannels = new Map<string, Channel>();

            STREAMERS.forEach(streamer => {
                if (streamer.channelId && !uniqueChannels.has(streamer.channelId)) {
                    uniqueChannels.set(streamer.channelId, streamer);
                }
            });

            for (const [channelId, channel] of uniqueChannels) {
                // Updated to use internally optimized batch fetching
                const videos = await fetchChannelPopularVideos(channelId, 5);

                videos.forEach(video => {
                    let category = 'Popular Creators';
                    const title = video.title.toLowerCase();
                    if (title.includes('daily')) category = 'Daily';
                    else if (title.includes('credit storm')) category = 'Credit Storm';
                    else if (title.includes('premium rush')) category = 'Premium Rush';

                    allVideos.push({
                        id: `pv-${video.videoId}`,
                        videoId: video.videoId,
                        title: video.title,
                        creator: channel.name,
                        creatorAvatar: channel.avatar, // Will be updated by channelAvatars map
                        thumbnail: video.thumbnailUrl,
                        views: video.concurrentViewers,
                        category,
                        isVerified: channel.isVerified,
                        channelId: channelId
                    });
                });
            }

            if (allVideos.length > 0) {
                setPopularVideos(allVideos);
            }
            setLoadingPopular(false);
        };

        fetchPopularVideos();
        const interval = setInterval(fetchPopularVideos, 300000); // 5 mins
        return () => clearInterval(interval);
    }, [isUserLoggedIn]);

    // Fetch channel avatars
    useEffect(() => {
        const fetchAvatars = async () => {
            const avatarsMap = new Map<string, string>();
            const uniqueChannels = new Map<string, Channel>();

            STREAMERS.forEach(streamer => {
                if (streamer.channelId && !uniqueChannels.has(streamer.channelId)) {
                    uniqueChannels.set(streamer.channelId, streamer);
                }
            });

            for (const [channelId] of uniqueChannels) {
                const details = await fetchChannelDetails(channelId);
                if (details) {
                    avatarsMap.set(channelId, details.thumbnailUrl);
                }
            }

            if (avatarsMap.size > 0) {
                setChannelAvatars(avatarsMap);
            }
        };

        fetchAvatars();
    }, []);

    return (
        <div className="min-h-screen bg-transparent pt-20 pb-4 px-8 overflow-hidden flex flex-col items-center">

            {/* Disclaimer Banner */}
            <div className="w-full max-w-[1200px] mb-3">
                <div className="bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-lg p-2.5 flex items-start gap-2">
                    <Info size={16} className="text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-100/90 leading-relaxed">
                        <span className="font-semibold text-blue-300">Note:</span> Viewer counts and stats may vary if not logged in. Sign in for accurate real-time data.
                    </p>
                </div>
            </div>

            <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-12 gap-4">

                {/* LEFT: Streamer List - Extends full height */}
                <div className="lg:col-span-3 xl:col-span-3 bg-dark-600 backdrop-blur-xl border border-white/5 rounded-xl flex flex-col overflow-hidden lg:row-span-2">
                    <div className="p-2.5 border-b border-white/5 flex flex-col gap-2 flex-shrink-0">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                                <h2 className="text-xs font-bold uppercase tracking-widest text-white">Live Channels</h2>
                            </div>
                            <span className="text-[10px] text-gray-500 font-mono">{streamers.length} Online</span>
                        </div>

                        {/* Search Input */}
                        <div className="relative group">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 w-3.5 h-3.5 group-focus-within:text-white transition-colors" />
                            <input
                                type="text"
                                placeholder="Search channels..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-black/20 border border-white/5 rounded-lg py-1.5 pl-8 pr-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-white/10 focus:bg-white/5 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1.5">
                        {streamers
                            .filter(streamer =>
                                streamer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                streamer.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                streamer.title.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((streamer) => {
                                const isActive = selectedChannel.id === streamer.id;
                                return (
                                    <motion.div
                                        key={streamer.id}
                                        onClick={() => {
                                            if (isActive) return;
                                            setSelectedChannel(streamer);
                                        }}
                                        className={`relative p-2 rounded-lg cursor-pointer transition-all duration-200 group ${isActive ? 'bg-white/5 border border-white/10' : 'hover:bg-white/5 border border-transparent'}`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeStreamer"
                                                className="absolute inset-0 bg-white/5 rounded-xl border border-white/10"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}

                                        <div className="relative z-10 flex items-center gap-2">
                                            <div className="relative">
                                                <img
                                                    src={streamer.channelId && channelAvatars.get(streamer.channelId) || streamer.avatar}
                                                    className="w-8 h-8 rounded-full object-cover border-2 border-[#1F242C]"
                                                />
                                                <div className="absolute -bottom-0.5 -right-0.5 bg-[#1F242C] p-0.5 rounded-full">
                                                    {streamer.platform === 'twitch' ? (
                                                        <div className="w-2 h-2 bg-[#9146FF] rounded-full" />
                                                    ) : (
                                                        <div className="w-2 h-2 bg-[#FF0000] rounded-full" />
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <h3 className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                                        {streamer.name}
                                                    </h3>
                                                    {isActive && (
                                                        <Radio size={10} className="text-red-500 animate-pulse" />
                                                    )}
                                                </div>
                                                <p className="text-[10px] text-gray-500 truncate">{streamer.game}</p>
                                            </div>

                                            <div className="text-right">
                                                <div className="text-[10px] font-mono font-bold text-white">
                                                    {streamerStats.get(streamer.videoId)?.viewCount
                                                        ? formatViewCount(streamerStats.get(streamer.videoId)!.viewCount)
                                                        : streamer.viewers}
                                                </div>
                                                <div className="flex items-center justify-end gap-0.5 mt-0.5">
                                                    <Users size={8} className="text-red-500" />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                    </div>
                </div>

                {/* RIGHT TOP: Video Player */}
                <div className="lg:col-span-9 xl:col-span-9 w-full aspect-video bg-black rounded-xl overflow-hidden border border-white/5 relative shadow-2xl">
                    <AnimatePresence mode="wait">
                        {!isPlaying ? (
                            // Thumbnail with premium play button
                            <motion.div
                                key="thumbnail"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="relative w-full h-full cursor-pointer group"
                                onClick={() => setIsPlaying(true)}
                            >
                                <img
                                    src={`https://img.youtube.com/vi/${selectedChannel.videoId}/maxresdefault.jpg`}
                                    alt={selectedChannel.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        // Fallback to hqdefault if maxresdefault doesn't exist
                                        e.currentTarget.src = `https://img.youtube.com/vi/${selectedChannel.videoId}/hqdefault.jpg`;
                                    }}
                                />
                                {/* Dark overlay */}
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />

                                {/* Premium Glass Play Button - Static & Centered */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="relative group/btn pointer-events-auto">
                                        {/* Soft glow behind - only visible on hover */}
                                        <div className="absolute inset-0 bg-red-600/60 blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 rounded-full scale-125" />

                                        {/* Main button: Glass default -> Red hover */}
                                        <div className="relative w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 group-hover/btn:bg-red-600 group-hover/btn:border-red-500 group-hover/btn:scale-105 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                                            {/* Play icon */}
                                            <svg className="w-7 h-7 text-white transition-transform duration-300 group-hover/btn:scale-90" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Live badge with enhanced styling */}
                                {videoStats.isLive && (
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-[0_4px_12px_rgba(220,38,38,0.4)] border border-red-400/20"
                                    >
                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                                        LIVE
                                    </motion.div>
                                )}
                            </motion.div>
                        ) : (
                            // YouTube iframe with fade-in
                            <motion.iframe
                                key="video"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${selectedChannel.videoId}?autoplay=1&controls=1&modestbranding=1&rel=0`}
                                title={selectedChannel.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="w-full h-full"
                            />
                        )}
                    </AnimatePresence>
                </div>

                {/* RIGHT BOTTOM: Stream Info Bar */}
                <div className="lg:col-span-9 xl:col-span-9 bg-[#0F1218]/60 backdrop-blur-xl border border-white/5 rounded-xl p-3 flex items-center justify-between">

                    {/* Left: Streamer Bio */}
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#FF0055] blur-[15px] opacity-20 rounded-full" />
                            <img
                                src={selectedChannel.channelId && channelAvatars.get(selectedChannel.channelId) || selectedChannel.avatar}
                                className="w-12 h-12 rounded-full object-cover border-2 border-white/10 relative z-10"
                            />
                            <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[8px] font-bold px-1 py-0.5 rounded uppercase z-20">Live</div>
                        </div>

                        <div>
                            <h1 className="text-base font-bold text-white flex items-center gap-1.5">
                                {selectedChannel.name}
                                {selectedChannel.isVerified && <CheckCircle2 size={14} className="text-[#2FE9A9]" />}
                            </h1>
                            <p className="text-white/60 text-xs max-w-lg truncate mb-1">{selectedChannel.title}</p>
                            <div className="flex items-center gap-2">
                                <span className="text-[#2FE9A9] text-[10px] font-bold bg-[#2FE9A9]/10 px-1.5 py-0.5 rounded">{selectedChannel.game}</span>
                                <span className="text-gray-400 text-[10px]">{selectedChannel.language}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Actions & Stats */}
                    <div className="flex items-center gap-4">

                        {/* Stats */}
                        <div className="flex flex-col items-end gap-0.5">
                            <div className="text-lg font-black text-white font-mono">
                                {videoStats.loading ? '...' : formatViewCount(videoStats.viewCount)}
                            </div>
                            <div className="text-[10px] text-red-500 font-bold uppercase tracking-widest flex items-center gap-1">
                                {videoStats.isLive ? (
                                    <>
                                        <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                                        Watching Now
                                    </>
                                ) : (
                                    <>
                                        <Eye size={10} className="text-gray-400" />
                                        <span className="text-gray-400">Total Views</span>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="h-8 w-[1px] bg-white/10 mx-1" />

                        {/* Buttons */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => window.open(selectedChannel.channelUrl, '_blank')}
                                className="px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 bg-[#FF0055] text-white hover:bg-[#FF0055]/90 hover:scale-105 shadow-[0_0_20px_rgba(255,0,85,0.3)]"
                            >
                                <ExternalLink size={12} />
                                Go to Channel
                            </button>
                            <button className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                                <Share2 size={16} />
                            </button>
                        </div>

                    </div>
                </div>

            </div>

            {/* Recent Lives Section */}
            <div className="w-full max-w-[1200px] mt-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Trophy size={24} className="text-[#FF0055]" />
                        Recent Lives
                    </h2>
                </div>

                {/* Category Filters */}
                <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                    {['Popular Creators', 'Most Recent', 'Daily', 'Credit Storm', 'Premium Rush'].map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${selectedCategory === category
                                ? 'bg-[#FF0055] text-white shadow-[0_0_20px_rgba(255,0,85,0.3)]'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Video Grid */}
                {loadingPopular ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-gray-400 text-sm">Loading popular videos...</div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {popularVideos
                            .filter(video => {
                                if (selectedCategory === 'Most Recent') return true;
                                return video.category === selectedCategory;
                            })
                            .slice(0, 6)
                            .map((video) => (
                                <motion.div
                                    key={video.id}
                                    onClick={() => {
                                        const channel = STREAMERS.find(s => s.channelId === video.channelId);
                                        if (channel) {
                                            setSelectedChannel({
                                                ...channel,
                                                videoId: video.videoId,
                                                title: video.title,
                                                viewers: video.views
                                            });
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }
                                    }}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-[#0F1218]/60 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden cursor-pointer group"
                                >
                                    {/* Thumbnail */}
                                    <div className="relative aspect-video overflow-hidden">
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                        {/* Creator Avatar */}
                                        <div className="absolute bottom-2 left-2 flex items-center gap-2">
                                            <img
                                                src={video.channelId && channelAvatars.get(video.channelId) || video.creatorAvatar}
                                                alt={video.creator}
                                                className="w-8 h-8 rounded-full border-2 border-white/20"
                                            />
                                        </div>

                                        {/* View Count */}
                                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-white flex items-center gap-1">
                                            <Eye size={10} />
                                            {formatViewCount(video.views)}
                                        </div>
                                    </div>

                                    {/* Video Info */}
                                    <div className="p-3">
                                        <h3 className="text-sm font-bold text-white line-clamp-2 mb-1 group-hover:text-[#FF0055] transition-colors">
                                            {video.title}
                                        </h3>
                                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                            <span>{video.creator}</span>
                                            {video.isVerified && <CheckCircle2 size={12} className="text-[#2FE9A9]" />}
                                        </div>
                                        {video.category !== 'Popular Creators' && video.category !== 'Most Recent' && (
                                            <div className="mt-2">
                                                <span className={`text-[10px] font-bold px-2 py-1 rounded ${video.category === 'Daily' ? 'bg-blue-500/10 text-blue-400' :
                                                    video.category === 'Credit Storm' ? 'bg-purple-500/10 text-purple-400' :
                                                        'bg-orange-500/10 text-orange-400'
                                                    }`}>
                                                    {video.category}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default Live;
