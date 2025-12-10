import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ViewportManager() {
    const location = useLocation();

    useEffect(() => {
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (!viewportMeta) return;

        if (location.pathname === '/report') {
            // Mobile-friendly for the report page
            viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0');
        } else {
            // Forced desktop for presentation slides
            viewportMeta.setAttribute('content', 'width=1280');
        }
    }, [location]);

    return null;
}
