import { Dispatch, SetStateAction } from 'react';

export default function DeleteAccount(props: {
  isVisible : boolean; 
  deleteAccountShow: boolean,
  setDeleteAccountShow:Dispatch<SetStateAction<boolean>>,
  deleteAccountAlertShow : boolean,
  setDeleteAccountAlertShow : Dispatch<SetStateAction<boolean>>,
  }){
  
  const DeleteAccountShow = () =>{
    if(props.deleteAccountShow == false){
      props.setDeleteAccountShow(true);
    }
    else{
      props.setDeleteAccountShow(false);
    }
  }

  const DeleteAccountAlertShow = () =>{
    if(props.deleteAccountAlertShow == false){
      props.setDeleteAccountShow(false);
      props.setDeleteAccountAlertShow(true);
    }
    else{
      props.setDeleteAccountShow(true);
      props.setDeleteAccountAlertShow(false);
    }
  }
  
  if(props.isVisible){
    return (
      <div className="fixed top-0 z-10 block w-[100%] h-[100%] bg-[#140B0A73]">
        <div className="flex flex-col justify-around items-stretch h-[100%]">
          <center>
            <div className="w-[280px] h-[300px] rounded-[16px] p-[24px] bg-[#FFFFFF]">
              <h2 className="text-left text-[16px] text-[#201E1D] font-[700] mb-[14px]">정말 탈퇴하시겠어요?</h2>
              <p className="text-left text-[13px] text-[#2A1F1CCC] font-[400] mb-[14px]" >회원 탈퇴 시 아래 데이터가 모두 삭제됩니다.</p>
              <p className="text-left text-[13px] text-[#201E1D] font-[400] mb-[14px]">&bull;&nbsp; 고민 및 기록 <br />&bull;&nbsp; 가치 분포 및 인사이트 <br />&bull;&nbsp; 계정 정보</p>
              <p className="text-left text-[13px] text-[#2A1F1C99] font-[400] mb-[14px]">삭제된 데이터는 복구할 수 없습니다.</p>
              <div>
                <button onClick={DeleteAccountShow} className="border-[1px] border-[#201E1D66] font-[14px] text-[#2A1F1C] font-[800] w-[112px] h-[39px] rounded-[9px] bg-[#FFF] mr-[8px]">취소</button>
                <button onClick={DeleteAccountAlertShow} className="font-[14px] text-[#FFF] font-[800] w-[112px] h-[39px] rounded-[9px] bg-[#E5342A]">탈퇴하기</button>
              </div>
            </div>
          </center>
        </div>
      </div>
    );
  }
}