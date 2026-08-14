import { useState } from 'react'
import OnboardingComponentChange from '@/components/onboarding/OnboardingComponentChange'
import OnboardingHeader from '@/components/onboarding/OnboardingHeader'

export default function Onboarding () {

  {/*onboarding page number*/}
  const [pageNumber, setPageNumber] = useState(1);

  {/*page move function*/}
  const pageMove = () => {
    if(pageNumber <= 2)
      setPageNumber(pageNumber => (pageNumber + 1));
  }

  return (
    <div className="flex flex-col items-stretch min-h-screen bg-[#E1F5FE] pt-[34px]">
      {/* onboarding header*/}
      <OnboardingHeader pageNumber={pageNumber} />
      <div className="grow flex flex-col justify-between px-[28px] py-[48px]">
        {/* onboarding contents, change by pageNumber*/}
        <OnboardingComponentChange pageNumber={pageNumber}/>

        {/*bottom buttons*/}
        <div className="flex flex-row justify-between">
          <button className="w-[84px] h-[43px] rounded-[9px] text-[14px] font-[800] text-[#3E2723]">건너뛰기</button>
          <button onClick={pageMove} className="w-[84px] h-[43px] rounded-[9px] text-[14px] font-[800] text-[#E1F5FE] bg-[#3E2723]">다음</button>
        </div>
      </div>
    </div>
  );
}