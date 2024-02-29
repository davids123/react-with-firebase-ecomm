
import { Sidebar } from '@/components/sidebar';
import { playlists } from '@/data/playlists';
import { Outlet } from 'react-router-dom';
import { MenuHeader } from '@/components/header-menu';


const DefaultLayout = () => {
    
    return (
        //   <div className="flex h-screen overflow-hidden">
        //       {/* SideBar Start */}
        //       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        //       {/* Sidebar End */}
        //       {/* Content Area Start */}
        //       <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        //           {/* Header Start */}
        //           {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
        //           {/* End Header */}

        //           {/* Main Content Start */}
        //           <main>
        //               <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        //                   <Outlet />
        //               </div>
        //           </main>
        //           {/* Main Content End */}
        //       </div>
        //       {/* Content Area Start */}
        //   </div>
        <div className="relative flex min-h-screen flex-col hidden md:block">
            {/* <Menu /> */}
            <MenuHeader />
            <div className="border-t">
                <div className="bg-background">
                    <div className="grid lg:grid-cols-5">
                        <Sidebar playlists={playlists} className="fixed top-14 z-30 -ml-2 hidden lg:block h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block" />
                        <div className="col-span-3 lg:col-span-4 lg:border-l">
                            <div className="h-full px-4 py-6 lg:px-8">
                                {/* <Tabs defaultValue="music" className="h-full space-y-6">
                                    <div className="space-between flex items-center">
                                        <TabsList>
                                            <TabsTrigger value="music" className="relative">
                                                Music
                                            </TabsTrigger>
                                            <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
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
                                        value="music"
                                        className="border-none p-0 outline-none"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <h2 className="text-2xl font-semibold tracking-tight">
                                                    Listen Now
                                                </h2>
                                                <p className="text-sm text-muted-foreground">
                                                    Top picks for you. Updated daily.
                                                </p>
                                            </div>
                                        </div>
                                        <Separator className="my-4" />
                                        <div className="relative">
                                            <ScrollArea>
                                                <div className="flex space-x-4 pb-4">
                                                    {listenNowAlbums.map((album) => (
                                                        <AlbumArtwork
                                                            key={album.name}
                                                            album={album}
                                                            className="w-[250px]"
                                                            aspectRatio="portrait"
                                                            width={250}
                                                            height={330}
                                                        />
                                                    ))}
                                                </div>
                                                <ScrollBar orientation="horizontal" />
                                            </ScrollArea>
                                        </div>
                                        <div className="mt-6 space-y-1">
                                            <h2 className="text-2xl font-semibold tracking-tight">
                                                Made for You
                                            </h2>
                                            <p className="text-sm text-muted-foreground">
                                                Your personal playlists. Updated daily.
                                            </p>
                                        </div>
                                        <Separator className="my-4" />
                                        <div className="relative">
                                            <ScrollArea>
                                                <div className="flex space-x-4 pb-4">
                                                    {madeForYouAlbums.map((album) => (
                                                        <AlbumArtwork
                                                            key={album.name}
                                                            album={album}
                                                            className="w-[150px]"
                                                            aspectRatio="square"
                                                            width={150}
                                                            height={150}
                                                        />
                                                    ))}
                                                </div>
                                                <ScrollBar orientation="horizontal" />
                                            </ScrollArea>
                                        </div>
                                    </TabsContent>
                                    <TabsContent
                                        value="podcasts"
                                        className="h-full flex-col border-none p-0 data-[state=active]:flex"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <h2 className="text-2xl font-semibold tracking-tight">
                                                    New Episodes
                                                </h2>
                                                <p className="text-sm text-muted-foreground">
                                                    Your favorite podcasts. Updated daily.
                                                </p>
                                            </div>
                                        </div>
                                        <Separator className="my-4" />
                                        <PodcastEmptyPlaceholder />
                                    </TabsContent>
                                </Tabs> */}
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DefaultLayout