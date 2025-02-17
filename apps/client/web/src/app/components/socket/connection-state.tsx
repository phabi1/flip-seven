export type ConnectionStateProps = {
  isConnected: boolean;
};

export default function ConnectionState({ isConnected }: ConnectionStateProps) {
  return (
    <div className="fixed left-4 bottom-4">
      {isConnected ? 'Connected' : 'Disconnected'}
    </div>
  );
}
