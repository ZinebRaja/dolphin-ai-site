// Generates blog-posts.xlsx from blog-posts.json
// Run once to create the Excel file, then edit Excel going forward

const XLSX = require('xlsx');
const path = require('path');
const posts = require('../src/blog-posts.json');

function contentToText(blocks) {
  return blocks.map(b => {
    if (b.type === 'heading')  return `## ${b.text}`;
    if (b.type === 'callout')  return `>> ${b.text}`;
    return b.text;
  }).join('\n\n');
}

const rows = posts.map(p => ({
  'Slug (URL)':   p.slug,
  'Title':        p.title,
  'Category':     p.category,
  'Date':         p.date,
  'Author':       p.author,
  'Read Time':    p.readTime,
  'Featured':     p.featured ? 'YES' : 'NO',
  'Excerpt':      p.excerpt,
  'Content':      contentToText(p.content),
}));

const wb = XLSX.utils.book_new();
const ws = XLSX.utils.json_to_sheet(rows);

// Column widths
ws['!cols'] = [
  { wch: 40 }, // Slug
  { wch: 55 }, // Title
  { wch: 22 }, // Category
  { wch: 14 }, // Date
  { wch: 20 }, // Author
  { wch: 12 }, // Read Time
  { wch: 10 }, // Featured
  { wch: 70 }, // Excerpt
  { wch: 100 },// Content
];

XLSX.utils.book_append_sheet(wb, ws, 'Blog Posts');

const out = path.join(__dirname, '../blog-posts.xlsx');
XLSX.writeFile(wb, out);
console.log('✅ Created blog-posts.xlsx');
console.log('   Edit it in Excel, then run: npm run update-blog');
