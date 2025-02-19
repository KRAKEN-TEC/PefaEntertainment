
const useDataDetailFetching = (allData: any[] | undefined, id: string | undefined) => {
    if (!allData || !id) return { data: null }; // Ensure data exists
  
    const detailData = allData.find((item) => String(item._id) === String(id));
  
    return { data: detailData };
}

export default useDataDetailFetching;