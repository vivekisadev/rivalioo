import { motion } from 'framer-motion';

interface GameFilterSliderProps {
    games: string[];
    selectedGame: string;
    onSelectGame: (game: string) => void;
}

const GameFilterSlider = ({ games, selectedGame, onSelectGame }: GameFilterSliderProps) => {
    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-8">
            {games.map((game) => (
                <button
                    key={game}
                    onClick={() => onSelectGame(game)}
                    className={`relative px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${selectedGame === game ? 'text-black' : 'text-gray-400 hover:text-white'
                        }`}
                >
                    {selectedGame === game && (
                        <motion.div
                            layoutId="activeGameTab"
                            className="absolute inset-0 bg-[#2FE9A9] rounded-xl"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10">{game}</span>
                </button>
            ))}
        </div>
    );
};

export default GameFilterSlider;
