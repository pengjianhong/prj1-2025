const getHistory = async () => {
    try {
        // 使用完整的 URL 路径
        const response = await fetch(`${window.location.origin}/api/comfy/history`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching history:', error);
        return {};
    }
}; 