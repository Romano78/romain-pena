export function splitText(text) {
    let lines = text.split('\n');
    if (lines.length === 1) {
        lines = text.split('\\n');
    }
    const words = text.split(/(\s+)/).filter(Boolean);
    const characters = text.split('');

    return {
        lines: lines.map((line) => ({
            type: 'line',
            content: line,
            words: line.split(' ').map((word) => ({
                type: word.trim() === '' ? 'space' : 'word',
                content: word,
            })),
        })),
        words: words.map((word) => ({
            type: word.trim() === '' ? 'space' : 'word',
            content: word,
            chars: word.split('').map((char) => ({
                type: char.trim() === '' ? 'space' : 'character',
                content: char,
            })),
        })),
        characters: characters.map((char) => ({
            type: char.trim() === '' ? 'space' : 'character',
            content: char,
        })),
    };
}
