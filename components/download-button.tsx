'use client';

import { Button } from '@/components/ui/button';
import html2canvas from 'html2canvas';
import React from 'react';

interface DownloadButtonProps {
    vacancyId: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ vacancyId }) => {
    const handleDownload = async () => {
        const element = document.getElementById("vacancy-card");
        if (!element) return;

        try {
            await document.fonts.ready;

            // Make sure all images are loaded
            const images = Array.from(element.querySelectorAll("img"));
            await Promise.all(
                images.map((img) =>
                    img.complete
                        ? Promise.resolve()
                        : new Promise((resolve, reject) => {
                            img.onload = resolve;
                            img.onerror = reject;
                        })
                )
            );

            // Clone node without forcing width/height
            const clone = element.cloneNode(true) as HTMLElement;
            clone.style.position = "fixed";
            clone.style.top = "-9999px";
            clone.style.left = "-9999px";
            clone.style.margin = "0";
            clone.style.boxShadow = "none"; // prevents double shadows in export
            document.body.appendChild(clone);

            // Use the real element’s bounding box
            const rect = element.getBoundingClientRect();
            clone.style.width = `${rect.width}px`;
            clone.style.height = `${rect.height}px`;

            const canvas = await html2canvas(clone, {
                scale: 2, // 2 is usually sharp enough; 3 can balloon file size
                useCORS: true,
                backgroundColor: "#ffffff",
            });

            document.body.removeChild(clone);

            // Trigger download
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = `vacancy-${vacancyId}.png`;
            link.click();
        } catch (error) {
            console.error("Error generating canvas:", error);
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
