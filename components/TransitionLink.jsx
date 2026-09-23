'use client';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useRef} from 'react';
export function TransitionLink({href,children,className='',onClick,style}){const router=useRouter();const busy=useRef(false);const go=e=>{e.preventDefault();if(busy.current)return;busy.current=true;onClick?.();window.dispatchEvent(new CustomEvent('lyka:navigate',{detail:{href}}));window.setTimeout(()=>router.push(href),320);window.setTimeout(()=>{busy.current=false},700)};return <Link href={href} onClick={go} className={className} style={style}>{children}</Link>}
