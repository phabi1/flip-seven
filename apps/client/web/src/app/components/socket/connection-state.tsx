export type ConnectionStateProps = {
  isConnected: boolean;
};

export default function ConnectionState({ isConnected }: ConnectionStateProps) {
  return <div>{isConnected ? 'Connected' : 'Disconnected'}</div>;
}
