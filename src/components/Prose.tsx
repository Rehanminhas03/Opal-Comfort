import { ReactNode } from 'react';

/** Consistent typography wrapper for long-form/legal content. */
export default function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-5 font-body leading-relaxed text-slate [&_a]:text-sage [&_a]:underline [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-charcoal [&_li]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
      {children}
    </div>
  );
}
