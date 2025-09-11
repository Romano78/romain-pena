'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, animate } from 'framer-motion';
import { splitText } from '@/lib/split-text';
import { cn } from '@/lib/utils';
import PropTypes from 'prop-types';

const Character = ({ char, progress, range }) => {
    const opacity = useTransform(progress, range, [0, 1]);
    const blur = useTransform(progress, range, [10, 0]);
    const filter = useTransform(() => `blur(${blur.get()}px)`);

    if (char.type === 'space') {
        return <span className="inline">{char.content}</span>;
    }

    return (
        <motion.span
            style={{
                filter,
                opacity,
            }}
            className="inline-block will-change-[filter,opacity] text-current"
        >
            {char.content}
        </motion.span>
    );
};

const TextRevealBlur = ({
    body = '',
    className = '',
    blockClassName = '',
    textClassName = 'h3',
    sticky = false,
    textCenter = false,
    tag: Tag = 'p',
    charsAnimated = 10,
    ...props
}) => {
    const targetRef = useRef(null);
    const wIndex = useRef(0);
    wIndex.current = 0;

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: sticky ? ['start end', 'end start'] : ['center end', 'end start'],
    });

    const isInView = useInView(targetRef, {
        margin: '0px 0px -1% 0px',
        once: false,
    });

    const inViewProgress = useMotionValue(0);

    const progress = sticky ? scrollYProgress : inViewProgress;

    useEffect(() => {
        if (sticky) return;
        animate(inViewProgress, isInView ? 1 : 0, { duration: isInView ? 2 : 1, ease: 'easeInOut' })
    }, [isInView, inViewProgress, sticky])

    if (!body?.trim()) {
        return null;
    }

    // Split the text by newlines first
    const lines = body.split('\n');
    const processedLines = lines.map((line, lineIndex) => {
        const { words, characters } = splitText(line);
        return { words, characters, lineIndex };
    });

    // Calculate total character count for animation timing
    const totalCharacters = processedLines.reduce(
        (acc, line) => acc + line.characters.length,
        0
    );

    return (
        <div
            ref={targetRef}
            className={cn('relative z-0 text-current', sticky ? 'h-[100vh]' : '', className)}
            {...props}
        >
            <div
                className={`${sticky ? 'sticky top-0 flex h-screen items-center justify-center' : ''} ${blockClassName}`}
            >
                <Tag className={textClassName}>
                    {processedLines.map(({ words, lineIndex }) => (
                        <React.Fragment key={lineIndex}>
                            <span
                                key={lineIndex}
                                className={` ${textCenter ? 'justify-center' : ''}`}
                            >
                                {words.map(
                                    ({ chars, type }, i) =>
                                        type === 'word' && (
                                            <span
                                                key={`${lineIndex}-${i}`}
                                                className="split-word inline-block [&:not(:last-child)]:mr-[0.2em]"
                                            >
                                                {chars.map((char) => {
                                                    const index = wIndex.current++;
                                                    const start = index / (totalCharacters * 1.8);
                                                    const end = start + charsAnimated / (totalCharacters * 2);

                                                    return (
                                                        <Character
                                                            key={`${lineIndex}-${index}`}
                                                            char={char}
                                                            progress={progress}
                                                            range={[start, end]}
                                                        />
                                                    );
                                                })}
                                            </span>
                                        )
                                )}
                            </span>
                            {/* Add line break if it's not the last line */}
                            {lineIndex < lines.length - 1 && (
                                <br className="whitespace-pre" />
                            )}
                        </React.Fragment>
                    ))}
                </Tag>
            </div>
        </div>
    );
};

Character.propTypes = {
    char: PropTypes.object,
    progress: PropTypes.object,
    range: PropTypes.array,
    sectionTheme: PropTypes.string,
};

TextRevealBlur.propTypes = {
    body: PropTypes.string,
    className: PropTypes.string,
    blockClassName: PropTypes.string,
    textClassName: PropTypes.string,
    sticky: PropTypes.bool,
    textCenter: PropTypes.bool,
};

export default TextRevealBlur;
