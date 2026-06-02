import type { ResumeData, BlockConfig } from '@/types/resume';

/**
 * 创建 Blob 下载链接并触发下载
 * @param blob - 要下载的文件数据
 * @param filename - 下载文件名
 */
function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** 将简历数据导出为 JSON 文件并下载 */
export function downloadJson(data: ResumeData): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  downloadBlob(blob, 'resume-data.json');
}

/**
 * 根据区块配置渲染对应的 HTML 片段
 */
function renderBlockHtml(data: ResumeData, block: BlockConfig): string {
  switch (block.type) {
    case 'header':
      return renderHeaderHtml(data);
    case 'summary':
      if (!data.summary) return '';
      return `<section class="resume-section"><div class="section-header"><div class="section-header__left">${block.title || ''}</div></div><div class="desc-block">${data.summary}</div></section>`;
    case 'skills':
      if (!data.skills?.length) return '';
      return `<section class="resume-section"><div class="section-header"><div class="section-header__left">${block.title || ''}</div></div>${data.skills.map(c => `<div class="tag-group"><h3 class="tag-group__title">${c.category}</h3><div class="tag-list">${c.items.map(i => `<span class="tag">${i}</span>`).join('')}</div></div>`).join('')}</section>`;
    case 'competency':
      if (!data.competencies?.length) return '';
      return `<section class="resume-section"><div class="section-header"><div class="section-header__left">${block.title || ''}</div></div><div class="tag-list">${data.competencies.map(i => `<span class="tag">${i}</span>`).join('')}</div></section>`;
    case 'regulatory':
      if (!data.regulatorySystems?.length) return '';
      return `<section class="resume-section"><div class="section-header"><div class="section-header__left">${block.title || ''}</div></div>${data.regulatorySystems.map(c => `<div class="tag-group"><h3 class="tag-group__title">${c.category}</h3><div class="tag-list">${c.items.map(i => `<span class="tag">${i}</span>`).join('')}</div></div>`).join('')}</section>`;
    case 'experience':
      if (!data.experience?.length) return '';
      return `<section class="resume-section"><div class="section-header"><div class="section-header__left">${block.title || ''}</div></div>${data.experience
        .map(e => {
          const tagsHtml = e.tags?.length
            ? `<span class="exp-tags">${e.tags.map(t => `<span class="tag">${t}</span>`).join('')}</span>`
            : '';
          const orgHtml = e.url
            ? `<a href="${e.url}" target="_blank" class="exp-org">${e.organization}</a>`
            : `<span class="exp-org">${e.organization}</span>`;
          return `<div class="exp-item"><div class="exp-header"><div class="exp-left"><span class="exp-duration">${e.startDate || ''} ~ ${e.endDate || ''}</span>${orgHtml}${tagsHtml}</div><div class="exp-right">${e.position || ''}</div></div><ul class="desc-list">${(e.descriptions || []).map(d => `<li>${d}</li>`).join('')}</ul></div>`;
        })
        .join('')}</section>`;
    case 'projects':
      if (!data.projects?.length) return '';
      return `<section class="resume-section"><div class="section-header"><div class="section-header__left">${block.title || ''}</div></div>${data.projects
        .map(p => {
          const nameHtml = p.url
            ? `<a href="${p.url}" target="_blank" class="proj-name">${p.name}</a>`
            : `<span class="proj-name">${p.name}</span>`;
          let variantHtml = '';
          if (block.variant === 'tech' && p.techStack)
            variantHtml = `<div class="proj-variant">${p.techStack}</div>`;
          else if (block.variant === 'submission' && p.submissionType)
            variantHtml = `<div class="proj-variant">${p.submissionType}</div>`;
          else if (block.variant === 'tools' && p.toolsMethods)
            variantHtml = `<div class="proj-variant">${p.toolsMethods}</div>`;
          return `<div class="proj-item"><div class="proj-header"><div class="proj-left"><span class="proj-duration">${p.startDate || ''} ~ ${p.endDate || ''}</span>${nameHtml}</div><div class="proj-right">${p.role || ''}</div></div>${variantHtml}<ul class="desc-list">${(p.descriptions || []).map(d => `<li>${d}</li>`).join('')}</ul></div>`;
        })
        .join('')}</section>`;
    case 'education':
      if (!data.education?.length) return '';
      return `<section class="resume-section"><div class="section-header"><div class="section-header__left">${block.title || ''}</div></div>${data.education.map(e => `<div class="edu-item"><div class="edu-header"><div class="edu-left"><span class="edu-duration">${e.startDate || ''} ~ ${e.endDate || ''}</span><span class="edu-school">${e.school || ''}</span></div><div class="edu-right">${e.major || ''}</div></div></div>`).join('')}</section>`;
    case 'certs':
      if (!data.certs?.length) return '';
      return `<section class="resume-section"><div class="section-header"><div class="section-header__left">${block.title || ''}</div></div>${data.certs.map(c => `<div class="cert-item"><span class="cert-name">${c.name || ''}</span><span class="cert-detail">${c.issuer || ''}${c.year ? ` · ${c.year}` : ''}</span></div>`).join('')}</section>`;
    case 'publications':
      if (!data.publications?.length) return '';
      return `<section class="resume-section"><div class="section-header"><div class="section-header__left">${block.title || ''}</div></div>${data.publications.map(p => `<div class="pub-item"><div class="pub-title">${p.title || ''}</div><div class="pub-authors">${p.authors || ''}${p.journal ? ` · ${p.journal}` : ''}${p.year ? ` · ${p.year}` : ''}</div></div>`).join('')}</section>`;
    default:
      return '';
  }
}

function renderHeaderHtml(data: ResumeData): string {
  const headerHtml = data.name ? `<div class="resume-title">${data.name}的简历</div>` : '';
  const metaHtml = `<div class="resume-meta">${
    data.city
      ? `<div class="meta-item"><span class="meta-label">坐标：</span>${data.city}</div>`
      : ''
  }${
    data.phone
      ? `<div class="meta-item"><span class="meta-label">手机：</span>${data.phone}</div>`
      : ''
  }${
    data.email
      ? `<div class="meta-item"><span class="meta-label">邮箱：</span>${data.email}</div>`
      : ''
  }${
    data.title
      ? `<div class="meta-item"><span class="meta-label">职位：</span>${data.title}</div>`
      : ''
  }</div>`;
  const linksHtml = data.links?.length
    ? `<div class="resume-links">${data.links.map(l => `<a href="${l.url}" target="_blank">${l.label}</a>`).join('')}</div>`
    : '';
  return `${headerHtml}${metaHtml}${linksHtml}`;
}

/** 将简历数据导出为 HTML 文件并下载 */
export function downloadHtml(data: ResumeData): void {
  let pagesHtml = '';
  data.pages.forEach(page => {
    let pageContent = '';
    page.blocks.forEach(block => {
      pageContent += renderBlockHtml(data, block);
    });
    pagesHtml += `<div class="page">${pageContent}</div>`;
  });

  const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>简历 - ${data.name || ''}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: "Microsoft Yahei", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", Arial, sans-serif, Tahoma, serif; background: #464646; padding: 50px 20px; color: #000; font-weight: 400; }
    .page { width: 190mm; min-height: 277mm; padding: 10mm; box-sizing: content-box; background: #fff; margin: 0 auto; border: 0.75pt solid #666; font-size: 12pt; line-height: 1.5; }
    .page + .page { margin-top: 20px; }

    /* 标题 */
    .resume-title { text-align: center; font-size: 20pt; line-height: 1.1; padding-bottom: 5pt; }

    /* 联系信息表 */
    .resume-meta { display: flex; flex-wrap: wrap; border: 0.75pt dashed #000; padding: 6pt; line-height: 1.8; width: 100%; }
    .meta-item { display: inline-flex; width: 50%; font-size: 11pt; }
    .meta-label { font-weight: 400; }

    /* 社交链接 */
    .resume-links { font-size: 11pt; text-align: center; padding-top: 3pt; }
    .resume-links a { color: #000; margin: 0 8pt; }

    /* 章节 */
    .resume-section { display: flex; flex-direction: column; width: 100%; margin-top: 6pt; }
    .section-header { display: flex; align-items: center; justify-content: space-between; text-align: left; font-size: 13pt; line-height: 1.8; border-bottom: 0.75pt dashed #000; width: 100%; }
    .section-header__left { font-weight: bold; }
    .section-header__right { font-size: 9pt; }

    /* DescBlock */
    .desc-block { display: block; font-size: 0; width: 100%; }
    .desc-block * { font-size: 11pt; font-weight: 400; line-height: 1.8; }
    .desc-block strong { font-weight: 600; }

    /* 标签 */
    .tag-group { margin-bottom: 6pt; }
    .tag-group__title { font-size: 11pt; font-weight: 600; margin-bottom: 3pt; }
    .tag-list { display: flex; flex-wrap: wrap; gap: 3pt; }
    .tag { display: inline-flex; align-items: center; justify-content: center; height: 11pt; padding: 0 1pt; font-size: 9pt; border: 1px solid #000; color: #000; overflow: hidden; white-space: nowrap; }

    /* 工作经历 */
    .exp-item { display: flex; flex-direction: column; width: 100%; gap: 3pt; margin-top: 6pt; }
    .exp-header { display: flex; align-items: center; justify-content: space-between; width: 100%; font-size: 11pt; }
    .exp-left { display: inline-flex; align-items: center; gap: 12pt; }
    .exp-duration { white-space: nowrap; }
    .exp-org { font-weight: 400; color: #000; text-decoration: none; }
    .exp-tags { display: inline-flex; align-items: center; gap: 3pt; }
    .exp-right { font-weight: 400; font-size: 11pt; }

    /* 项目经历 */
    .proj-item { display: flex; flex-direction: column; width: 100%; gap: 3pt; margin-top: 6pt; }
    .proj-header { display: flex; align-items: center; justify-content: space-between; width: 100%; font-size: 11pt; }
    .proj-left { display: inline-flex; align-items: center; gap: 12pt; }
    .proj-duration { white-space: nowrap; }
    .proj-name { font-weight: 600; color: #000; text-decoration: none; }
    .proj-right { font-weight: 600; font-size: 11pt; }
    .proj-variant { font-size: 11pt; margin-left: 2em; }

    /* 教育经历 */
    .edu-item { width: 100%; margin-top: 6pt; }
    .edu-header { display: flex; align-items: center; justify-content: space-between; width: 100%; font-size: 11pt; }
    .edu-left { display: inline-flex; align-items: center; gap: 12pt; }
    .edu-duration { white-space: nowrap; }
    .edu-school { font-weight: 400; }
    .edu-right { font-weight: 400; font-size: 11pt; }

    /* 证书 */
    .cert-item { font-size: 11pt; line-height: 1.8; width: 100%; margin-top: 3pt; }
    .cert-name { font-weight: 600; }

    /* 出版物 */
    .pub-item { font-size: 11pt; line-height: 1.8; width: 100%; margin-top: 3pt; }
    .pub-title { font-weight: 600; }

    /* 描述列表 */
    .desc-list { font-size: 11pt; line-height: 1.8; margin-left: 2em; list-style: none; }
    .desc-list strong { font-weight: 600; }
    .desc-list .num { position: relative; top: -1.2pt; }

    @media print {
      body { background: #fff; padding: 0; }
      .page { border: none; box-shadow: none; margin: 0; width: 100%; height: auto; min-height: auto; padding: 0; page-break-after: always; }
      .page:last-child { page-break-after: auto; }
      @page { size: A4; margin: 10mm; }
      .resume-section { break-inside: avoid; }
    }
  </style>
</head>
<body>
  ${pagesHtml}
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  downloadBlob(blob, 'resume.html');
}

/** 调用浏览器打印功能打印简历 */
export function printResume(): void {
  window.print();
}
