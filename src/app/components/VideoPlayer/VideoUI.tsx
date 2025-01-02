import {
  RefObject,
  useCallback,
  useEffect,
  useState,
  useMemo,
  type FC,
  useTransition,
} from "react";
import { useNavigator } from "@/app/context/NavigatorContext";
import ChevronRightIcon from "@/app/icons/chevron-right.svg?react";
import FullScreenIcon from "@/app/icons/maximize.svg?react";
import RewindIcon from "@/app/icons/rotate-ccw.svg?react";
import ForwardIcon from "@/app/icons/rotate-cw.svg?react";
import PlayCircleIcon from "@/app/icons/play-circle.svg?react";
import PauseIcon from "@/app/icons/pause-circle.svg?react";
import VolumeMuteIcon from "@/app/icons/volume-mute.svg?react";
import VolumeMaxIcon from "@/app/icons/volume-max.svg?react";
import Button from "@/app/components/Button";
import SimplePreloader from "@/app/components/SimplePreloader";
import Header from "./Header";
import Slider from "./Slider";
import { clamp, convertDurationToTime } from "./utils";

export interface VideoUIProps {
  title: string;
  videoRef: RefObject<HTMLVideoElement | null>;
  hidden?: boolean;
  onGoBack?: () => void;
}

const VideoUI: FC<VideoUIProps> = ({
  title,
  videoRef,
  hidden = false,
  onGoBack,
}) => {
  const { isTV } = useNavigator();
  const [isBuffering, setIsBuffering] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!videoRef?.current) return;

    const videoElement = videoRef.current;

    setIsMuted(videoElement.muted);

    videoElement.addEventListener("loadedmetadata", onLoadedMetadata);
    videoElement.addEventListener("timeupdate", onTimeUpdate);
    videoElement.addEventListener("waiting", startBuffering);
    videoElement.addEventListener("playing", stopBuffering);
    videoElement.addEventListener("play", startPlaying);
    videoElement.addEventListener("pause", pausePlaying);
    videoElement.addEventListener("volumechange", onVolumeChange);
    videoElement.addEventListener("ended", stopVideo);
    videoElement.addEventListener("click", togglePlay);

    return () => {
      videoElement.removeEventListener("loadedmetadata", onLoadedMetadata);
      videoElement.removeEventListener("timeupdate", onTimeUpdate);
      videoElement.removeEventListener("waiting", startBuffering);
      videoElement.removeEventListener("playing", stopBuffering);
      videoElement.removeEventListener("play", startPlaying);
      videoElement.removeEventListener("pause", pausePlaying);
      videoElement.removeEventListener("volumechange", onVolumeChange);
      videoElement.removeEventListener("ended", stopVideo);
      videoElement.removeEventListener("click", togglePlay);
    };
  }, [videoRef]);

  const timeLeft = duration - currentTime;

  const durationStr = useMemo(
    () => convertDurationToTime(duration),
    [duration]
  );

  const currentTimeStr = useMemo(
    () => convertDurationToTime(currentTime),
    [currentTime]
  );

  const startBuffering = useCallback(() => {
    setIsBuffering(true);
  }, [videoRef]);

  const stopBuffering = useCallback(() => {
    setIsBuffering(false);
  }, [videoRef]);

  const onLoadedMetadata = useCallback(() => {
    setDuration(videoRef.current?.duration ?? 0);
  }, [videoRef]);

  const onTimeUpdate = useCallback(() => {
    if (!videoRef.current || hidden) return;

    const videoElement = videoRef.current;

    startTransition(() => {
      setCurrentTime(videoElement.currentTime);
    });
  }, [videoRef]);

  const onVolumeChange = useCallback(() => {
    setIsMuted((prev) => videoRef.current?.muted ?? prev);
  }, [videoRef]);

  const startPlaying = useCallback(async () => {
    setIsPlaying(true);
  }, [videoRef]);

  const pausePlaying = useCallback(async () => {
    setIsPlaying(false);
  }, [videoRef]);

  const playVideo = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.play();
    setIsPlaying(true);
  }, [videoRef]);

  const pauseVideo = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    setIsPlaying(false);
  }, [videoRef]);

  const stopVideo = useCallback(() => {
    if (!videoRef.current) return;
    pauseVideo();
    setCurrentTime(0);
  }, []);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      playVideo();
    } else {
      pauseVideo();
    }
  }, [videoRef]);

  const handleRequestFullScreen = useCallback(() => {
    if (!videoRef.current) return;

    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  }, [videoRef.current]);

  const handleSeek = useCallback(
    (newTime: number) => {
      if (!videoRef.current) return;

      videoRef.current.currentTime = newTime;

      setCurrentTime(newTime);
    },
    [videoRef]
  );

  const handleAutoSeek = (seekTime: number) => {
    seekTo(currentTime + seekTime);
  };

  const seekTo = (seekTo: number) => {
    if (!videoRef.current) return;

    const newTime = clamp(seekTo, 0, videoRef.current.duration);

    videoRef.current.currentTime = newTime;

    setCurrentTime(newTime);
  };

  const handleSkipIntro = useCallback(() => {
    seekTo(30);
  }, [videoRef]);

  const handleMuteToggle = useCallback(() => {
    if (!videoRef.current) return;

    videoRef.current.muted = !videoRef.current.muted;

    setIsMuted(videoRef.current.muted);
  }, []);

  return (
    <div className="video-ui z-30">
      {isBuffering && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <SimplePreloader />
        </div>
      )}
      <Header title={title} hidden={hidden} onGoBack={onGoBack} />
      <div
        className={`bottom-bar fixed bottom-0 left-0 right-0 pb-4 pt-16 px-8 bg-gradient-to-t from-black to-transparent transition-transform ${
          hidden ? "transform translate-y-full" : ""
        }`}
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
          <div className="controls-panel flex items-center gap-4 justify-self-center col-start-2 col-span-1">
            <button
              type="button"
              className="text-white disabled:text-gray-400"
              disabled={currentTime < 10}
              onClick={() => handleAutoSeek(-10)}
            >
              <RewindIcon />
            </button>
            {!isPlaying && (
              <button type="button" className="text-white" onClick={togglePlay}>
                <PlayCircleIcon width={48} height={48} />
              </button>
            )}
            {isPlaying && (
              <button type="button" className="text-white" onClick={togglePlay}>
                <PauseIcon width={48} height={48} />
              </button>
            )}
            <button
              type="button"
              className="text-white disabled:text-gray-400"
              disabled={timeLeft < 10}
              onClick={() => handleAutoSeek(10)}
            >
              <ForwardIcon />
            </button>
          </div>
          <div className="flex gap-4 justify-self-end">
            {currentTime < 30 && (
              <Button
                startIcon={<ChevronRightIcon />}
                disabled={duration === 0}
                onClick={handleSkipIntro}
              >
                Skip Intro
              </Button>
            )}
            {!isTV && isMuted && (
              <button
                type="button"
                className="text-white"
                title="Unmute Volume"
                onClick={handleMuteToggle}
              >
                <VolumeMuteIcon />
              </button>
            )}
            {!isTV && !isMuted && (
              <button
                type="button"
                className="text-white"
                title="Mute Volume"
                onClick={handleMuteToggle}
              >
                <VolumeMaxIcon />
              </button>
            )}
            {!isTV && (
              <button
                type="button"
                onClick={handleRequestFullScreen}
                title="Full Screen"
              >
                <FullScreenIcon />
              </button>
            )}
          </div>
        </div>
        <div className="mt-2">
          <Slider
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
          />
        </div>
        <div className="flex justify-between">
          <span>{currentTimeStr}</span>
          <span hidden={duration === 0}>{durationStr}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoUI;
