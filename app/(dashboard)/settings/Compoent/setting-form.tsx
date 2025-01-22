'use client'

import { Data } from '@/db/db';
import { updateSettings } from '@/db/settings-action';
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, TextareaAutosize } from '@mui/material';

export default function SettingForm({ initialSettings }: { initialSettings: Data['settings'] }) {
  const [url, setUrl] = useState(initialSettings.url || '');
  const [token, setToken] = useState(initialSettings.apiToken || '');

  const updateSettingsHandler = async (event: Event) => {
    event.preventDefault();
    await updateSettings({
      url: url,
      apiToken: token,
    });
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
            onChange={(e) => setUrl(e.target.value)}
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
        <Button variant="contained" color="primary" type="submit"
          onClick={(e) => updateSettingsHandler(e.nativeEvent)}
        >
          Update Settings
        </Button>
      </form>
    </Container>
  );
}