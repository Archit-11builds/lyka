'use client';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
export function TransitionLink({href,children,className='',onClick}){const router=useRouter();const go=e=>{e.preventDefault();onClick?.();window.dispatchEvent(new CustomEvent('lyka:navigate',{detail:{href}}));window.setTimeout(()=>router.push(href),520)};return <Link href={href} onClick={go} className={className}>{children}</Link>}
