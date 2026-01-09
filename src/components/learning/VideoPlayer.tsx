import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface VideoPlayerProps {
  videoUrl?: string;
  duration: string;
  onProgress?: (seconds: number) => void;
  onComplete?: () => void;
  initialProgress?: number;
  title?: string;
}

export function VideoPlayer({
  videoUrl,
  duration,
  onProgress,
  onComplete,
  initialProgress = 0,
  title
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(initialProgress);
  const [videoDuration, setVideoDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);

  useEffect(() => {
    if (videoUrl) {
      setHasVideo(true);
    }
  }, [videoUrl]);

  useEffect(() => {
    if (videoRef.current && initialProgress > 0) {
      videoRef.current.currentTime = initialProgress;
    }
  }, [initialProgress]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    
    const current = videoRef.current.currentTime;
    setCurrentTime(current);
    onProgress?.(current);

    // Auto-complete when video ends
    if (videoDuration > 0 && current >= videoDuration - 1) {
      onComplete?.();
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    if (!videoRef.current) return;
    const newVolume = value[0];
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    videoRef.current.muted = newMuted;
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  const restart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Placeholder when no video
  if (!hasVideo) {
    return (
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-muted to-card">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mx-auto mb-4">
              <Play className="w-8 h-8 text-primary ml-1" />
            </div>
            <p className="text-foreground font-medium mb-2">Video content coming soon</p>
            <p className="text-muted-foreground text-sm">Interactive video lessons for this module</p>
          </div>
        </div>
        <div className="p-4 border-t border-border flex items-center gap-4">
          <button className="text-muted-foreground hover:text-foreground cursor-not-allowed" disabled>
            <Play className="w-5 h-5" />
          </button>
          <div className="flex-1 h-1 bg-muted rounded-full">
            <div className="h-full w-0 bg-primary rounded-full"></div>
          </div>
          <span className="text-primary text-sm font-mono">0:00 / {duration}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="relative aspect-video bg-black">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => {
            setIsPlaying(false);
            onComplete?.();
          }}
        />
        
        {/* Overlay controls */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
          >
            <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center">
              <Play className="w-8 h-8 text-primary-foreground ml-1" />
            </div>
          </button>
        )}
      </div>

      {/* Controls bar */}
      <div className="p-4 border-t border-border space-y-3">
        {/* Progress bar */}
        <Slider
          value={[currentTime]}
          max={videoDuration || 100}
          step={1}
          onValueChange={handleSeek}
          className="w-full"
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={togglePlay}>
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>
            
            <Button variant="ghost" size="icon" onClick={restart}>
              <RotateCcw className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleMute}>
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume]}
                max={1}
                step={0.1}
                onValueChange={handleVolumeChange}
                className="w-20"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground font-mono">
              {formatTime(currentTime)} / {formatTime(videoDuration || 0)}
            </span>
            <Button variant="ghost" size="icon" onClick={handleFullscreen}>
              <Maximize className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {title && (
          <p className="text-sm text-muted-foreground">{title}</p>
        )}
      </div>
    </div>
  );
}
