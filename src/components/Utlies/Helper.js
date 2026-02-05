export const getInitials = (name) => {
  if (!name) return "";

  const words = name.trim().split(/\s+/);

  let intials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    intials += words[i][0];
  }
  return intials.toUpperCase();
};

export const validEmail = (e) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(e);
};
