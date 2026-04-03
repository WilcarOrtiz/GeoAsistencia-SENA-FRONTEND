type PageHeaderProps = {
  title: string;
  description?: string;
};

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div>
      <h1 className="text-h1">{title}</h1>
      {description && <p className="text-p">{description}</p>}
    </div>
  );
};
