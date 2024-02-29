import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons"
import { Separator } from "@/components/ui/separator";
import { useMediaListQuery } from "@/redux/services/mediaService";
import { useEffect, useState } from "react";
import { Media } from "@/redux/services/type";
import { MediaArtwork } from "@/components/media-artwork";
import MediaUpload from "@/components/media-upload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function MediaFiles() {
    const [media, setMedia] = useState<Media[]>([]);
    const [loading, setLoading] = useState(true);
    const { data: mediaData, isError } = useMediaListQuery();
    useEffect(() => {
        if(isError ){
          console.log(isError);
        }
        if (mediaData) {
            setMedia(mediaData);
        }
        setLoading(false);
    }, [mediaData,]);
    if (loading) {
        return <h1>Loading ...</h1>;
    }

    return (
        <>
            {/* <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Media</h2>
                        <p className="text-muted-foreground">
                            Here&apos;s a list of your tasks for media files !
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <MediaUpload />
                        <UserNav />
                    </div>
                </div>
                <Separator className="my-4" />
                <div className="relative" >

                    <ScrollArea>
                        <div className="flex space-x-4 pb-4">
                            {media.map((item) => (
                                <MediaArtwork
                                    key={item?._id}
                                    media={item}
                                    className="w-[250px]"
                                    aspectRatio="portrait"
                                    width={250}
                                    height={330}
                                />

                            ))}
                        </div>                        
                    </ScrollArea>
                </div>            



            </div> */}
            <Tabs defaultValue="media" className="h-full space-y-6">
                <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="media" className="relative">
                          Media
                        </TabsTrigger>
                        <TabsTrigger value="addmedia">Add Media</TabsTrigger>
                        <TabsTrigger value="live" disabled>
                          Live
                        </TabsTrigger>
                      </TabsList>
                      <div className="ml-auto mr-4">
                        <Button>
                          <PlusCircledIcon className="mr-2 h-4 w-4" />
                          Add music
                        </Button>
                      </div>
                </div>
                <TabsContent
                      value="media"
                      className="border-none p-0 outline-none"
                >
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Media Now
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Top picks for you. Updated daily.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      {media.map((item) => (
                            <MediaArtwork
                                key={item?._id}
                                media={item}
                                className="w-[250px]"
                                aspectRatio="portrait"
                                width={250}
                                height={250}
                            />
                    ))}
                               
                        

                </TabsContent>
                <TabsContent
                      value="addmedia"
                      className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            New Media
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Your favorite addmedia. Updated daily.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      {/* <PodcastEmptyPlaceholder /> */}
                      <MediaUpload />
                </TabsContent>
            </Tabs>
        </>
    );
}