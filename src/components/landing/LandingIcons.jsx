// Landing-page-only icons. Kept out of components/common/Icons.jsx so the
// Authentication pages (which share Icons.jsx) do not download them.
// Using <img> tags for static SVG assets (cached by Service Worker).
// Note: Colors are baked into SVG files; no prop control over internal strokes/fills.

export const StudentIcon = ({ className = "w-14 h-14", ...props }) => (
  <img
    src="/assets/landing/student.svg"
    alt=""
    className={className}
    {...props}
  />
);

export const UniversityIcon = ({ className = "w-14 h-14", ...props }) => (
  <img
    src="/assets/landing/university.svg"
    alt=""
    className={className}
    {...props}
  />
);

export const CompanyIcon = ({ className = "w-14 h-14", ...props }) => (
  <img
    src="/assets/landing/company.svg"
    alt=""
    className={className}
    {...props}
  />
);

export const MatchingIcon = ({ className = "w-12 h-12", ...props }) => (
  <img
    src="/assets/landing/matching.svg"
    alt=""
    className={className}
    {...props}
  />
);