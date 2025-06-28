export const formatDateIn12Hr = (date) => {
    if(!date) return '';
    const options = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };

    return new Date(date).toLocaleString('en-US', options).replace(',', '');
}