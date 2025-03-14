"use client"
import {usePrivy} from '@privy-io/react-auth';

export default function LoginButton() {
  const {ready, authenticated, login} = usePrivy();
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  return (
    <button disabled={disableLogin} onClick={login} className='bg-[#c89116] rounded-md p-2 font-bold'>
      Log in
    </button>
  );
}