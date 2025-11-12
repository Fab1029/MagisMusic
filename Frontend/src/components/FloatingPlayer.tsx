import { Heart, SkipBack, Play, SkipForward, Pause } from "lucide-react";
import { Volume2, VolumeX, Volume1 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePlayerStore } from "@/store/usePlayerStore";

interface SongInfoProps {
  image: string;
  title: string;
  artist: string;
}

interface VolumeIndicatorProps {
    volume: number;
    isVisible: boolean;
}

const VolumeIndicator: React.FC<VolumeIndicatorProps> = ({ volume, isVisible }) => {
    let Icon;
    if (volume === 0) {
        Icon = VolumeX;
    } else if (volume < 50) {
        Icon = Volume1;
    } else {
        Icon = Volume2;
    }
    const visibilityClass = isVisible 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-5';

    return (
        <div 
            className={`
                fixed bottom-24 right-5 bg-background/90 backdrop-blur 
                p-3 rounded-lg shadow-xl text-white transition-all duration-300 
                flex items-center space-x-3 z-[60] 
                ${visibilityClass}
            `}
        >
            <Icon className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">{volume}%</span>
        </div>
    );
};

const SongInfo: React.FC<SongInfoProps> = ({ image, title, artist }) => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <div className="flex items-center space-x-3 w-1/4 md:w-1/4">
      <img src={image} alt={`${title} cover`} className="h-14 w-14 object-cover rounded" />
      <div className="flex flex-col">
        <span className="text-sm font-semibold truncate max-w-40">{title}</span>
        <span className="text-xs text-gray-400 truncate max-w-40">{artist}</span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsLiked(!isLiked)}
        className="text-gray-400 hover:text-white transition-all duration-100 ease-in-out hover:bg-transparent hidden md:inline-flex"
      >
        <Heart className={`h-5 w-5 transition-all duration-200 ease-in-out ${isLiked ? 'fill-primary text-primary' : ''}`} />
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [previewDuration, setPreviewDuration] = useState(0);
  const { 
    currentSong, 
    isPlaying, 
    progressSeconds, 
    volume, 
    playPause, 
    setProgress,
    setVolume,
    nextSong,
    prevSong,
  } = usePlayerStore();

  if (!currentSong) {
    return null;
  }

  const [volumeIndicator, setVolumeIndicator] = useState({ 
        value: volume, 
        visible: false 
    });
  
  const volumeTimerRef = useRef<number | null>(null);

  const handleVolumeChange = (newVolumeArray: number[]) => {
        const newVolume = newVolumeArray[0];
        setVolume(newVolume);
        setVolumeIndicator({ value: newVolume, visible: true });
        if (volumeTimerRef.current !== null) {
            clearTimeout(volumeTimerRef.current);
        }
        volumeTimerRef.current = setTimeout(() => {
            setVolumeIndicator(prev => ({ ...prev, visible: false }));
            volumeTimerRef.current = null;
        }, 1500) as unknown as number;
    }

  const totalDuration = previewDuration > 0 ? previewDuration : Number(currentSong.duration);
 
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying){
      audio.play().catch(e => console.error("Error al reproducir audio:", e));
    }else{
      audio.pause();
    }
    audio.volume = volume / 100;
    const handleTimeUpdate = () => {
      setProgress(Math.floor(audio.currentTime));
    };
    const handleEnded = () => {
      nextSong();
    };
    const handleLoadedMetadata = () => {
      setPreviewDuration(Math.floor(audio.duration));
    };
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [isPlaying, volume, currentSong, setProgress, nextSong]);

  const progressPercentage = useMemo(() => {
    return (progressSeconds / totalDuration) * 100;
  }, [progressSeconds, totalDuration]);

  useEffect(() => {
        const VOLUME_STEP = 5; 
        setVolumeIndicator(prev => ({ ...prev, value: volume }));
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                event.preventDefault(); 
            }           
            let newVolume = volume;
            switch (event.key) {
                case 'ArrowUp':
                    newVolume = Math.min(volume + VOLUME_STEP, 100);
                    setVolume(newVolume);
                    const upVolume = Math.min(volume + VOLUME_STEP, 100);
                    handleVolumeChange([upVolume]);
                    break;

                case 'ArrowDown':
                    newVolume = Math.max(volume - VOLUME_STEP, 0);
                    setVolume(newVolume);
                    const downVolume = Math.max(volume - VOLUME_STEP, 0);
                    handleVolumeChange([downVolume]);
                    break;
                /*
                case ' ':
                    event.preventDefault(); 
                    playPause(); 
                    break;*/
                default:
                    return;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [volume, setVolume, playPause]);


  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-gray-800 p-2 z-50 shadow-2xl">
      <audio ref={audioRef} src={currentSong.preview} key={currentSong.id}/>
      <div className="flex items-center justify-between h-16 md:h-full">
        <SongInfo 
          image={currentSong.image}
          title={currentSong.title}
          artist={currentSong.artist}
        />
        <div className="hidden md:flex flex-col items-center w-1/2 max-w-md">
          <div className="flex items-center space-x-6 mb-2">
            <Button onClick={prevSong} variant="ghost" size="icon" className="text-gray-400 hover:text-white transition-all duration-100 ease-in-out hover:bg-transparent">
              <SkipBack className="h-5 w-5 fill-current transition-all duration-150 hover:scale-110" />
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
            
            <Button onClick={nextSong} variant="ghost" size="icon" className="text-gray-400 hover:text-white transition-all duration-100 ease-in-out hover:bg-transparent">
              <SkipForward className="h-5 w-5 fill-current transition-all duration-150 hover:scale-110" />
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

        <div className="flex items-center justify-end w-1/2 md:w-1/4 space-x-2">
          <div className="hidden md:flex items-center space-x-2 w-full max-w-xs justify-end">
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
            <div className="flex items-center space-x-2 md:hidden"> 
                <Button onClick={prevSong} variant="ghost" size="icon" className="p-0 text-gray-400 hover:text-white transition-all duration-100 ease-in-out hover:bg-transparent">
                    <SkipBack className="h-5 w-5 fill-current" />
                </Button>
                <Button
                    variant="default"
                    size="icon"
                    className="rounded-full bg-white text-black hover:bg-white/80 transition-colors h-7 w-7"
                    onClick={playPause}
                >
                    {isPlaying 
                        ? <Pause className="h-4 w-4 fill-current" /> 
                        : <Play className="h-4 w-4 fill-current ml-0.5" />
                    }
                </Button>
                <Button onClick={nextSong} variant="ghost" size="icon" className="p-0 text-gray-400 hover:text-white transition-all duration-100 ease-in-out hover:bg-transparent">
                    <SkipForward className="h-5 w-5 fill-current" />
                </Button>
            </div>        

      </div>
      <VolumeIndicator 
                volume={volumeIndicator.value} 
                isVisible={volumeIndicator.visible} 
            />
      <div className="flex md:hidden items-center w-full space-x-2 pt-2">
          <span className="text-xs text-gray-400">{formatTime(progressSeconds)}</span>
          <Progress 
              value={progressPercentage} 
              className="h-1 bg-gray-700" 
              indicatorClassName="bg-white" 
          />
          <span className="text-xs text-gray-400">{formatTime(totalDuration)}</span>
      </div>
    </div>
    
  );
};