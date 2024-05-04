import { Stack } from 'expo-router';

export default function Layout({ children }) {
  return (
    <Stack>
      {children}
    </Stack>
  );
}