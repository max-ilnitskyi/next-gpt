import copy from 'copy-to-clipboard';

export function copyToClipboard(str: string): boolean {
  return copy(str);
}
