const COOKIE_NAME = 'chat_d';


export const expireToken = (clientId) => {
    document.cookie = `${COOKIE_NAME}-${clientId}=;expires=${(new Date()).toUTCString()};`;
};

export const isMobile = () => window.innerWidth < 600;
export const isTablet = () => window.innerWidth > 600 && window.innerWidth < 768;
export const isDesktop = () => window.innerWidth > 768;
export const isPortraitMode = () => window.innerHeight > window.innerWidth;

export const allowedAttrTypes = ['STRING', 'NUMBER', 'BOOLEAN', 'JSON'];

// TODO: use a library for this
export const makeDomainMatcher = (actualDomain) => {
    const [actualHost, actualPort] = actualDomain.split(':');
    const actualDomainParts = actualHost.split('.');
    return (allowedDomain) => {
        const [allowedHost, allowedPort] = allowedDomain.split(':');

        // check the ports first if both are there
        if (allowedPort && actualPort && allowedPort !== actualPort) {
            return false;
        }

        const allowedDomainParts = allowedHost.split('.');
        // eslint-disable-next-line max-len
        const matched = allowedDomainParts.length && allowedDomainParts.reduceRight((matchedSoFar, part, index) => matchedSoFar && part === actualDomainParts[index], true);
        return matched;
    };
};
