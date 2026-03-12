
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-6">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-teal-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-teal-500 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-3xl">💊</div>
      </div>
      <div className="text-center">
        <p className="text-xl font-handwriting text-teal-800 animate-pulse">
          마음 선생님이 고민을 듣고 처방전을 짓고 있어요...
        </p>
        <p className="text-sm text-teal-600 mt-2">잠시만 기다려주세요, 따뜻한 위로가 도착할 거예요.</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
