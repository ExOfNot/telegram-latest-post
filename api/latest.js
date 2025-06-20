import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

export default async function handler(req, res) {
  try {
    const response = await fetch('https://t.me/s/ofs_stom');
    const html = await response.text();

    console.log('HTML snippet:', html.slice(0, 500));

    const dom = new JSDOM(html);
    const a = dom.window.document.querySelector('a.tgme_widget_message_date');
    if (!a) {
      console.error('Element not found in HTML');
      return res.status(500).json({ error: 'Не найден элемент поста' });
    }
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

export default async function handler(req, res) {
  try {
    const response = await fetch('https://t.me/s/ofs_stom');
    const html = await response.text();

    const dom = new JSDOM(html);
    const a = dom.window.document.querySelector('a.tgme_widget_message_date');
    if (!a) {
      return res.status(500).json({ error: 'Не удалось найти ссылку на пост' });
    }
    const href = a.href;
    const id = href.split('/').pop();

    res.status(200).json({ id: parseInt(id, 10) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
