import { useState, type ChangeEvent } from 'react'
import Header from '@/components/common/header/Header'
import BottomNav, {
  type NavValue,
} from '@/components/common/navigation/BottomNav'
import DeleteAccount from '@/components/settings/DeleteAccount'
import DeleteAccountAlert from '@/components/settings/DeleteAccountAlert'

import Archive from '@/assets/Archive.png'
import Arrow from '@/assets/Arrow.png'

export default function Setting () {

  const [activeNav, setActiveNav] = useState<NavValue>('setting');
  const [deleteAccountShow, setDeleteAccountShow] = useState(false);
  const [deleteAccountAlertShow, setDeleteAccountAlertShow] = useState(false);

  const DeleteAccountShow = () =>{
    if(deleteAccountShow == false){
      setDeleteAccountShow(true);
    }
    else{
      setDeleteAccountShow(false);
    }
  }

  const DeleteAccountAlertShow = () =>{
    if(deleteAccountAlertShow == false){
      setDeleteAccountShow(false);
      setDeleteAccountAlertShow(true);
    }
    else{
      setDeleteAccountShow(true);
      setDeleteAccountAlertShow(false);
    }
  }

  return (
    <div className="flex flex-col items-stretch min-h-screen bg-[#E1F5FE] pt-[34px]">
      <Header
        title="설정"
      />
      <div className="grow-1 flex flex-col justify-between px-[28px] pt-[8px]">
        <div>
          <div className="flex flex-row space-between items-center">
            <section className="inline-block w-[100%] h-[75px] py-[16px] align-middle">
              <div className="inline-block w-[36px] h-[36px] bg-[#DDF0FA] rounded-[9px] mr-[12px]"><img src={Archive} alt="no image" className="h-[18px] w-[18px] m-[9px]"/></div>
              <div className="inline-block">
                <h2 className="text-[14px] font-[600] text-[#201E1D] mb-[2px]">기록 가이드</h2>
                <p className="text-[12px] font-[400] text-[#2A1F1C8C]">주제와 가치 설명 보기</p>
              </div>
            </section>
            <button className="w-[16px] h-[16px]"><img src={Arrow} alt=""  className="w-[6px] h-[8px]"/></button>
          </div>
          <div className="w-[100%] h-[2px] bg-[#3E272338] my-[20px]"/>
          <button className="w-[100%] h-[55px] text-[14px] text-left font-[400] text-[#201E1D] border-b-[1px] border-[#3E272338]">로그아웃</button>
          <button onClick={DeleteAccountShow} className="w-[100%] h-[55px] text-[14px] text-left font-[400] text-[#2A1F1C99] border-b-[1px] border-[#3E272338]">회원탈퇴</button>
        </div>
        
        <center><p className="text-[12px] font-[400] text-[#2A1F1C8C] mb-[48px]">Layer v1.0.0</p></center>
      </div>
      <footer className="flex w-[360px] flex-col gap-3 mx-[20px] mb-[20px]">
        <BottomNav value={activeNav} onChange={setActiveNav} />
      </footer>
      {/* Account Delete tab */}
      <DeleteAccount 
        isVisible={deleteAccountShow} 
        deleteAccountShow={deleteAccountShow} 
        setDeleteAccountShow={setDeleteAccountShow} 
        deleteAccountAlertShow={deleteAccountAlertShow} 
        setDeleteAccountAlertShow={setDeleteAccountAlertShow}
      />
      {/* Account Delete Alert tab */}
      <DeleteAccountAlert isVisible={deleteAccountAlertShow}/>
    </div>
  );
}