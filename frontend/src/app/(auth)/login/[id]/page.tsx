"use client"

import Link from 'next/link';

import { useParams } from 'next/navigation';
import Typography from '@/components/Typography';

import LoginForm from './LoginForm';

export default function IdLoginPage({ params }: { params: { id: string } }) {
  const { id } = useParams()
  return (
    (params.id === id ? (
      <div className='w-full h-full flex justify-center'>
        <div className='h-full flex w-[400px] flex-col justify-center gap-6 text-typo-dark pb-12'>
          <Typography
            as='h1'
            variant='h5'
            weight='bold'
            className='w-full text-center'
          >
            Login 2 FA
          </Typography>

          <LoginForm />

          <div className='flex justify-center items-center gap-2'>
            <Typography variant='bt'>Belum punya akun?</Typography>
            <Typography
              variant='bt'
              weight='semibold'
              className='text-secondary-50 hover:text-secondary-60 transition-colors'
            >
              <Link href='/signup'>Daftar</Link>
            </Typography>
          </div>
        </div>
      </div>
    ) : (
      <></>
    ))
  );
}
