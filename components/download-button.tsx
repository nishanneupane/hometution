'use client';

import { Button } from '@/components/ui/button';
import html2canvas from 'html2canvas';
import React, { useEffect } from 'react';

interface DownloadButtonProps {
    vacancyId: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ vacancyId }) => {
    useEffect(() => {
        // Ensure all fonts and images are loaded before allowing download
        document.fonts.ready.then(() => {
            console.log('Fonts loaded');
        });
    }, []);

    const handleDownload = async () => {
        const element = document.getElementById('vacancy-card');
        if (element) {
            try {
                const canvas = await html2canvas(element, {
                    scale: 2,
                    useCORS: true, // Allow cross-origin images
                    logging: false,
                    backgroundColor: '#ffffff', // Ensure white background
                    allowTaint: true, // Allow tainted canvas for cross-origin
                });
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = `vacancy-${vacancyId}.png`;
                link.click();
            } catch (error) {
                console.error('Error generating canvas:', error);
            }
        }
    };

    return (
        <Button
            size="sm"
            className="text-sm px-4 py-1.5 bg-gray-800 hover:bg-gray-900 text-white"
            onClick={handleDownload}
        >
            Download as PNG
        </Button>
    );
};

export default DownloadButton;