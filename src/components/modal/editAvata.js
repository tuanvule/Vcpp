import React from 'react'

export default function EditAvata(props) {
  return (
    <div className="fixed flex flex-col bg-white shadow-lg rounded-xl w-[50%] h-[90%]">
        <div className="mx-auto mt-14">
            {props.profile[0].avata.length <= 2 ? 
                <div className="
                w-48 h-48 rounded-full
                bg-[#8C52FF] text-white
                text-center text-[5rem]
                leading-[12rem]
                mx-4 cursor-pointer
                "
                >{props.profile[0].avata}</div>
                : 
                <div className="cursor-pointer w-10 h-10 bg-center bg-cover" style={{backgroundImage: `url(${props.profile[0].avata})`}}/>
            }
        </div>
        <input type="text" placeholder="enter image's link" className="mx-auto mt-14 px-4 text-xl text-[#8C52FF] font-medium outline-none focus:border-[#8C52FF] w-[60%] h-12 rounded-lg border" />
        <div className="mx-auto mt-4 bg-[#8C52FF] text-white text-center px-[10%] py-[10px] rounded-lg"><i class="fa-solid fa-arrow-up"></i> tải ảnh lên</div>
        <div className="mt-4 mx-auto w-[50%] text-center text-base text-slate-500">lý do mà tôi chỉ cho thay đổi avatar bằng link ảnh chứ không phải tải ảnh lên database là do database chỉ chứa được 5gb(sài free) nên mọi người thông cảm.</div>
    </div>
  )
}
