'use client';

import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useState, useTransition } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { UploadButton } from "@/lib/uploadthing";
import { createNotice } from "@/lib/actions/notice-actions";

export function NoticesHeader() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [text, setText] = useState('');
    const [photoUrls, setPhotoUrls] = useState<string[]>([]);
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const handleAddNotice = () => {
        setIsModalOpen(true);
        setError(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setText('');
        setPhotoUrls([]);
        setError(null);
    };

    const handleRemovePhotoUrl = (index: number) => {
        setPhotoUrls(photoUrls.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        startTransition(async () => {
            try {
                const formData = new FormData();
                formData.set('text', text);
                formData.set('photoUrls', JSON.stringify(photoUrls));

                await createNotice(formData);
                toast({
                    title: "Success",
                    description: "Notice created successfully!",
                });
                handleCloseModal();
            } catch (err: any) {
                setError(err.message || 'Failed to create notice.');
                toast({
                    title: "Error",
                    description: err.message || 'Failed to create notice.',
                    variant: "destructive",
                });
            }
        });
    };

    return (
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Notices</h1>
            <Button onClick={handleAddNotice} className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> Add Notice
            </Button>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Create New Notice</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="text" className="text-sm font-medium">
                                Notice Text
                            </Label>
                            <Textarea
                                id="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Enter notice text..."
                                className="min-h-[100px]"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Upload Photos</Label>
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center relative">
                                {photoUrls.length > 0 ? (
                                    <div className="flex flex-wrap gap-4 justify-center">
                                        {photoUrls.map((url, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={url}
                                                    alt={`Uploaded image ${index + 1}`}
                                                    className="w-24 h-24 object-contain rounded"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleRemovePhotoUrl(index)}
                                                    className="absolute top-0 right-0 p-1 rounded-full hover:bg-red-100"
                                                >
                                                    <X className="h-4 w-4 text-red-500" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                ) : null}
                                <div className={cn("mt-4", photoUrls.length > 0 && "mt-6")}>
                                    <UploadButton
                                        endpoint="image"
                                        onClientUploadComplete={(res) => {
                                            if (res && res[0]) {
                                                setPhotoUrls([...photoUrls, res[0].url]);
                                                setError(null);
                                            }
                                        }}
                                        onUploadError={(err) => {
                                            setError('Failed to upload image.');
                                            toast({
                                                title: "Error",
                                                description: 'Failed to upload image.',
                                                variant: "destructive",
                                            });
                                        }}
                                        appearance={{
                                            button: "bg-blue-600 border border-input text-background hover:bg-blue-700 w-full",
                                            allowedContent: "text-muted-foreground text-sm",
                                        }}
                                        content={{
                                            button({ ready }) {
                                                return ready ? "Upload Image" : "Uploading...";
                                            },
                                            allowedContent({ ready }) {
                                                return ready ? "PNG, JPG, JPEG, GIF (max 4MB)" : "Processing...";
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <p className="text-sm text-red-600" role="alert">
                                {error}
                            </p>
                        )}

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCloseModal}
                                disabled={isPending}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isPending || !text}>
                                {isPending ? 'Creating...' : 'Create Notice'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}