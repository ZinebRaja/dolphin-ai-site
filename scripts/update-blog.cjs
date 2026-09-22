// Reads blog-posts.xlsx and updates src/blog-posts.json
// Run with: npm run update-blog

const XLSX = require('xlsx');
const fs   = require('fs');
const path = require('path');

const xlsxPath = path.join(__dirname, '../blog-posts.xlsx');
const jsonPath = path.join(__dirname, '../src/blog-posts.json');

if (!fs.existsSync(xlsxPath)) {
  console.error('❌ blog-posts.xlsx not found. Run: npm run create-excel');
  process.exit(1);
}

function textToContent(text) {
  if (!text) return [];
  return text.split(/\n\n+/).map(line => {
    line = line.trim();
    if (line.startsWith('## ')) return { type: 'heading',   text: line.slice(3).trim() };
    if (line.startsWith('>> ')) return { type: 'callout',   text: line.slice(3).trim() };
    if (line)                   return { type: 'paragraph', text: line };
    return null;
  }).filter(Boolean);
}

const wb   = XLSX.readFile(xlsxPath);
const ws   = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(ws);

const posts = rows.map(row => ({
  slug:     String(row['Slug (URL)'] || '').trim(),
  title:    String(row['Title']       || '').trim(),
  category: String(row['Category']   || '').trim(),
  date:     String(row['Date']        || '').trim(),
  author:   String(row['Author']      || 'Dolphin AI Team').trim(),
  readTime: String(row['Read Time']   || '5 min read').trim(),
  featured: String(row['Featured']    || '').toUpperCase() === 'YES',
  excerpt:  String(row['Excerpt']     || '').trim(),
  content:  textToContent(String(row['Content'] || '')),
})).filter(p => p.slug && p.title);

fs.writeFileSync(jsonPath, JSON.stringify(posts, null, 2));
console.log(`✅ Updated blog-posts.json — ${posts.length} articles`);
posts.forEach(p => console.log(`   • ${p.featured ? '⭐ ' : '  '}${p.title}`));
