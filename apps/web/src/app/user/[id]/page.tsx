import UserData from '@/components/userData';

interface UserPageProps {
  params: {
    id: string;
  };
}

export default function UserPage({ params }: UserPageProps) {
  const userId = parseInt(params.id);

  return (
    <div className='w-full '>
      <UserData userId={userId} />
    </div>
  );
}
