import SettingForm from './Compoent/setting-form';
import { db } from '@/db/db';

// const SettingForm = dynamic(() => import('./Compoent/setting-form'), {
//   ssr: false
// })

export default async function SettingsPage() {
  await db.read();
  const settings = db.data.settings

  return (
    <>
      <div>
       <SettingForm initialSettings={settings} />
      </div>
    </>
  );
}