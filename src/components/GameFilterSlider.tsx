import React from 'react';



interface GameFilterSliderProps {
    games: string[];
    selectedGame: string;
    onSelectGame: (game: string) => void;
    className?: string;
}

const GameFilterSlider: React.FC<GameFilterSliderProps> = ({
    games,
    selectedGame,
    onSelectGame,
    className = ""
}) => {
    return (
        <div className={`flex items-center gap-3 overflow-x-auto pb-4 mb-2 scrollbar-hide mask-fade-right ${className}`}>
            {games.map((game) => (
                <button
                    key={game}
                    onClick={() => onSelectGame(game)}
                    className={`relative overflow-hidden whitespace-nowrap px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all border group ${selectedGame === game
                        ? 'bg-[#2FE9A9] border-[#2FE9A9] text-black shadow-[0_0_20px_rgba(47,233,169,0.3)]'
                        : 'bg-[#151921] border-white/10 text-gray-400 hover:text-white hover:bg-[#1A1D26] hover:border-white/20'
                        }`}
                >
                    <span className="relative z-10">{game}</span>
                    {selectedGame === game && <div className="absolute inset-0 bg-white/20 blur-md"></div>}
                </button>
            ))}
        </div>
    );
};

export default GameFilterSlider;
