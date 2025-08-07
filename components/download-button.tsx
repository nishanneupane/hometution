'use client';

import { Button } from '@/components/ui/button';
import html2canvas from 'html2canvas';
import React, { useEffect } from 'react';

interface DownloadButtonProps {
    vacancyId: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ vacancyId }) => {

    const handleDownload = async () => {
        const element = document.getElementById("vacancy-card");

        if (element) {
            try {
                element.style.transform = "scale(1)";
                void element.offsetHeight;

                const canvas = await html2canvas(element, {
                    scale: 3,
                    useCORS: true,
                    logging: false,
                    backgroundColor: "#ffffff",
                    allowTaint: true,
                });

                const link = document.createElement("a");
                link.href = canvas.toDataURL("image/jpeg", 1.0); // JPG output
                link.download = `vacancy-${vacancyId}.jpg`;
                link.click();
            } catch (error) {
                console.error("Error generating canvas:", error);
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