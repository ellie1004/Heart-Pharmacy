
import React from 'react';
import { Prescription } from '../types';

interface PrescriptionCardProps {
  prescription: Prescription;
  nickname: string;
  onReset: () => void;
}

const PrescriptionCard: React.FC<PrescriptionCardProps> = ({ prescription, nickname, onReset }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden animate-fade-in border-4 border-rose-50">
      {/* Header Bag Design */}
      <div className="bg-rose-100 p-6 flex flex-col items-center justify-center border-b-2 border-dashed border-rose-200">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-sm mb-2">💝</div>
        <h2 className="text-2xl font-handwriting text-rose-800">마음 약국 처방전</h2>
        <p className="text-sm text-rose-600 mt-1">대상: {nickname} 님</p>
      </div>

      <div className="p-8 space-y-8">
        {/* Section: Empathy */}
        <section className="bg-orange-50 p-5 rounded-2xl border-l-4 border-orange-300">
          <h3 className="text-lg font-bold text-orange-800 mb-2 flex items-center">
            <span className="mr-2">💬</span> 공감의 한 마디
          </h3>
          <p className="text-orange-900 leading-relaxed font-handwriting text-xl">
            {prescription.empathy}
          </p>
        </section>

        {/* Section: NVC Script */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-teal-800 mb-2 flex items-center">
            <span className="mr-2">🤝</span> 마음을 전하는 법 (NVC 처방)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-teal-50 p-4 rounded-xl">
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">1. 관찰</span>
              <p className="text-teal-900 text-sm mt-1">{prescription.nvcScript.observation}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">2. 느낌</span>
              <p className="text-blue-900 text-sm mt-1">{prescription.nvcScript.feeling}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl">
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">3. 욕구</span>
              <p className="text-purple-900 text-sm mt-1">{prescription.nvcScript.need}</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">4. 부탁</span>
              <p className="text-emerald-900 text-sm mt-1">{prescription.nvcScript.request}</p>
            </div>
          </div>
          <div className="mt-4 bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-200 italic text-center">
            <p className="text-gray-500 text-xs mb-2">이렇게 한번 말해볼까요?</p>
            <p className="text-gray-800 font-medium text-lg leading-relaxed">
              "{prescription.nvcScript.fullMessage}"
            </p>
          </div>
        </section>

        {/* Section: Vitamin Quote */}
        <section className="bg-yellow-50 p-6 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10 text-6xl">🍋</div>
          <h3 className="text-sm font-bold text-yellow-700 uppercase mb-3">마음 비타민</h3>
          <p className="text-xl font-script text-yellow-900 leading-relaxed">
            {prescription.vitaminQuote}
          </p>
        </section>

        {/* Section: Music */}
        <section className="bg-indigo-50 p-5 rounded-2xl border-l-4 border-indigo-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-4">
              <div className="text-3xl mt-1">🎵</div>
              <div>
                <h3 className="text-sm font-bold text-indigo-800 uppercase">음악 처방</h3>
                <p className="text-indigo-700 text-sm leading-relaxed mt-1">
                  {prescription.musicPrescription}
                </p>
              </div>
            </div>
            {prescription.musicYoutubeUrl && (
              <a
                href={prescription.musicYoutubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-all shadow-sm hover:shadow-md shrink-0"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                음악 감상하기
              </a>
            )}
          </div>
        </section>

        <div className="pt-4 text-center">
          <button
            onClick={onReset}
            className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-full transition-colors font-medium shadow-md hover:shadow-lg"
          >
            새로운 고민 접수하기
          </button>
        </div>
      </div>
      
      <div className="bg-rose-50 p-4 text-center text-xs text-rose-400">
        오늘도 당신의 마음이 평안하기를 기도합니다. - 마음 선생님 드림
      </div>
    </div>
  );
};

export default PrescriptionCard;
