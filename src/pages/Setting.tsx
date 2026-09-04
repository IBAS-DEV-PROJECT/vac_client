import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/common/header/Header'
import DeleteAccount from '@/components/settings/DeleteAccount'
import DeleteAccountAlert from '@/components/settings/DeleteAccountAlert'
import ErrorToast from '@/components/auth/ErrorToast'

import Archive from '@/assets/Archive.png'
import Arrow from '@/assets/Arrow.png'

import { logout, deleteAccount, getAuthErrorMessage } from '@/services/auth'

export default function Setting() {
  const navigate = useNavigate()

  const [deleteAccountShow, setDeleteAccountShow] = useState(false)
  const [deleteAccountAlertShow, setDeleteAccountAlertShow] = useState(false)
  const [apiError, setApiError] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const DeleteAccountShow = () => {
    setDeleteAccountShow(!deleteAccountShow)
  }

  const handleDeleteAccountConfirm = async () => {
    if (isDeleting) return
    setApiError('')
    setIsDeleting(true)
    try {
      await deleteAccount()
      setDeleteAccountShow(false)
      setDeleteAccountAlertShow(true)
    } catch (err) {
      setApiError(getAuthErrorMessage(err))
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDeleteAccountAlertConfirm = () => {
    setDeleteAccountAlertShow(false)
    navigate('/login', { replace: true })
  }

  const handleLogout = async () => {
    try {
      await logout()
    } finally {
      navigate('/login', { replace: true })
    }
  }

  return (
    <div className="flex flex-col items-stretch min-h-screen bg-[#E1F5FE]">
      <Header title="설정" />
      <div className="grow-1 flex flex-col justify-between px-[28px] pt-[8px]">
        <div>
          <div className="flex flex-row space-between items-center">
            <section className="inline-block w-[100%] h-[75px] py-[16px] align-middle">
              <div className="inline-block w-[36px] h-[36px] bg-[#DDF0FA] rounded-[9px] mr-[12px]">
                <img
                  src={Archive}
                  alt="no image"
                  className="h-[18px] w-[18px] m-[9px]"
                />
              </div>
              <div className="inline-block">
                <h2 className="text-[14px] font-[600] text-[#201E1D] mb-[2px]">
                  기록 가이드
                </h2>
                <p className="text-[12px] font-[400] text-[#2A1F1C8C]">
                  주제와 가치 설명 보기
                </p>
              </div>
            </section>
            <button
              onClick={() => navigate('/record-guide')}
              className="w-[16px] h-[16px]"
            >
              <img src={Arrow} alt="" className="w-[6px] h-[8px]" />
            </button>
          </div>
          <div className="w-[100%] h-[2px] bg-[#3E272338] my-[20px]" />
          {apiError && (
            <div className="mb-[16px]">
              <ErrorToast message={apiError} />
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-[100%] h-[55px] text-[14px] text-left font-[400] text-[#201E1D] border-b-[1px] border-[#3E272338]"
          >
            로그아웃
          </button>
          <button
            onClick={DeleteAccountShow}
            className="w-[100%] h-[55px] text-[14px] text-left font-[400] text-[#2A1F1C99] border-b-[1px] border-[#3E272338]"
          >
            회원탈퇴
          </button>
        </div>

        <center>
          <p className="text-[12px] font-[400] text-[#2A1F1C8C] mb-[48px]">
            Layer v1.0.0
          </p>
        </center>
      </div>
      {/* Account Delete tab */}
      <DeleteAccount
        isVisible={deleteAccountShow}
        deleteAccountShow={deleteAccountShow}
        setDeleteAccountShow={setDeleteAccountShow}
        onConfirmDelete={handleDeleteAccountConfirm}
        isDeleting={isDeleting}
      />
      {/* Account Delete Alert tab */}
      <DeleteAccountAlert
        isVisible={deleteAccountAlertShow}
        onConfirm={handleDeleteAccountAlertConfirm}
      />
    </div>
  )
}
