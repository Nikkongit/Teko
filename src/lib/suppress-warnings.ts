// Suppress hydration warnings from browser extensions
if (typeof window !== 'undefined') {
    const originalError = console.error;
    console.error = (...args) => {
        if (
            typeof args[0] === 'string' &&
            (args[0].includes('data-jetski-tab-id') ||
                args[0].includes('Hydration failed') ||
                args[0].includes('There was an error while hydrating'))
        ) {
            return;
        }
        originalError.apply(console, args);
    };
}

export { };
