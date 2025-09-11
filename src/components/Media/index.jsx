'use client';

import { useRef, useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import Image from 'next/image';
import ParallaxImage from '@/components/ParallaxImage';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * List of supported video file extensions
 */
const videoExtensions = [
    '.mp4',
    '.webm',
    '.ogg',
    '.mov',
    '.avi',
    '.wmv',
    '.flv',
    '.mkv',
];

/**
 * Checks if a given URL points to a video file
 * @param {string} url - The URL to check
 * @returns {boolean} True if the URL ends with a supported video extension
 */
const isVideo = (url) => {
    return videoExtensions.some((ext) => url?.toLowerCase().endsWith(ext));
};

/**
 * Extracts YouTube video ID from various YouTube URL formats
 * @param {string} url - YouTube URL (can be full URL, shortened URL, or embed URL)
 * @returns {string|boolean} YouTube video ID if valid, false otherwise
 */
const getYoutubeId = (url) => {
    if (!url) return false;
    const regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
};

/**
 * A versatile media component that handles images, videos, and YouTube content
 * with support for autoplay, parallax effects, and custom controls.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.file=''] - Path to media file (image or video)
 * @param {boolean} [props.autoplay=false] - Enable autoplay for videos
 * @param {string} [props.youtubeLink=''] - YouTube video URL
 * @param {boolean} [props.parallax=false] - Enable parallax effect for images
 * @param {boolean} [props.controls=true] - Show video controls
 * @param {string} [props.className=''] - Additional CSS classes
 */
const Media = ({
    file = '',
    autoplay = false,
    youtubeLink = '',
    parallax = false,
    controls = true,
    overlay = false,
    className = '',
    containerClassName = '',
    videoBackground = false,
    ...props
}) => {
    // Store video element reference and states
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(autoplay);
    const [isMuted, setIsMuted] = useState(true);
    const [isHovering, setIsHovering] = useState(false);

    // Initialize video state when mounted
    useEffect(() => {
        if (videoRef.current) {
            setIsPlaying(!videoRef.current.paused);
            setIsMuted(videoRef.current.muted);
        }
    }, []);

    // Determine media type and configuration
    const isVideoBackground = youtubeLink || videoBackground || isVideo(file);
    const isAutoplay = autoplay;
    const isParallax = parallax;
    const youtubeVideoId = getYoutubeId(youtubeLink);
    const showControls = controls && isVideoBackground;

    // Configure autoplay properties for video elements
    const autoplayProps = isAutoplay
        ? { autoPlay: true, loop: true, muted: true }
        : {};


    const classes = 'absolute top-0 left-0 z-[0] h-full w-full object-cover'


    // Return early if no media source is provided
    if (!file && !youtubeLink) {
        return null;
    }

    /**
     * Stores YouTube player reference when ready
     * @param {Object} event - YouTube player ready event
     */
    const onYoutubeReady = (event) => {
        videoRef.current = event.target;
        setIsPlaying(event.target.playerInfo.playerState === 1);
        setIsMuted(event.target.isMuted());
    };

    /**
     * Handles play/pause button clicks for both YouTube and native videos
     * @param {Event} e - Click event
     */
    const onPlayClick = (e) => {
        e.stopPropagation();
        if (youtubeVideoId) {
            if (videoRef.current?.playerInfo?.playerState === 1) {
                videoRef.current.pauseVideo();
            } else {
                videoRef.current.playVideo();
            }
        } else {
            if (videoRef.current?.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current?.pause();
                setIsPlaying(false);
            }
        }
    };

    /**
     * Handles mute/unmute button clicks
     * @param {Event} e - Click event
     */
    const onMuteClick = (e) => {
        e.stopPropagation();
        if (youtubeVideoId) {
            if (videoRef.current?.isMuted()) {
                videoRef.current.unMute();
                setIsMuted(false);
            } else {
                videoRef.current?.mute();
                setIsMuted(true);
            }
        } else {
            if (videoRef.current) {
                videoRef.current.muted = !videoRef.current.muted;
                setIsMuted(videoRef.current.muted);
            }
        }
    };

    /**
     * Updates playing state based on YouTube player state changes
     * @param {Object} event - YouTube player state change event
     */
    const onYoutubeStateChange = (event) => {
        setIsPlaying(event.data === 1);
    };

    // Common control buttons
    const ControlButton = ({ onClick, icon: Icon }) => (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="hover:text-primary text-white transition-colors"
        >
            <Icon size={20} />
        </motion.button>
    );

    // Common control wrapper with shared styles
    const ControlsWrapper = ({ children, animate = false }) => {
        const commonClasses =
            'absolute bottom-0 left-0 right-0 z-[1] p-4 flex items-center gap-2 bg-gradient-to-t from-black/50 to-transparent';

        if (animate) {
            return (
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className={commonClasses}
                >
                    {children}
                </motion.div>
            );
        }

        return <div className={commonClasses}>{children}</div>;
    };

    // Static controls for YouTube and non-autoplay videos
    const StaticControls = () => (
        <ControlsWrapper>
            <ControlButton onClick={onPlayClick} icon={isPlaying ? Pause : Play} />
            <ControlButton onClick={onMuteClick} icon={isMuted ? VolumeX : Volume2} />
        </ControlsWrapper>
    );

    // Animated controls for autoplay videos
    const AnimatedControls = () => (
        <AnimatePresence>
            {isHovering && (
                <ControlsWrapper animate>
                    <ControlButton
                        onClick={onPlayClick}
                        icon={isPlaying ? Pause : Play}
                    />
                    <ControlButton
                        onClick={onMuteClick}
                        icon={isMuted ? VolumeX : Volume2}
                    />
                </ControlsWrapper>
            )}
        </AnimatePresence>
    );

    // Main controls component that decides which version to render
    const Controls = () => {
        if (!showControls) return null;
        return youtubeVideoId || !isAutoplay ? (
            <StaticControls />
        ) : (
            <AnimatedControls />
        );
    };

    // Render video content (YouTube or native)
    if (isVideoBackground) {
        return (
            <div
                className={cn("relative h-full min-h-[300px] w-full", containerClassName)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                {youtubeLink ? (
                    <YouTube
                        videoId={youtubeVideoId}
                        opts={{
                            height: '100%',
                            width: '100%',
                            playerVars: {
                                autoplay: isAutoplay ? 1 : 0,
                                loop: isAutoplay ? 1 : 0,
                                playlist: youtubeVideoId,
                                controls: 0,
                                mute: isAutoplay ? 1 : 0,
                                modestbranding: 1,
                                showinfo: 0,
                                rel: 0,
                                iv_load_policy: 3,
                                disablekb: 1,
                            },
                        }}
                        className={classes}
                        onReady={onYoutubeReady}
                        onStateChange={onYoutubeStateChange}
                    />
                ) : (
                    <video
                        ref={videoRef}
                        {...autoplayProps}
                        playsInline
                        className={classes}
                        alt="background"
                        src={file}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onLoadedMetadata={() => {
                            setIsPlaying(!videoRef.current.paused);
                            setIsMuted(videoRef.current.muted);
                        }}
                    />
                )}
                <Controls />
                {overlay && <div className="absolute inset-0 bg-overlay"></div>}
            </div>
        );
    }

    // Render image with parallax effect
    if (isParallax) {
        return (
            <div className={`min-h-[300px] ${containerClassName}`}>
                <ParallaxImage
                    fill={true}
                    className={classes}
                    img={file}
                    alt="background"
                    priority
                />
                {overlay && <div className="absolute inset-0 bg-overlay"></div>}
            </div>
        );
    }

    // Render static image using Next.js Image component
    return (
        <div className={`min-h-[300px] ${containerClassName}`}>
            <Image
                src={file}
                alt="background"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 1200px, 4000px"
                className={`transform-gpu ${className}`}
                quality={100}
                priority
                {...props}
            />
            {overlay && <div className="absolute inset-0 bg-overlay"></div>}
        </div>
    );
};

Media.propTypes = {
    file: PropTypes.string,
    autoplay: PropTypes.bool,
    youtubeLink: PropTypes.string,
    parallax: PropTypes.bool,
    controls: PropTypes.bool,
    overlay: PropTypes.bool,
    className: PropTypes.string,
    containerClassName: PropTypes.string,
    videoBackground: PropTypes.bool
};

export default Media;
