import type { ResumeData, Profile, SectionConfig } from '@/types/resume';
import { profiles } from '@/data/profiles';

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadJson(data: ResumeData): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  downloadBlob(blob, 'resume-data.json');
}

function renderSectionHtml(data: ResumeData, section: SectionConfig): string {
  const tpl = profiles[data.template];
  const theme = tpl?.theme ?? profiles.general.theme;

  const cssVariables = `
    :root {
      --primary: ${theme.primary};
      --tag-bg: ${theme.tagBg};
      --tag-border: ${theme.tagBorder};
    }`;

  switch (section.id) {
    case 'header': {
      let linksHtml = '';
      if (data.links?.length) {
        linksHtml = `<div class="links">${data.links.map(l => `<a href="${l.url}" target="_blank">${l.label}</a>`).join('')}</div>`;
      }
      return `<header class="header">
        <div class="name">${data.name || ''}</div>
        <div class="title">${data.title || ''}</div>
        <div class="contact">
          <span>${data.city || ''}</span><span>|</span><span>${data.phone || ''}</span><span>|</span><span>${data.email || ''}</span>
        </div>
        ${linksHtml}
      </header>`;
    }
    case 'summary':
      if (!data.summary) return '';
      return `<section><h2>${section.title || ''}</h2><div class="summary">${data.summary}</div></section>`;
    case 'skills':
      if (!data.skills?.length) return '';
      return `<section><h2>${section.title || ''}</h2>${data.skills.map(c => `<div class="skills-category"><h3>${c.category}</h3><div class="skills-list">${c.items.map(i => `<span>${i}</span>`).join('')}</div></div>`).join('')}</section>`;
    case 'competency':
      if (!data.competencies?.length) return '';
      return `<section><h2>${section.title || ''}</h2><div class="competency-list">${data.competencies.map(i => `<span class="competency-tag">${i}</span>`).join('')}</div></section>`;
    case 'regulatory':
      if (!data.regulatorySystems?.length) return '';
      return `<section><h2>${section.title || ''}</h2>${data.regulatorySystems.map(c => `<div class="regulatory-group"><h3>${c.category}</h3><div class="regulatory-list">${c.items.map(i => `<span class="regulatory-tag">${i}</span>`).join('')}</div></div>`).join('')}</section>`;
    case 'experience':
      if (!data.experience?.length) return '';
      return `<section><h2>${section.title || ''}</h2>${data.experience
        .map(e => {
          const tagsHtml = e.tags?.length
            ? `<span class="company-tags">${e.tags.map(t => `<span class="company-tag">${t}</span>`).join('')}</span>`
            : '';
          const orgHtml = e.url
            ? `<a href="${e.url}" target="_blank">${e.organization}</a>`
            : e.organization;
          return `<div class="experience-item"><div class="item-header"><div><div class="company">${orgHtml}${tagsHtml}</div><div class="position">${e.position || ''}</div></div><div class="date">${e.startDate || ''} - ${e.endDate || ''}</div></div><ul class="desc-list">${(e.descriptions || []).map(d => `<li>${d}</li>`).join('')}</ul></div>`;
        })
        .join('')}</section>`;
    case 'projects':
      if (!data.projects?.length) return '';
      return `<section><h2>${section.title || ''}</h2>${data.projects
        .map(p => {
          const nameHtml = p.url ? `<a href="${p.url}" target="_blank">${p.name}</a>` : p.name;
          let variantHtml = '';
          if (section.variant === 'tech' && p.techStack)
            variantHtml = `<div class="tech-stack">${p.techStack}</div>`;
          else if (section.variant === 'submission' && p.submissionType)
            variantHtml = `<div class="submission-type">${p.submissionType}</div>`;
          else if (section.variant === 'tools' && p.toolsMethods)
            variantHtml = `<div class="tools-methods">${p.toolsMethods}</div>`;
          return `<div class="project-item"><div class="item-header"><div><div class="project-name">${nameHtml}</div><div class="role">${p.role || ''}</div></div><div class="date">${p.startDate || ''} - ${p.endDate || ''}</div></div>${variantHtml}<ul class="desc-list">${(p.descriptions || []).map(d => `<li>${d}</li>`).join('')}</ul></div>`;
        })
        .join('')}</section>`;
    case 'education':
      if (!data.education?.length) return '';
      return `<section><h2>${section.title || ''}</h2>${data.education.map(e => `<div class="education-item"><div class="item-header"><div><div class="school">${e.school || ''}</div><div class="degree">${e.major || ''}</div></div><div class="date">${e.startDate || ''} - ${e.endDate || ''}</div></div></div>`).join('')}</section>`;
    case 'certs':
      if (!data.certs?.length) return '';
      return `<section><h2>${section.title || ''}</h2>${data.certs.map(c => `<div class="cert-item"><div class="cert-name">${c.name || ''}</div><div class="cert-detail">${c.issuer || ''}${c.year ? ` · ${c.year}` : ''}</div></div>`).join('')}</section>`;
    case 'publications':
      if (!data.publications?.length) return '';
      return `<section><h2>${section.title || ''}</h2>${data.publications.map(p => `<div class="publication-item"><div class="pub-title">${p.title || ''}</div><div class="pub-authors">${p.authors || ''}${p.journal ? ` · <span class="pub-journal">${p.journal}</span>` : ''}${p.year ? ` · <span class="pub-year">${p.year}</span>` : ''}</div></div>`).join('')}</section>`;
    default:
      return '';
  }
}

export function downloadHtml(data: ResumeData): void {
  const profile = profiles[data.template] || profiles.general;
  const theme = profile.theme;

  let sectionsHtml = '';
  profile.sections.forEach(section => {
    sectionsHtml += renderSectionHtml(data, section);
  });

  const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>简历 - ${data.name || ''}</title>
  <style>
    :root {
      --primary: ${theme.primary};
      --tag-bg: ${theme.tagBg};
      --tag-border: ${theme.tagBorder};
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: #f5f5f5; padding: 20px; }
    .page { width: 210mm; min-height: 297mm; background: white; margin: 0 auto; padding: 20mm; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    @media print {
      body { background: white; padding: 0; }
      .page { box-shadow: none; margin: 0; width: 100%; height: auto; min-height: auto; }
      @page { size: A4; margin: 0; }
      section { break-inside: avoid; }
      h2 { break-after: avoid; }
      .experience-item, .project-item, .education-item, .cert-item, .publication-item { break-inside: avoid; }
      .skills-category, .regulatory-group { break-inside: avoid; }
    }
    .header { text-align: center; border-bottom: 2px solid var(--primary); padding-bottom: 20px; margin-bottom: 20px; }
    .name { font-size: 32px; font-weight: bold; color: #222; margin-bottom: 8px; }
    .title { font-size: 18px; color: var(--primary); margin-bottom: 12px; }
    .contact { font-size: 14px; color: #666; }
    .contact a, .links a { color: var(--primary); text-decoration: none; }
    .contact span { margin: 0 8px; }
    .links { font-size: 14px; margin-top: 8px; }
    .links a { margin-right: 16px; }
    section { margin-bottom: 24px; }
    h2 { font-size: 18px; color: var(--primary); border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-bottom: 12px; }
    .summary { font-size: 14px; color: #444; }
    .skills-category, .regulatory-group { margin-bottom: 12px; }
    .skills-category h3, .regulatory-group h3 { font-size: 14px; font-weight: 600; color: #444; margin-bottom: 6px; }
    .skills-list, .regulatory-list, .competency-list { display: flex; flex-wrap: wrap; gap: 8px; }
    .skills-list span, .regulatory-tag, .competency-tag { display: inline-block; background: var(--tag-bg); padding: 4px 10px; border-radius: 4px; font-size: 13px; color: var(--primary); border: 1px solid var(--tag-border); }
    .experience-item, .project-item, .education-item { margin-bottom: 16px; }
    .item-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
    .company, .project-name, .school { font-size: 15px; font-weight: 600; color: #222; }
    .position, .role, .degree { font-size: 14px; color: #444; }
    .date { font-size: 13px; color: #888; }
    .tech-stack, .submission-type, .tools-methods { font-size: 13px; color: var(--primary); margin: 4px 0 6px 0; }
    .company-tags { display: inline-flex; align-items: center; gap: 4px; margin-left: 12px; }
    .company-tag { font-size: 9px; padding: 0 3px; border: 1px solid #333; color: #333; }
    .summary strong, .desc-list strong { font-weight: 600; }
    .desc-list .num { position: relative; top: -1.2pt; }
    ul { margin-left: 20px; font-size: 14px; color: #444; }
    li { margin-bottom: 4px; }
    .cert-item, .publication-item { margin-bottom: 10px; font-size: 14px; color: #444; }
    .cert-name, .pub-title { font-weight: 600; color: #222; }
    .cert-detail, .pub-authors { color: #666; font-size: 13px; }
    .pub-journal { color: var(--primary); font-style: italic; }
    .pub-year { color: #888; }
  </style>
</head>
<body>
  <div class="page">${sectionsHtml}</div>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  downloadBlob(blob, 'resume.html');
}

export function printResume(): void {
  window.print();
}
