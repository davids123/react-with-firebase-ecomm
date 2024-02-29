import { Separator } from "@/components/ui/separator"
import { DisplayForm } from "./display-form"
import SettingFormLayout from "../../SettingFormLayout"


export default function SettingsDisplayPage() {
  return (
    <>
        <SettingFormLayout>
            <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Display</h3>
                <p className="text-sm text-muted-foreground">
                Turn items on or off to control what&apos;s displayed in the app.
                </p>
            </div>
            <Separator />
            <DisplayForm />
            </div>
        </SettingFormLayout>
    </>
  )
}