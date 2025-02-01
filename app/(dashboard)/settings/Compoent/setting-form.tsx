'use client'

import { updateSettings } from '@/db/settings-action';
import React, { useEffect, useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import { Data } from '@/db/db-typing';

export default function SettingForm({ initialSettings }: { initialSettings: Data['settings'] }) {
  const [url, setUrl] = useState(initialSettings.url || '');
  const [token, setToken] = useState(initialSettings.apiToken || '');
  const [weeklyHourLowerWarning, setWeeklyHourLowerWarning] = useState(initialSettings.weeklyHourLowerWarning || undefined);
  const [weeklyHourUpperWarning, setWeeklyHourUpperWarning] = useState(initialSettings.weeklyHourUpperWarning || undefined);
  // const {settings, setHost, setWeeklyHourLowerWarning, setWeeklyHourUpperWarning} = useSettingStore();

  const updateSettingsHandler = async (event: Event) => {
    event.preventDefault();
    let origin = ''
    try {
      const urlObj = new URL(url);
      origin = urlObj.origin;
    }catch(e) {}

    await updateSettings({
      url: url,
      apiToken: token,
      redmineHost: origin,
      weeklyHourLowerWarning: weeklyHourLowerWarning,
      weeklyHourUpperWarning: weeklyHourUpperWarning
    });

    const settingsObj = {
      redmineHost: origin,
      weeklyHourLowerWarning: weeklyHourLowerWarning,
      weeklyHourUpperWarning: weeklyHourUpperWarning
    }

    localStorage.setItem('redmine_planner_settings', JSON.stringify(settingsObj));
    alert('Settings updated successfully');
  };

  return (
    <Container>
      <form>
        <div>
          <TextField
            label="API URL"
            variant="outlined"
            fullWidth
            margin="normal"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            type="text"
          />
        </div>
        <div>
          <TextField
            label="API Token"
            variant="outlined"
            fullWidth
            margin="normal"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            type="password"
          />
        </div>
        <div>
          <TextField
            label="Weekly Hours Upper Alert"
            variant="outlined"
            fullWidth
            margin="normal"
            value={weeklyHourUpperWarning || ''}
            onChange={
              (e) => {
                let hrs : number|undefined = Number(e.target.value)
                if(isNaN(hrs)) {
                  hrs = undefined
                }
                setWeeklyHourUpperWarning(hrs)
              }
            }
            type="number"
          />
        </div>
        <div>
          <TextField
            label="Weekly Hours Lower Alert"
            variant="outlined"
            fullWidth
            margin="normal"
            value={weeklyHourLowerWarning || ''}
            onChange={
              (e) => {
                let hrs : number|undefined = Number(e.target.value)
                if(isNaN(hrs)) {
                  hrs = undefined
                }
                setWeeklyHourLowerWarning(hrs)
              }
            }
            type="number"
          />
        </div>
        <Button variant="contained" color="primary" type="submit"
          onClick={(e) => updateSettingsHandler(e.nativeEvent)}
        >
          Update Settings
        </Button>
      </form>
    </Container>
  );
}