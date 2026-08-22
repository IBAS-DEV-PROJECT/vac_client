export default function AlertBox(props: {isVisible : boolean}){
  if(props.isVisible){
    return (
      <div className="fixed top-0 z-10 block w-[100%] h-[100%] bg-[#140B0A73]">
        <div className="flex flex-col justify-around items-stretch h-[100%]">
          <center>
            <div className="w-[260px] h-[123px] rounded-[16px] p-[24px] bg-[#FFFFFF]">
              <h2 className="text-left text-[15px] text-[#201E1D] font-[600] mb-[14px]">모든 항목을 입력해주세요.</h2>
              <button className="text-[14px] text-[#E1F5FE] font-[800] w-[210px] h-[39px] rounded-[9px] bg-[#3E2723]">확인</button>
            </div>
          </center>
        </div>
      </div>
    );
  }
}