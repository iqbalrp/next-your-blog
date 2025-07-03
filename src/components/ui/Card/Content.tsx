type CardContentProps = {
  title: string;
  tags?: string[];
  description: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

const Content = ({
  title,
  tags,
  description,
  titleClassName = "text-xl font-bold text-neutral-900",
  descriptionClassName = "w-[443px] h-[56px] overflow-hidden text-ellipsis text-sm text-neutral-700",
}: CardContentProps) => (
  <div className="flex flex-col gap-3">
    <h2 className={titleClassName}>{title}</h2>
    {tags && (
      <div className="flex flex-wrap gap-2">
        {tags.map((tag,index) => (
          <div
            key={`${tag}-${index}`}
            className="h-7 px-3 border border-neutral-300 rounded-[8px] flex items-center">
            <span className="text-xs text-neutral-900 whitespace-nowrap">{tag}</span>
          </div>
        ))}
      </div>
    )}

    <p className={descriptionClassName}>
      {description}
    </p>
  </div>
);

export default Content;
