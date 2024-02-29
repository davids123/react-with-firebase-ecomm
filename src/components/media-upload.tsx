import  { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { UploadCloud } from "lucide-react";
import { BASE_URL } from '@/config';
import { useAppSelector } from '@/redux/store/hooks';
import { selectAuth } from '@/redux/features/authSlice';

const MediaUpload = () => {
    const {token} = useAppSelector(selectAuth);    
    const [files,setFiles] = useState([] as any);
    
    

    const handleUpload = () => {
        console.log("file uploades");
        if (!files) {
            console.log("Please Select a file to upload");
            return;
        }

        const data = new FormData();
        [...files].forEach((media) => {
            data.append(`media`,media, media.name);
        })

        console.log(data);

        const uploadFile = async() => {
            fetch(`${BASE_URL}media`,{
                method:'POST',                
                body:data,
                headers:{                                    
                    "Authorization":`Bearer ${token}`,                    
                },
            })
            .then((response) => response.json())
            .then((data) => {
                console.log({ data });
            })
            .catch((error) => {
                console.error("Error uploading chunk:", error);
            });
        }
        uploadFile();

    }
    return (
        <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-10 w-10 text-muted-foreground"
                    viewBox="0 0 24 24"
                >
                    <circle cx="12" cy="11" r="1" />
                    <path d="M11 17a1 1 0 0 1 2 0c0 .5-.34 3-.5 4.5a.5.5 0 0 1-1 0c-.16-1.5-.5-4-.5-4.5ZM8 14a5 5 0 1 1 8 0" />
                    <path d="M17 18.5a9 9 0 1 0-10 0" />
                </svg>

                <h3 className="mt-4 text-lg font-semibold">No media added</h3>
                <p className="mb-4 mt-2 text-sm text-muted-foreground">
                    You have not added any media. Add one below.
                </p>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="sm" className="relative">
                            Add Media
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Podcast</DialogTitle>
                            <DialogDescription>
                                Copy and paste the podcast feed URL to import.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="url">Podcast URL</Label>
                                <input                                    
                                    type='file'                                                                                                     
                                    multiple
                                    accept="image/*"
                                    onChange={(e:any)=>setFiles(e.target.files)}
                                 />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={()=>{handleUpload()}}>
                                Upload Media
                                <UploadCloud />
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default MediaUpload