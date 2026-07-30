import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import axios from 'axios';

export default function StudentScreen({ route }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // For demo, fetch student/me will fail without token; this is a placeholder
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>Student Dashboard (demo)</Text>
      <Text>Use Expo to open this app and implement auth token storage.</Text>
    </View>
  );
}
