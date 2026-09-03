export default function InputAlert(props: {
  isVisible: boolean
  onConfirm: () => void
}) {
  if (props.isVisible) {
    return (
      <div className="fixed top-0 z-10 block w-[100%] h-[100%] bg-[#140B0A73]">
        <div className="flex flex-col justify-around items-stretch h-[100%]">
          <center>
            <div className="w-[280px] h-[130px] rounded-[16px] p-[24px] bg-[#FFFFFF]">
              <h2 className="text-[15px] text-[#201E1D] font-[600] mb-[17px]">
                모든 항목을 입력해주세요
              </h2>
              <button
                onClick={props.onConfirm}
                className="text-[14px] text-[#FFF] font-[800] w-[210px] h-[39px] rounded-[9px] bg-[#3E2723]"
              >
                확인
              </button>
            </div>
          </center>
        </div>
      </div>
    )
  }
}
