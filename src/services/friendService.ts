
// Mock Friend Service using LocalStorage to simulate backend social features

export interface FriendRequest {
    id: string;
    fromUser: {
        id: string;
        name: string;
        avatar: string;
    };
    toUserId: string;
    status: 'pending' | 'accepted' | 'rejected';
    timestamp: number;
}

export interface Friend {
    id: string;
    name: string;
    avatar: string;
    status: 'online' | 'offline' | 'playing';
}

const STORAGE_KEYS = {
    REQUESTS: 'rivalioo_friend_requests',
    FRIENDS: 'rivalioo_friends'
};

// Helper to get data
const getStorageData = (key: string) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : [];
    } catch {
        return [];
    }
};

// Helper to set data
const setStorageData = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const friendService = {
    // Send a friend request
    sendRequest: async (fromUser: any, toUserId: string): Promise<boolean> => {
        const requests = getStorageData(STORAGE_KEYS.REQUESTS);

        // Check if already requested
        const exists = requests.find((r: FriendRequest) =>
            (r.fromUser.id === fromUser.id && r.toUserId === toUserId) ||
            (r.fromUser.id === toUserId && r.toUserId === fromUser.id)
        );

        if (exists) return false;

        const newRequest: FriendRequest = {
            id: Math.random().toString(36).substr(2, 9),
            fromUser: {
                id: fromUser.id,
                name: fromUser.name || fromUser.username,
                avatar: fromUser.profile_picture_url || fromUser.avatar
            },
            toUserId,
            status: 'pending',
            timestamp: Date.now()
        };

        requests.push(newRequest);
        setStorageData(STORAGE_KEYS.REQUESTS, requests);
        return true;
    },

    // Get pending requests for a user
    getPendingRequests: async (userId: string): Promise<FriendRequest[]> => {
        const requests = getStorageData(STORAGE_KEYS.REQUESTS);
        return requests.filter((r: FriendRequest) => r.toUserId === userId && r.status === 'pending');
    },

    // Accept a request
    acceptRequest: async (requestId: string): Promise<boolean> => {
        const requests = getStorageData(STORAGE_KEYS.REQUESTS);
        const requestIndex = requests.findIndex((r: FriendRequest) => r.id === requestId);

        if (requestIndex === -1) return false;

        const request = requests[requestIndex];
        request.status = 'accepted';

        // Add to friends list (bidirectional)
        const friends = getStorageData(STORAGE_KEYS.FRIENDS);

        // Add connection
        friends.push({
            user1: request.fromUser.id,
            user2: request.toUserId,
            timestamp: Date.now()
        });

        setStorageData(STORAGE_KEYS.REQUESTS, requests); // Update status
        setStorageData(STORAGE_KEYS.FRIENDS, friends);

        return true;
    },

    // Reject request
    rejectRequest: async (requestId: string): Promise<boolean> => {
        let requests = getStorageData(STORAGE_KEYS.REQUESTS);
        requests = requests.filter((r: FriendRequest) => r.id !== requestId);
        setStorageData(STORAGE_KEYS.REQUESTS, requests);
        return true;
    },

    // Check if two users are friends
    checkIfFriends: async (user1Id: string, user2Id: string): Promise<boolean> => {
        const friends = getStorageData(STORAGE_KEYS.FRIENDS);
        return friends.some((f: any) =>
            (f.user1 === user1Id && f.user2 === user2Id) ||
            (f.user1 === user2Id && f.user2 === user1Id)
        );
    },

    // Check if request is pending
    checkRequestStatus: async (fromId: string, toId: string): Promise<'pending' | 'none'> => {
        const requests = getStorageData(STORAGE_KEYS.REQUESTS);
        const req = requests.find((r: FriendRequest) =>
            r.fromUser.id === fromId && r.toUserId === toId && r.status === 'pending'
        );
        return req ? 'pending' : 'none';
    },

    // Get all friends for a user (Mocked return)
    // parameter userId unused in mock
    getFriends: async (_userId: string): Promise<Friend[]> => {
        // In a real app, we'd join with the users table.
        // Here we'll just mock some friends + the accepted requests

        // Reading storage to verify it works but returning static mock for demo
        // const storedFriends = getStorageData(STORAGE_KEYS.FRIENDS);

        return [
            { id: 'mock1', name: 'AlexPro', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', status: 'online' },
            { id: 'mock2', name: 'KillerQueen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Queen', status: 'playing' },
            { id: 'mock3', name: 'NoobMaster', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Noob', status: 'offline' }
        ];
    }
};
