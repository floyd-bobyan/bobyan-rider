import { redirect } from 'next/navigation';

export default function Home() {
  // check cookies or session to see if user is logged in
  redirect('/login');
}
