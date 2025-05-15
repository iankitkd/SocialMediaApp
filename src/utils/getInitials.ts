export function getInitials(fullName:string) {
  if (!fullName) return '';
  
  const names = fullName.trim().split(' ').filter(Boolean);
  
  if (names.length === 0) return '';
  if (names.length === 1) return names[0][0].toUpperCase();

  return (names[0][0] + names[names.length - 1][0]).toUpperCase();
}
