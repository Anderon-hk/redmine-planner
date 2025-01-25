import SettingForm from './Compoent/setting-form';
import { db } from '@/db/db';

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