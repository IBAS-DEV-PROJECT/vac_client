export default function OnboardingHeader(props: { pageNumber:number; }) {
  {/*colored block numbers change by pageNumber */}
  switch(props.pageNumber){
    case 1: 
    {/*on pageNumber == 1*/}
      return (
        <header className="h-[31px] grow-0 px-[28px]">
          <div className="flex flex-row items-end h-[100%]">
            <div className="h-[3px] w-[32px] bg-[#3E2723] mr-[8px]"/>
            <div className="h-[3px] w-[32px] bg-[#DDF0FA] mr-[8px]"/>
            <div className="h-[3px] w-[32px] bg-[#DDF0FA] mr-[8px]"/>
          </div>
        </header>
      );
    case 2:
    {/*on pageNumber == 2*/}
      return (
        <header className="h-[31px] grow-0 px-[28px]">
          <div className="flex flex-row items-end h-[100%]">
            <div className="h-[3px] w-[32px] bg-[#3E2723] mr-[8px]"/>
            <div className="h-[3px] w-[32px] bg-[#3E2723] mr-[8px]"/>
            <div className="h-[3px] w-[32px] bg-[#DDF0FA] mr-[8px]"/>
          </div>
        </header>
      );
    case 3:
    {/*on pageNumber == 3*/}
      return (
        <header className="h-[31px] grow-0 px-[28px]">
          <div className="flex flex-row items-end h-[100%]">
            <div className="h-[3px] w-[32px] bg-[#3E2723] mr-[8px]"/>
            <div className="h-[3px] w-[32px] bg-[#3E2723] mr-[8px]"/>
            <div className="h-[3px] w-[32px] bg-[#3E2723] mr-[8px]"/>
          </div>
        </header>
      );
  }
}