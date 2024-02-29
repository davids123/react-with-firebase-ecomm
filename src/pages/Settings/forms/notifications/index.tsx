import { Separator } from "@/components/ui/separator"
import { NotificationsForm } from "./notifications-form"
import SettingFormLayout from "../../SettingFormLayout"


export default function SettingsNotificationsPage() {
  return (
    <>
        <SettingFormLayout>
            <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Notifications</h3>
                <p className="text-sm text-muted-foreground">
                Configure how you receive notifications.
                </p>
            </div>
            <Separator />
            <NotificationsForm />
            </div>
        </SettingFormLayout>
    </>
  )
}