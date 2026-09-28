import { ReactNode } from "react";

interface MobileFrameProps {
  children: ReactNode;
  showStatusBar?: boolean;
}

const MobileFrame = ({ children, showStatusBar = true }: MobileFrameProps) => {
  return (
    <div className="device-frame w-[280px] h-[580px] mx-auto">
      {/* Notch */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-900 rounded-full z-10" />
      
      <div className="device-screen h-full flex flex-col">
        {showStatusBar && (
          <div className="status-bar bg-background text-foreground pt-8">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 border border-foreground rounded-sm">
                <div className="w-3 h-1 bg-foreground rounded-sm" />
              </div>
            </div>
          </div>
        )}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
        {/* Home indicator */}
        <div className="h-8 flex items-center justify-center bg-background">
          <div className="w-32 h-1 bg-foreground/20 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default MobileFrame;
