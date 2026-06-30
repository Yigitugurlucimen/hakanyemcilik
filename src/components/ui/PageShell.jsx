import Breadcrumbs from "./Breadcrumbs.jsx";
import SectionHeading from "./SectionHeading.jsx";

const PageShell = ({
  title,
  eyebrow,
  description,
  breadcrumbs,
  children,
  className = ""
}) => {
  return (
    <div className={`section-shell py-12 md:py-16 ${className}`}>
      {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
      {title ? (
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          className={breadcrumbs?.length ? "mt-4" : ""}
        />
      ) : null}
      <div className={title ? "mt-8" : ""}>{children}</div>
    </div>
  );
};

export default PageShell;
