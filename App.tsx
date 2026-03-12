
import React, { useState } from 'react';
import { generatePrescription } from './services/geminiService';
import { Prescription, UserInput } from './types';
import LoadingSpinner from './components/LoadingSpinner';
import PrescriptionCard from './components/PrescriptionCard';

const App: React.FC = () => {
  const [formData, setFormData] = useState<UserInput>({ nickname: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [prescription, setPrescription] = useState<Prescription | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nickname.trim() || !formData.content.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const result = await generatePrescription(formData);
      setPrescription(result);
    } catch (err: any) {
      setError(err.message || '문제가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setPrescription(null);
    setFormData({ ...formData, content: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-3xl w-full space-y-8">
        {/* Header */}
        <div className="text-center animate-fade-in">
          <div className="inline-block p-3 rounded-2xl bg-teal-50 text-teal-600 mb-4 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-handwriting font-bold text-slate-800 mb-2">우리 가족 마음 약국</h1>
          <p className="text-slate-500 max-w-md mx-auto">
            누구에게도 말하지 못한 속마음, 마음 선생님이 들어줄게요.
            부모님, 자녀, 형제 모두 편하게 털어놓으세요.
          </p>
        </div>

        {/* Content Area */}
        <main className="transition-all duration-500">
          {loading ? (
            <div className="bg-white rounded-3xl shadow-xl p-8 animate-fade-in border-2 border-teal-50">
              <LoadingSpinner />
            </div>
          ) : prescription ? (
            <PrescriptionCard
              prescription={prescription}
              nickname={formData.nickname}
              onReset={resetForm}
            />
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 space-y-6 animate-fade-in border-2 border-teal-50">
              <div className="space-y-2">
                <label htmlFor="nickname" className="block text-sm font-semibold text-slate-700 ml-1">
                  닉네임 또는 가족 호칭
                </label>
                <input
                  type="text"
                  id="nickname"
                  required
                  placeholder="엄마, 아빠, 첫째, 햇살 가득..."
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-teal-100 focus:border-teal-400 outline-none transition-all text-slate-700"
                  value={formData.nickname}
                  onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="content" className="block text-sm font-semibold text-slate-700 ml-1">
                  오늘의 마음 증상 (고민 내용)
                </label>
                <textarea
                  id="content"
                  required
                  rows={6}
                  placeholder="요즘 육아가 너무 힘들어요... 아이와 대화가 잘 안 돼요... 회사 일이 너무 지쳐요..."
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-teal-100 focus:border-teal-400 outline-none transition-all text-slate-700 resize-none"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
                <p className="text-xs text-slate-400 text-right mt-1">자세히 적어주실수록 선생님이 더 정확한 처방을 내릴 수 있어요.</p>
              </div>

              {error && (
                <div className="p-4 bg-rose-50 text-rose-600 rounded-xl text-sm border border-rose-100 flex items-center">
                  <span className="mr-2">⚠️</span> {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-teal-500 hover:bg-teal-600 disabled:bg-slate-300 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center space-x-2"
              >
                <span>처방받기</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          )}
        </main>

        {/* Footer Info */}
        <footer className="text-center pt-8 text-slate-400 text-xs">
          <p>© 2024 마음 약국. 모든 처방은 비폭력 대화법(NVC)에 기반합니다.</p>
          <p className="mt-1">전문적인 심리 치료가 필요한 경우 전문 상담 기관을 방문해 주세요.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
