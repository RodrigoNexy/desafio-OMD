import { memo } from "react";

interface LoadingProps {
  fullScreen?: boolean;
}

export const Loading = memo<LoadingProps>(({ fullScreen = false }) => {
  const spinner = (
    <div className="inline-block w-10 h-10 border-4 border-surface rounded-full border-t-accent animate-spin" />
  );

  if (fullScreen) {
    return (
      <div className="flex justify-center items-center p-8 w-full h-screen bg-background">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-8 w-full">
      {spinner}
    </div>
  );
});

Loading.displayName = "Loading";
