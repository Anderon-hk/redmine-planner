import { getDB } from '@/db/db';
import SettingForm from './Compoent/setting-form';

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const db = await getDB();
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