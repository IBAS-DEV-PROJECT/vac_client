import { Dispatch, SetStateAction } from 'react';

export default function DeleteAccountAlert(props: {
  isVisible : boolean,
  deleteAccountAlertShow : boolean,
  setDeleteAccountAlertShow : Dispatch<SetStateAction<boolean>>,
  }){
  if(props.isVisible){
    return (
      <div className="fixed top-0 z-10 block w-[100%] h-[100%] bg-[#140B0A73]">
        <div className="flex flex-col justify-around items-stretch h-[100%]">
          <center>
            <div className="w-[280px] h-[180px] rounded-[16px] p-[24px] bg-[#FFFFFF]">
              <h2 className="text-[15px] text-[#201E1D] font-[600] mb-[17px]">회원 탈퇴가 완료되었습니다.</h2>
              <p className="text-[13px] text-[#2A1F1CCC] font-[400] mb-[30px]">그동안 Layer를 이용해주셔서 감사합니다.</p>
              <button className="text-[14px] text-[#FFF] font-[800] w-[210px] h-[39px] rounded-[9px] bg-[#3E2723]">확인</button>
            </div>
          </center>
        </div>
      </div>
    );
  }
}