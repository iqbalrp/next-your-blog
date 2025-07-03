import Image from "next/image";
type FooterAuthorProps = {
  author?: { name: string; avatarUrl: string; date: string };
  stats?: React.ReactNode;
};

const Author = ({ author, stats }: FooterAuthorProps) => (
  <div className="w-full flex flex-col gap-3">
    {author && (
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-3">
          <Image
            src={author.avatarUrl}
            alt={author.name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <span className="text-sm font-medium text-neutral-900">
            {author.name}
          </span>
        </button>
        <div className="h-1 w-1 rounded-full bg-neutral-400" />
        <span className="text-sm text-neutral-700">{author.date}</span>
      </div>
    )}
    {stats}
  </div>
);

export default Author;
