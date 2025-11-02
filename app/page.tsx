
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from './ui/button';
import { lusitana } from './ui/fonts';
import AcmeLogo from './ui/acme-logo';
import Image from 'next/image';
import Header from './ui/global/header';
import PartOne from './ui/mainPage/partOne';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-3 ">
        <PartOne />
    </main>
  );
}
