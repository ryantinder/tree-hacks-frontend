import Image from 'next/image';
import Link from 'next/link';

const teamMembers = [
  {
    name: 'Ryan Tinder',
    bio: 'Ryan is a god at programming. He did the entire project by himself.',
    image: '/ryan.jpg',
  },
  {
    name: 'Trent Conley',
    bio: 'Trent is a low-tier mortal who developed the measly frontend.',
    image: '/ryan.jpg',
  },
];

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-10 py-10">
      <h1 className="text-4xl font-bold">About the Team</h1>
      <div className="flex flex-col items-center justify-center space-y-10">
        {teamMembers.map((teamMember, index) => (
          <div className="flex flex-col items-center justify-center" key={index}>
            <div className="rounded-full overflow-hidden h-40 w-40 flex items-center justify-center border-2 border-gray-300">
            <Link href="/" passHref>
                <Image src={teamMember.image} alt={teamMember.name} height={160} width={160} />
                </Link>
            </div>
            <h2 className="text-xl font-bold">{teamMember.name}</h2>
            <p className="text-center">{teamMember.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;