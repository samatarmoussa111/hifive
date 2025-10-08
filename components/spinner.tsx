export function Spinner() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-4 border-border"></div>
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-foreground"></div>
      </div>
    </div>
  );
}
