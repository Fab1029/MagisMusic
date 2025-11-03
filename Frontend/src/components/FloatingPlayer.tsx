import { Heart, SkipBack, Play, SkipForward, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { useEffect, useMemo, useState } from "react";
import { usePlayerStore } from "@/store/usePlayerStore";

interface SongInfoProps {
  imageSrc: string;
  title: string;
  artist: string;
}

const SongInfo: React.FC<SongInfoProps> = ({ imageSrc, title, artist }) => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <div className="flex items-center space-x-3 w-1/4">
      <img src={imageSrc} alt={`${title} cover`} className="h-14 w-14 object-cover rounded" />
      <div className="flex flex-col">
        <span className="text-sm font-semibold truncate max-w-40">{title}</span>
        <span className="text-xs text-gray-400 truncate max-w-40">{artist}</span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsLiked(!isLiked)}
        className="text-gray-400 hover:text-white transition-colors"
      >
        <Heart className={`h-5 w-5 ${isLiked ? 'fill-green-500 text-green-500' : ''}`} />
      </Button>
    </div>
  );
};

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

export const FloatingPlayer: React.FC = () => {
  
  const { 
    currentSong, 
    isPlaying, 
    progressSeconds, 
    volume, 
    playPause, 
    setProgress,
    setVolume
  } = usePlayerStore();

  if (!currentSong) {
    return <div className="fixed bottom-0 left-0 right-0 bg-black/90 h-16 border-t border-gray-800 p-2 z-50"></div>;
  }
  
  const totalDuration = currentSong.durationSeconds;

  {/* Simulacion de avance del tiempo (Hook useEffect) */}
  
  useEffect(() => {
    let interval: number | undefined = undefined;

    if (isPlaying && progressSeconds < totalDuration) {
      interval = setInterval(() => {
        setProgress(progressSeconds + 1);
      }, 1000) as unknown as number;

    } else if (progressSeconds >= totalDuration) {
      clearInterval(interval);
      playPause();
      setProgress(0);
    }

    return () => clearInterval(interval);
  }, [isPlaying, progressSeconds, totalDuration, setProgress, playPause]);

  {/* Calculo porcentaje de progreso para el componente Progress */}
  const progressPercentage = useMemo(() => {
    return (progressSeconds / totalDuration) * 100;
  }, [progressSeconds, totalDuration]);

  const handleVolumeChange = (newVolumeArray: number[]) => {
    setVolume(newVolumeArray[0]);
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-gray-800 p-2 z-50 shadow-2xl">
      <div className="flex items-center justify-between h-full">

        <SongInfo 
          imageSrc={currentSong.imageSrc}
          title={currentSong.title}
          artist={currentSong.artist}
        />

        <div className="flex flex-col items-center w-1/2 max-w-md">
          <div className="flex items-center space-x-6 mb-2">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white transition-colors">
              <SkipBack className="h-5 w-5 fill-current" />
            </Button>
            
            <Button
              variant="default"
              size="icon"
              className="rounded-full bg-white text-black hover:bg-white/80 transition-colors h-9 w-9"
              onClick={playPause}
            >
              {isPlaying 
                ? <Pause className="h-5 w-5 fill-current" /> 
                : <Play className="h-5 w-5 fill-current ml-0.5" />
              }
            </Button>
            
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white transition-colors">
              <SkipForward className="h-5 w-5 fill-current" />
            </Button>
          </div>
          
          <div className="flex items-center w-full space-x-2">
            <span className="text-xs text-gray-400">{formatTime(progressSeconds)}</span>
            <Progress 
              value={progressPercentage} 
              className="h-1 bg-gray-700" 
              indicatorClassName="bg-white" 
            />
            <span className="text-xs text-gray-400">{formatTime(totalDuration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-end w-1/4 space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon></svg>
          
          <div className="w-24">
            <Slider
              defaultValue={[volume]}
              max={100}
              step={1}
              value={[volume]}
              onValueChange={handleVolumeChange}
              className="[&>span:first-child]:h-1"
              trackClassName="bg-gray-700"
              thumbClassName="h-3 w-3 bg-white border-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};