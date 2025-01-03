import { useCallback, useEffect, useRef, useState } from "react";
import VideoUI from "./VideoUI";
import { clamp } from "./utils";

export interface VideoPlayerProps {
  title: string;
  sources: Array<{ src: string; type: string }>;
  uiVisibilityDuration?: number;
  onGoBack?: () => void;
  onVideoEnd?: () => void;
}

export default function VideoPlayer({
  title,
  sources,
  uiVisibilityDuration = 5000,
  onGoBack,
  onVideoEnd,
}: VideoPlayerProps) {
  const [uiVisible, setUIVisible] = useState(true);
  const interactionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // AutoPlay useEffect
  useEffect(() => {
    const videoElement = videoRef.current;

    const autoPlay = async () => {
      if (!videoRef.current) return;

      try {
        await videoRef.current.play();
      } catch (err) {
        console.error("Error playing video:", err);

        if (err instanceof DOMException) {
          videoRef.current.muted = true;
          autoPlay();
        }
      }
    };

    videoElement?.addEventListener("ended", handleVideoEnd);

    // Just making sure all events are attached. The wait time is small enough to go unnoticed
    setTimeout(() => {
      autoPlay();
      if (videoElement) {
        videoElement.focus();
      }
    }, 350);

    return () => {
      videoElement?.removeEventListener("ended", handleVideoEnd);
    };
  }, []);

  // User interaction useEffect
  useEffect(() => {
    const timer = interactionTimer.current;

    const interactionEvents = [
      "mousemove",
      "mousedown",
      "keydown",
      "touchstart",
      "focus",
    ];

    document.addEventListener("keyup", handleButtonPress);

    interactionEvents.forEach((event) =>
      document.addEventListener(event, handleUserInteraction)
    );

    return () => {
      document.removeEventListener("keyup", handleButtonPress);

      interactionEvents.forEach((event) =>
        document.removeEventListener(event, handleUserInteraction)
      );

      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  const handleUserInteraction = useCallback(() => {
    setUIVisible(true);

    if (interactionTimer.current) {
      clearTimeout(interactionTimer.current);
    }

    // Set a new timer to hide the UI after 5 seconds
    interactionTimer.current = setTimeout(() => {
      setUIVisible(false);
    }, uiVisibilityDuration);
  }, []);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, []);

  const handleVideoEnd = useCallback(() => {
    onVideoEnd?.();
    handleUserInteraction();
  }, []);

  const handleButtonPress = useCallback((e: KeyboardEvent) => {
    if (!videoRef.current) return;

    if (e.key === " " || e.code === "Space") {
      togglePlay();
    }

    if (e.key === "Enter") {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }

    switch (e.keyCode) {
      case 412: // REWIND
        videoRef.current.currentTime = clamp(
          videoRef.current.currentTime - 10,
          0,
          videoRef.current.duration
        );
        break;
      case 417: // FAST-FORWARD
        videoRef.current.currentTime = clamp(
          videoRef.current.currentTime + 10,
          0,
          videoRef.current.duration
        );
        break;
      case 19: // PAUSE
      case 413: // STOP
        videoRef.current.pause();
        break;
      case 415: // PLAY
        videoRef.current.play();
        break;
      case 403: // RED BUTTON
        console.log("Red button not implemented");
        break;
      case 404: // GREEN BUTTON
        console.log("Green button not implemented");
        break;
      case 405: // YELLOW BUTTON
        console.log("Yellow button not implemented");
        break;
      case 406: // BLUE BUTTON
        console.log("Blue button not implemented");
        break;
    }

    handleUserInteraction();
  }, []);

  return (
    <div className="fixed inset-0 bg-black">
      <video
        className="w-full h-full z-10 object-contain aspect-video"
        controls={false}
        disablePictureInPicture
        src={sources[0].src}
        controlsList="nodownload"
        ref={videoRef}
      >
        Your browser does not support the video tag.
      </video>
      <VideoUI
        title={title}
        hidden={!uiVisible}
        videoRef={videoRef}
        onGoBack={onGoBack}
      />
    </div>
  );
}
