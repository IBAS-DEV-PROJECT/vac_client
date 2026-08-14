export default function OnboardingComponent1() {
    
  return (
    <div>
      {/* nine blocks */}
      <section className="mb-[23px]">
        <div className="h-[34px]">
          <div className="inline-block h-[28px] w-[28px] mr-[6px] mb-[6px] bg-[var(--color-growth)]"></div>
          <div className="inline-block h-[28px] w-[28px] mr-[6px] mb-[6px] bg-[var(--color-stability)]"></div>
          <div className="inline-block h-[28px] w-[28px] mr-[6px] mb-[6px] bg-[var(--color-autonomy)]"></div>
        </div>
        <div className="h-[34px]">
          <div className="inline-block h-[28px] w-[28px] mr-[6px] mb-[6px] bg-[var(--color-connection)]"></div>
          <div className="inline-block h-[28px] w-[28px] mr-[6px] mb-[6px] bg-[var(--color-recognition)]"></div>
          <div className="inline-block h-[28px] w-[28px] mr-[6px] mb-[6px] bg-[var(--color-fun)]"></div>
        </div>
        <div className="h-[34px]">
          <div className="inline-block h-[28px] w-[28px] mr-[6px] mb-[6px] bg-[var(--color-efficiency)]"></div>
          <div className="inline-block h-[28px] w-[28px] mr-[6px] mb-[6px] bg-[var(--color-meaning)]"></div>
          <div className="inline-block h-[28px] w-[28px] mr-[6px] mb-[6px] bg-[var(--color-responsibility)]"></div>
        </div>
      </section>
      <section>
        {/* content */}
        <div className="text-[32px] font-[800] mb-[12px]">가치관을 묻지 않아요</div>
        <div className="text-[15px] font-[400]">대신 지금 고민 중인 선택 하나만 물어볼게요.<br/>'당신의 가치'는 무엇인가는 묻지 않지만,<br/>구체적인 갈림길 앞에서는 누구나 이유를 둘 수 있으니까요.</div>
      </section>
    </div>
  );
}