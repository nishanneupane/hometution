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

            const images = Array.from(element.querySelectorAll("img"));
            await Promise.all(
                images.map((img) => {
                    if (img.complete) return Promise.resolve();
                    return new Promise((resolve, reject) => {
                        img.onload = resolve;
                        img.onerror = reject;
                    });
                })
            );

            // Clone to a neutral container
            const clone = element.cloneNode(true) as HTMLElement;
            clone.style.position = "absolute";
            clone.style.top = "-9999px";
            clone.style.left = "-9999px";
            clone.style.width = "400px";
            clone.style.height = "420px";
            clone.style.boxShadow = "none";
            clone.style.margin = "0";

            document.body.appendChild(clone);

            const canvas = await html2canvas(clone, {
                scale: 3,
                useCORS: true,
                logging: false,
                backgroundColor: "#ffffff",
            });

            document.body.removeChild(clone);

            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png", 1.0);
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
