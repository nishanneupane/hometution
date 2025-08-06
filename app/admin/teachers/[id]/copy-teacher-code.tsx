'use client';

import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import React, { useState } from 'react';

interface CopyTeacherCodeButtonProps {
    teacherCode: string;
}

const CopyTeacherCodeButton: React.FC<CopyTeacherCodeButtonProps> = ({ teacherCode }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(teacherCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        } catch (error) {
            console.error('Failed to copy teacher code:', error);
        }
    };

    return (
        <Button
            size="sm"
            variant="outline"
            className="text-sm px-2 py-1 h-7"
            onClick={handleCopy}
            title={copied ? 'Copied!' : 'Copy Teacher Code'}
        >
            <Copy className="h-4 w-4" />
            {copied && <span className="ml-1 text-xs">Copied!</span>}
        </Button>
    );
};

export default CopyTeacherCodeButton;