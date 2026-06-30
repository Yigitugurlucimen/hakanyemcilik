const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left",
  className = ""
}) => {
  const alignClass =
    align === "center" ? "text-center items-center mx-auto" : "text-left items-start";

  return (
    <div className={`flex max-w-3xl flex-col gap-3 ${alignClass} ${className}`}>
      {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
      {title ? <h2 className="section-title">{title}</h2> : null}
      {description ? (
        <p className="text-sm leading-relaxed text-slate-600 md:text-base">{description}</p>
      ) : null}
    </div>
  );
};

export default SectionHeading;
