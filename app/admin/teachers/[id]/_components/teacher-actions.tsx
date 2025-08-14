"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, MessageSquare } from "lucide-react";
import { approveTeacher, sendMessageToTeachers } from "@/lib/actions/teacher-actions";
import { toast } from "sonner";
import { UploadButton } from "@/lib/uploadthing";
import { X } from "lucide-react";

interface TeacherActionsProps {
    teacher: {
        id: string;
        name: string;
        isApproved: boolean;
    };
}

export default function TeacherActions({ teacher }: TeacherActionsProps) {
    const [messageOpen, setMessageOpen] = useState(false);
    const [customMessage, setCustomMessage] = useState("");
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

    const handleApprove = async () => {
        const result = await approveTeacher(teacher.id);
        if (result.success) {
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }
    };

    const handleConfirmSendMessage = async () => {
        if (!customMessage.trim() && !imageUrl) {
            toast.error("Please provide a message or an image.");
            return;
        }

        const result = await sendMessageToTeachers([teacher.id], customMessage, imageUrl);
        if (result.success) {
            toast.success(`Message sent to ${teacher.name} successfully!`);
        } else {
            toast.error(result.message);
        }
        setMessageOpen(false);
        setCustomMessage("");
        setImageUrl(undefined);
    };

    return (
        <>
            <div className="flex space-x-2">
                {!teacher.isApproved && (
                    <Button
                        size="sm"
                        onClick={handleApprove}
                        className="bg-green-600 hover:bg-green-700 text-white"
                    >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                    </Button>
                )}
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setMessageOpen(true)}
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Send Message
                </Button>
            </div>

            <Dialog open={messageOpen} onOpenChange={setMessageOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Send Message to {teacher.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Custom Message (required if no image)</Label>
                            <Textarea
                                value={customMessage}
                                onChange={(e) => setCustomMessage(e.target.value)}
                                placeholder="Enter your custom message"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Upload Image (required if no message)</Label>
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center relative">
                                {imageUrl ? (
                                    <>
                                        <img
                                            src={imageUrl}
                                            alt="Uploaded image"
                                            className="w-full max-h-48 object-contain mx-auto rounded"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setImageUrl(undefined)}
                                            className="absolute top-2 right-2 p-1 rounded-full hover:bg-red-100"
                                        >
                                            <X className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <UploadButton
                                            endpoint="image"
                                            onClientUploadComplete={(res) => {
                                                if (res && res[0]) {
                                                    setImageUrl(res[0].url);
                                                }
                                            }}
                                            onUploadError={(err) => console.error(err)}
                                            appearance={{
                                                button: "bg-blue-600 border border-input text-background hover:bg-blue-700",
                                            }}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setMessageOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmSendMessage}>Send</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}