import React from 'react';

const Stats: React.FC = () => {
  return (
    <section className="relative -mt-10 z-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-xl shadow-xl border border-gray-100 p-6 md:p-8">
          {/* Stat 1 */}
          <div className="flex flex-col items-center justify-center text-center border-r border-gray-100 md:border-b-0 border-b pb-4 md:pb-0 border-b-gray-100 [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r">
            <span className="text-gray-500 text-sm font-medium mb-1">治療院経営歴</span>
            <span className="text-3xl font-black text-[#111418]">12<span className="text-base font-bold text-primary ml-1">年</span></span>
          </div>
          {/* Stat 2 */}
          <div className="flex flex-col items-center justify-center text-center md:border-r border-gray-100 pb-4 md:pb-0 border-b md:border-b-0 border-b-gray-100">
            <span className="text-gray-500 text-sm font-medium mb-1">AI活用歴</span>
            <span className="text-3xl font-black text-[#111418]">3<span className="text-base font-bold text-primary ml-1">年+</span></span>
          </div>
          {/* Stat 3 */}
          <div className="flex flex-col items-center justify-center text-center border-r border-gray-100 pt-4 md:pt-0 [&:nth-child(3)]:border-r-0 md:[&:nth-child(3)]:border-r">
            <span className="text-gray-500 text-sm font-medium mb-1">YouTube登録者</span>
            <span className="text-3xl font-black text-[#111418]">5,800<span className="text-base font-bold text-primary ml-1">人+</span></span>
          </div>
          {/* Stat 4 */}
          <div className="flex flex-col items-center justify-center text-center pt-4 md:pt-0">
            <span className="text-gray-500 text-sm font-medium mb-1">開発・導入ツール</span>
            <span className="text-3xl font-black text-[#111418]">20<span className="text-base font-bold text-primary ml-1">個</span></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;