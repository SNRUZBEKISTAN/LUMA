export const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');

export const nowYm = () => { 
  const d = new Date(); 
  return `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}`; 
};

export const genArticle = (storeCode: string, catSlug: string, fit: string | undefined, color: string, serial: number) => {
  // Новый унифицированный формат: LM + 7-значный номер
  return `LM${String(serial).padStart(7, '0')}`;
};