import { Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button"

interface MediaArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  media: any;
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

export function MediaArtwork({
  media,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: MediaArtworkProps) {
    console.log(media.images);
  return (
    <div className="grid grid-cols-4 gap-4 pt-4" {...props}>        
            {media?.images?.map((item:any,index:any)=>(
              
                    <div className="overflow-hidden rounded-md flex" key={index}>                       
                            <Card>
                                <CardContent>
                                    <img
                                        src={item?.url}
                                        //alt={album.name}
                                        width={width}
                                        height={height}
                                        className={cn(
                                            "h-auto w-auto object-cover transition-all hover:scale-105",
                                            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                                        )}
                                    />
                                </CardContent>
                                <CardFooter>
                                    <p>{item?.url.slice(0,20)+'...'}</p>
                                    <Button onClick={()=>navigator.clipboard.writeText(item?.url)} size="sm" className="px-3">
                                        <span className="sr-only">Copy</span>
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </CardFooter>
                            </Card>
                     </div>
                    
            ))}
            
    
    </div>
  )
}