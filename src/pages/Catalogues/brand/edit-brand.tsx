import { Separator } from "@/components/ui/separator";



export default function EditBrand(){
    return(
        <>
        <div className="hidden space-y-6 p-10 pb-16 md:block">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">Brand Edit</h2>
                    <p className="text-muted-foreground">
                        Manage your catalogue settings and brand preferences.
                    </p>
                </div>
                <Separator className="my-6" />
                {/* form start */}

                {/* endform */}
        </div>
        </>
    )
}