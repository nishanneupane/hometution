'use client';

import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { useState, useTransition } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { X } from "lucide-react";
import { Notice } from "@prisma/client";
import { deleteNotice, updateNotice } from "@/lib/actions/notice-actions";
import { UploadButton } from "@/lib/uploadthing";


type NoticesTableClientProps = {
    notice: Notice;
};

export function NoticesTableClient({ notice }: NoticesTableClientProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [text, setText] = useState(notice.text);
    const [photoUrls, setPhotoUrls] = useState<string[]>(
        Array.isArray(notice.photoUrls) ? notice.photoUrls as string[] : []
    );
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const handleEditOpen = () => {
        setIsEditModalOpen(true);
        setText(notice.text);
        setPhotoUrls(Array.isArray(notice.photoUrls) ? notice.photoUrls as string[] : []);
        setError(null);
    };

    const handleEditClose = () => {
        setIsEditModalOpen(false);
        setError(null);
    };

    const handleRemovePhotoUrl = (index: number) => {
        setPhotoUrls(photoUrls.filter((_, i) => i !== index));
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        startTransition(async () => {
            try {
                const formData = new FormData();
                formData.set('id', notice.id.toString());
                formData.set('text', text);
                formData.set('photoUrls', JSON.stringify(photoUrls));

                await updateNotice(formData);
                toast({
                    title: "Success",
                    description: "Notice updated successfully!",
                });
                handleEditClose();
            } catch (err: any) {
                setError(err.message || 'Failed to update notice.');
                toast({
                    title: "Error",
                    description: err.message || 'Failed to update notice.',
                    variant: "destructive",
                });
            }
        });
    };

    const handleDelete = async () => {
        startTransition(async () => {
            try {
                const formData = new FormData();
                formData.set('id', notice.id.toString());
                await deleteNotice(formData);
                toast({
                    title: "Success",
                    description: "Notice deleted successfully!",
                });
                setIsDeleteDialogOpen(false);
            } catch (err: any) {
                setError(err.message || 'Failed to delete notice.');
                toast({
                    title: "Error",
                    description: err.message || 'Failed to delete notice.',
                    variant: "destructive",
                });
            }
        });
    };

    return (
        <>
            <div className="flex space-x-2">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleEditOpen}
                    aria-label={`Edit notice ${notice.id}`}
                    disabled={isPending}
                >
                    <Edit className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsDeleteDialogOpen(true)}
                    aria-label={`Delete notice ${notice.id}`}
                    disabled={isPending}
                >
                    <Trash className="h-4 w-4" />
                </Button>
            </div>

            {/* Edit Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Edit Notice</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleEditSubmit} className="space-y-6">
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
                                disabled={isPending}
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
                                                    disabled={isPending}
                                                >
                                                    <X className="h-4 w-4 text-red-500" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                ) : null}
                                <div className="mt-4">
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
                                        disabled={isPending}
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
                                onClick={handleEditClose}
                                disabled={isPending}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isPending || !text}>
                                {isPending ? 'Updating...' : 'Update Notice'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Notice</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this notice? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isPending}
                        >
                            {isPending ? 'Deleting...' : 'Delete'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}