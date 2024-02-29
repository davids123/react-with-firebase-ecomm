
import { Separator } from '@/components/ui/separator'

import SettingFormLayout from './SettingFormLayout'
import { ProfileForm } from './forms/profile/profile-form'




const Settings = () => {
  return (
    <>
      <SettingFormLayout>
        <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Profile</h3>
              <p className="text-sm text-muted-foreground">
                This is how others will see you on the site.
              </p>
            </div>
            <Separator />
            <ProfileForm />
          </div>
      </SettingFormLayout>
      
    </>
  )
}

export default Settings