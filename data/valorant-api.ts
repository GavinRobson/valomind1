export const getMaps = async () => {
  try {
    const response = await fetch('https://valorant-api.com/v1/maps');
    const data = await response.json();
  } catch (error) {
    return ''
  }
}